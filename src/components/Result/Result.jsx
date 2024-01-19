import React, { useEffect, useState } from 'react';
import './Result.css';
import Layout from '../Layout/Layout';

function Result() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dataString = localStorage.getItem('resultData');
        const data = dataString ? JSON.parse(dataString) : [".خطا در دریافت نتایج. لطفاً دوباره تلاش کنید",];
        setData(data);
    }, []);

    return (
        <Layout>
            <div className='result-box'>
                <div className='result'>
                    <h1>نتایج</h1>
                    {data.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Result;