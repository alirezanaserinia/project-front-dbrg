import React, { useState } from "react";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";

const SingleFileUpload = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
   };

   const navigate = useNavigate();

   let logoutFormHandler = async (e) => {
      e.preventDefault();
      try {
          localStorage.removeItem("accessToken");
          navigate('/login', { replace: true });
          
      } catch (err) {
          console.log(err);
      }
  };

   const handleUpload = async () => {
      if (!selectedFile) {
         alert("Please first select a file");
         return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
         // Replace this URL with your server-side endpoint for handling file uploads
         const response = await fetch("./upload", {
            method: "POST",
            body: formData
         });

         if (response.ok) {
            alert("File upload is  successfully");
         } else {
            alert("Failed to upload the file due to errors");
         }
      } catch (error) {
         console.error("Error while uploading the file:", error);
         alert("Error occurred while uploading the file");
      }
   };

   return (
   <div>
      <h2>آپلود فایل</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>آپلود</button>
      <Button btnType="submit md" click={logoutFormHandler}>
         logout
      </Button>
   </div>
   );
};
export default SingleFileUpload;