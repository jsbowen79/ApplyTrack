import { put } from "@vercel/blob";

export async function uploadResume(pathname: string, file: File) {
  const blob = await put(pathname, file, {
    access: "private",
  });

  return blob;
}
