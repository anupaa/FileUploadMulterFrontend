import React from "react";
import "./App.css";
import { Dropzone, FileMosaic } from "@files-ui/react";
import axios from "axios";

export default function App() {
  const [files, setFiles] = React.useState([]);

  const updateFiles = async (selectedFiles) => {
    if (!selectedFiles.length) {
      console.log("No files selected");
      return;
    }
    console.log(selectedFiles);
    const file = selectedFiles[0];

    setFiles([file]);
    console.log("file:", file);
    const formData = new FormData();
    formData.append("dataFile", file);
    const url =
      "https://4994f8d9-2c91-46d9-bf7c-00e6cd32a8f1-00-37ars7fgkxdcx.sisko.replit.dev/upload/file-upload";

    try {
      // const res = await fetch(url, {
      //   method: "POST",
      //   body: formData,
      // });
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res.ok) {
        throw new Error(`Upload failed with status: ${res}`);
      }

      const data = await res.json();
      console.log("Upload response:", data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <main>
      <form
        action="https://4994f8d9-2c91-46d9-bf7c-00e6cd32a8f1-00-37ars7fgkxdcx.sisko.replit.dev/upload/file-upload"
        method="post"
        enctype="multipart/form-data"
      >
        {" "}
        <input type="file" name="dataFile" />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
