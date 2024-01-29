import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
import Button from "../UI/Button/Button";
import axios from "axios";
import './FileUpload.css'



const FileUpload = () => {
	const [file1, setFile1] = useState(null);
	const [file2, setFile2] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadStatus, setUploadStatus] = useState(false);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Home";
	}, []);

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

	const handleUpload = (e) => {
		e.preventDefault();
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
			axios.post('http://localhost:8080/api/uploadfile/multi', formData, {
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
					console.log('Successful Upload')

					// setFile1(null);
					// setFile2(null);
				})
				.catch((error) => {
					console.error(error);
					setUploadStatus('!خطا در بارگزاری نمونه ها');
				});
		}
	};

	const handleOperation = async (e) => {
		e.preventDefault();

		setLoading(true);

		const token = JSON.parse(localStorage.getItem('accessToken'));
		axios.get('http://localhost:8080/api/operation',
			{
				headers: {
					'Authorization': `${String(token.type)} ${String(token.token)}`,
				}
			})
			.then((response) => {
				console.log('Successful Operation')
				console.log(response.data)
				setData(response.data);
				localStorage.removeItem('resultData');
				localStorage.setItem('resultData', JSON.stringify(response.data));
				navigate('/result');

				// navigate('/result', { state: { data: response.data } });
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
				setLoading(false);
			});
	};

	let operateButton = null

	if (uploadStatus && uploadProgress === 100) {
		operateButton =
			<Button btnType="submit lg" click={handleOperation}>
				اجرا
			</Button>
	}



	return (
		<div className="file-upload">
			<h2> نمونه های خود را در قسمت زیر بارگزاری کنید </h2>
			<ul>
				<p>
					هنگام بارگزاری نمونه های سالم و بیمار به نکات زیر توجه فرمایید!
				</p>
				<li>هرکدام از فایل ها باید به صورت میکرو آرایه و با فرمت csv بارگزاری شوند.</li>

				<li>شناسه ژن ها باید از نوع KEGG ID باشد.</li>
			</ul>
			<div className="healthy">
				<h3>نمونه های سالم</h3>
				<label htmlFor="hfileInput">
					<span>Choose file</span>
					<input id="hfileInput" type="file" onChange={handleFile1Change} accept=".csv" style={{ display: 'none' }} />
				</label>
				{file1 ? <span className="filename">{file1.name}</span> : <></>}
			</div>

			<div className="patient">
				<h3>نمونه های بیمار</h3>
				<label htmlFor="pfileInput">
					<span>Choose file</span>
					<input id="pfileInput" type="file" onChange={handleFile2Change} accept=".csv" style={{ display: 'none' }} />
				</label>
				{file2 ? <span className="filename">{file2.name}</span> : <></>}
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

			{operateButton}

			<div>
				{loading ? (
					<div className="overlay">
						<PropagateLoader size="25px" color="#36d7b7" speedMultiplier="0.5" />
						<p>...لطفاً مقداری صبر کنید. برنامه در حال اجرا می باشد</p>
					</div>
				) : (
					null
				)}
			</div>

		</div>
	);
}

export default FileUpload;