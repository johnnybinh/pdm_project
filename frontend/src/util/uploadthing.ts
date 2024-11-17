import {
  generateUploadDropzone,
  type GenerateTypedHelpersOptions,
} from "@uploadthing/react";
import { OurFileRouter } from "../../uploadServer/uploadthing";

const initOpts = {
  url: "http://localhost:3000/api/uploadthing",
} satisfies GenerateTypedHelpersOptions;

export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts);
