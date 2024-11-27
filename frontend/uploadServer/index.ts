import express from "express";
import cors from "cors";
import "dotenv/config";
import { createRouteHandler } from "uploadthing/express";

import { uploadRouter } from "./uploadthing";

const app = express();

// Add CORS middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-UploadThing-Version",
            "x-uploadthing-package",
        ],
    })
);

// Ensure preflight (OPTIONS) requests are handled
app.options("*", cors());

// UploadThing route
app.use(
    "/api/uploadthing",
    createRouteHandler({
        router: uploadRouter,
        config: {
            token: process.env.UPLOADTHING_TOKEN,
        },
    })
);

const port = 3030;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});