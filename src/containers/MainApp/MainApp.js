import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
// import API from '../API/API';

const MainApp = (props) => {

    return (
        <Card size="small" title="Invoices" style={{ width: 300 }}>
            <Link to='/invoices'>View</Link>
        </Card>
    );
}

export default MainApp;