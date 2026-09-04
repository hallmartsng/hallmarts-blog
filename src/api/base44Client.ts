import { createClient } from "@base44/sdk";
import { appParams } from "@/lib/app-params";

const { appId, token, functionsVersion, appBaseUrl } = appParams;

export const base44 = createClient({
  appId: appId || "",
  // Pass the token if it exists, or fall back to an empty string for public/anonymous access
  token: token || "",
  functionsVersion: functionsVersion || undefined,
  serverUrl: "",
  appBaseUrl: appBaseUrl || undefined,
});
