import { get, put } from "@vercel/blob";

export async function uploadResume(pathname: string, file: File) {
  const blob = await put(pathname, file, {
    access: "private",
  });

  return blob;
}

export async function getResume(pathname: string) {
  const result = await get(pathname, { access: "private" });

  return result;
}
