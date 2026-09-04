// import { getAccessToken } from "@base44/sdk";

const appId = process.env.NEXT_PUBLIC_BASE44_APP_ID || undefined;
// const token = getAccessToken();
const functionsVersion =
  process.env.NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION || undefined;
const appBaseUrl = process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL || undefined;

const isNode = typeof window === "undefined";
const storage: Pick<Storage, "setItem" | "getItem" | "removeItem"> = isNode
  ? {
      setItem: () => {},
      getItem: () => null,
      removeItem: () => {},
    }
  : window.localStorage;

const toSnakeCase = (str: string) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

const getAppParamValue = (
  paramName: string,
  {
    defaultValue = undefined,
    removeFromUrl = false,
  }: { defaultValue?: string; removeFromUrl?: boolean } = {},
) => {
  if (isNode) {
    return defaultValue;
  }
  const storageKey = `base44_${toSnakeCase(paramName)}`;
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(paramName);
  if (removeFromUrl) {
    urlParams.delete(paramName);
    const newUrl = `${window.location.pathname}${
      urlParams.toString() ? `?${urlParams.toString()}` : ""
    }${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
  }
  if (searchParam) {
    storage.setItem(storageKey, searchParam);
    return searchParam;
  }
  if (defaultValue) {
    storage.setItem(storageKey, defaultValue);
    return defaultValue;
  }
  const storedValue = storage.getItem(storageKey);
  if (storedValue) {
    return storedValue;
  }
  return null;
};

const getAppParams = () => {
  if (getAppParamValue("clear_access_token") === "true") {
    storage.removeItem("base44_access_token");
    storage.removeItem("token");
  }
  return {
    appId: getAppParamValue("app_id", {
      defaultValue: appId,
    }),
    token: getAppParamValue("access_token", { removeFromUrl: true }),
    fromUrl: getAppParamValue("from_url", {
      defaultValue: window.location.href,
    }),
    functionsVersion: getAppParamValue("functions_version", {
      defaultValue: functionsVersion,
    }),
    appBaseUrl: getAppParamValue("app_base_url", {
      defaultValue: appBaseUrl,
    }),
  };
};

export const appParams = {
  ...getAppParams(),
};
