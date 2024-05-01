import axios from "axios";
import React, { useState } from "react";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };

  const fileUpload = () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile, selectedFile.name);
    axios
      .post("http://localhost/api/controller/test/uploadimage.php", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input type="file" onChange={fileSelect} />
      <button onClick={fileUpload}>Upload</button>
    </div>
  );
}

export default UploadImage;
