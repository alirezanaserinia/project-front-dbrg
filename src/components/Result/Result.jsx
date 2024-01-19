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
            <div className='result'>
                {data.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </Layout>
    );
}

export default Result;