import { Card } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import API from '../API/API';

const MainApp = (props) => {
    let location = useLocation();
    return (
        <Card size="small" title="Invoices" style={{ width: 300 }}>
            <Link to={`${location.pathname.includes('/paymentApp') ? '/paymentApp':''}/invoices`}>View</Link>
        </Card>
    );
}

export default MainApp;