// import React, { useState } from "react";
// import Button from "../UI/Button/Button";
// import { useNavigate } from "react-router-dom";
// import { uploadSingleFile } from "../../services/API";

// const SingleFileUpload = () => {
//    const [selectedFile, setSelectedFile] = useState(null);
//    const handleFileChange = (e) => {
//       setSelectedFile(e.target.files[0]);
//    };

//    const navigate = useNavigate();

//    let logoutFormHandler = async (e) => {
//       e.preventDefault();
//       try {
//           localStorage.removeItem("accessToken");
//           navigate('/login', { replace: true });

//       } catch (err) {
//           console.log(err);
//       }
//   };

//    const handleUpload = async () => {
//       if (!selectedFile) {
//          alert("Please first select a file");
//          return;
//       }
//       console.log("selectedFile")
//       console.log(selectedFile)

//       // const formData = new FormData();
//       // formData.append("file", selectedFile);

//       try {
//          // Replace this URL with your server-side endpoint for handling file uploads
//          // const response = await fetch("http://localhost:8080/api/uploadfile", {
//          //    method: "POST",
//          //    body: formData
//          // });

//          const response = await uploadSingleFile(selectedFile);
//          console.log("response")
//          console.log(response)
//          if (response.status == 200) {
//             alert("File upload is  successfully");
//          } else {
//             alert("Failed to upload the file due to errors");
//          }
//       } catch (error) {
//          console.log(error)
//          // console.error("Error while uploading the file:", error);
//          // alert("Error occurred while uploading the file");
//       }
//    };

//    return (
//    <div>
//       <h2>آپلود فایل</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>آپلود</button>
//       <Button btnType="submit md" click={logoutFormHandler}>
//          logout
//       </Button>
//    </div>
//    );
// };
// export default SingleFileUpload;

import React, { useState, useEffect } from 'react';

const SingleFileUpload = () => {
	const [files, setFiles] = useState([]);
	// onChange function that reads files on uploading them
	// files read are encoded as Base64
	function onFileUpload(event) {
		event.preventDefault();
		let id = event.target.id;
		let file_reader = new FileReader();
		let file = event.target.files[0];
		file_reader.onload = () => {
			setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
		};
		file_reader.readAsDataURL(file);
	}


	function handleSubmit(e) {
		e.preventDefault();
		console.log(files);
	}
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		if (files.length === 0) {
			setEnabled(false);
		} else {
			setEnabled(true);
		}
	}, [files]);

	return (
		<form onSubmit={handleSubmit} className="upload--container">
			<h1> Multiple File Inputs with Signle Submit Button </h1>
			<div className="upload--button">
				<input
					onChange={onFileUpload}
					id={1}
					accept=".jpeg, .pdf, .csv"
					type="file"
				/>
			</div>
			<div className="upload--button">
				<input
					onChange={onFileUpload}
					id={2}
					accept=".jpeg, .pdf, .csv"
					type="file"
				/>
			</div>
			{enabled ? (
				<button type="submit">آپلود</button>
			) : (
				<button disabled type="submit">
					Submit
				</button>
			)}
		</form>
	);
};

export default SingleFileUpload;