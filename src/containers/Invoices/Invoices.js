import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';

import API from '../../containers/API/API';

const Invoices = (props) => {

    const [api,] = useState(new API());
    const [invoices, setInvoices] = useState(null);
    const [vendors, setVendors] = useState(null);
    const [columns, setColumns] = useState(null);

    useEffect(() => {
        api.getAll({
            url: props.config.dataEndPoints.call2.getAll,
            setState: setInvoices,
            limit: 10,
            page: 1
        });
        api.getAll({
            url: props.config.dataEndPoints.call3.getAll,
            setState: setVendors
        });
        setColumns(getColumns());
    }, [])

    const getColumns = () => {
        let columns = props.config.tableConfig.columns.map((column) => {
            if (column.display)
                return {
                    title: column.displayName,
                    dataIndex: column.fieldName,
                    key: column.fieldName,
                };
            else
                return null;
        })
        if (props.config.tableConfig.paymentEnabled)
            columns.push(
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <a>Pay</a>
                        </Space>
                    ),
                }
            )
        return columns;
    }

    return (
        <div>
            {columns && invoices ?
                <Table columns={columns} dataSource={invoices.data} />
                : null}
        </div>
    )
}

export default Invoices;