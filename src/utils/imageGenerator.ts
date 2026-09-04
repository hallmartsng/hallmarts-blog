import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "@/sanity/client";

export const urlForImage = (source: SanityImageSource) => {
  const { projectId, dataset } = client.config();

  if (projectId && dataset) {
    return createImageUrlBuilder({ projectId, dataset }).image(source);
  }
  return null;
};
