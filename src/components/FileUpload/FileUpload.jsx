import React, { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './FileUpload.css'

const SingleFileUpload = () => {
	const [file1, setFile1] = useState(null);
	const [file2, setFile2] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadStatus, setUploadStatus] = useState(false);

	useEffect(() => {
		if (file1 && file2) {
			setUploadStatus(true);
		} else {
			setUploadStatus(false);
		}
	}, [file1, file2]);

	const handleFile1Change = (event) => {
		setFile1(event.target.files[0]);
	};

	const handleFile2Change = (event) => {
		setFile2(event.target.files[0]);
	};

	const handleUpload = () => {
		if (!uploadStatus) {
			alert("لطفاً ابتدا نمونه های خود را انتخاب کنید!");
			return;
		}
		if (file1 && file2) {
			const newFile1 = new File([file1], "h_samples.csv");
			const newFile2 = new File([file2], "p_samples.csv");
			const formData = new FormData();
			formData.append('files', newFile1);
			formData.append('files', newFile2);

			const token = JSON.parse(localStorage.getItem('accessToken'));
			axios
				.post('http://localhost:8080/api/uploadfile/multi', formData, {
					headers: {
						'content-type': 'multipart/form-data',
						'Authorization': `${String(token.type)} ${String(token.token)}`,
					},
					onUploadProgress: (progressEvent) => {
						const progress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						setUploadProgress(progress);
					},
				})
				.then((response) => {
					setUploadStatus('!نمونه های شما با موفقیت بارگزاری شدند');
					console.log('file1.name')
					console.log(newFile1.name)

					// setFile1(null);
					// setFile2(null);
				})
				.catch((error) => {
					console.error(error);
					setUploadStatus('!خطا در بارگزاری نمونه ها');
				});
		}
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

	return (
		<div className="file-upload">
			<h2> نمونه های خود را در قسمت زیر بارگزاری کنید </h2>
			<div className="healthy">
				<h3>نمونه های سالم</h3>
				<input type="file" onChange={handleFile1Change} accept=".csv" />
			</div>

			<div className="patient">
				<h3>نمونه های بیمار</h3>
				<input type="file" onChange={handleFile2Change} accept=".csv" />
			</div>
			<Button btnType="submit lg" click={handleUpload}>
				آپلود فایل ها
			</Button>

			{uploadProgress > 0 && (
				<div>
					<p className="upload-status">Uploading: {uploadProgress}%</p>
					<progress value={uploadProgress} max="100" />
				</div>
			)}
			{uploadStatus && <p className="upload-status">{uploadStatus}</p>}

			<div>
				<Button btnType="danger md" click={logoutFormHandler}>
					خروج
				</Button>
			</div>
		</div>
	);
}

export default SingleFileUpload;