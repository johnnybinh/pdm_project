import express from "express";
import "dotenv/config";
import { createRouteHandler } from "uploadthing/express";

import { uploadRouter } from "./uploadthing";

const app = express();

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      token: process.env.UPLOADTHING_TOKEN,
    },
  })
);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
