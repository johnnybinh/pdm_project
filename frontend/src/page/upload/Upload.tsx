import React, { useState } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "../../util/uploadthing";

const Upload = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  return (
    <div className="w-full  flex flex-col justify-center items-center">
      <UploadDropzone
        className="w-1/2 h-1/2"
        appearance={{
          button() {
            return {
              backgroundColor: "red",
              color: "white",
            };
          },
        }}
        endpoint={"videoUploader"}
        onClientUploadComplete={(file) => {
          console.log("uploaded", file[0].url);
          setVideoUrl(file[0].url);
        }}
        onUploadError={(err) => {
          console.log(err);
        }}
      />
      <h1>{videoUrl}</h1>
    </div>
  );
};

export default Upload;
