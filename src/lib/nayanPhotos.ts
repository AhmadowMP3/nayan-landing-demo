// Real project photos downloaded from nayan.sa — see /public/assets/nayan/manifest.json.
// The files are shown as-is: never cropped in the file, repainted or altered.
import manifest from "../../public/assets/nayan/manifest.json";
import { publicUrl } from "../assets";

export type NayanPhoto = {
  file: string;
  /** null for photos the site uses without naming a project */
  slug: string | null;
  /** Arabic name exactly as written on nayan.sa */
  project: string | null;
  /** status exactly as written on nayan.sa */
  status: string | null;
  source: string;
  original: string;
  width: number;
  height: number;
};

export const photos = manifest as NayanPhoto[];

export const photoSrc = (file: string) => publicUrl(`assets/nayan/${file}`);

export const photoByFile = (file: string) => {
  const p = photos.find((x) => x.file === file);
  if (!p) throw new Error(`[nayan] missing photo ${file} in manifest.json`);
  return p;
};

/** One entry per project, in the order nayan.sa lists them, with its first photo. */
export const projects = photos.filter(
  (p, i) => p.slug && photos.findIndex((q) => q.slug === p.slug) === i,
);

/** Page on nayan.sa for a project. */
export const projectUrl = (p: NayanPhoto) => p.source;
