import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import API from '../../containers/API/API';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Invoices = (props) => {
    let history = useHistory();
    let params = useQuery();

    const [api,] = useState(new API());
    const [invoices, setInvoices] = useState(null);
    const [vendors, setVendors] = useState(null);
    const [columns, setColumns] = useState(null);

    const mergeProcessor = (invoices, vendors) => {
        console.log('merge', invoices, vendors);
        let vendorsHash = {};
        vendors.data.map(vendor => {
            vendorsHash[vendor.vendorId] = vendor;
        })
        let invoiceDetails = invoices.data.map(invoice => {
            return {
                ...invoice,
                vendor: {...vendorsHash[invoice.vendorId]}
            }
        })
        console.log(invoiceDetails);
        setInvoices({
            data: invoiceDetails,
            count: invoices.count
        });
        // setVendors(vendors);
    }

    useEffect(() => {
        const getInvoices = api.getAll({
            url: props.config.dataEndPoints.call2.getAll,
            setState: setInvoices,
            limit: 10,
            page: params.get('page') | 0
        });
        const getVendors = api.getAll({
            url: props.config.dataEndPoints.call3.getAll,
            setState: setVendors
        })
        Promise.all([getInvoices, getVendors])
            .then((response) => {
                console.log(response);
                mergeProcessor(response[0], response[1]);
            })
        
    }, [params.get('page')])

    useEffect(() => {
        // console.log(`params ${params}`);
        setColumns(getColumns());
    }, [])

    const getColumns = () => {
        let columns = props.config.tableConfig.columns.map((column, index) => {
            if (column.display)
                return {
                    title: column.displayName,
                    dataIndex: column.fieldName,
                    key: index,
                };
            else
                return null;
        })
        if (props.config.tableConfig.paymentEnabled)
            columns.push(
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => {
                        console.log(record.amountDue);
                        return (
                            <Space size="middle">
                                <a>Pay</a>
                            </Space>
                        )
                    },
                }
            )
        return columns;
    }

    return (
        <div>
            {columns && invoices ?
                <Table
                    columns={columns}
                    dataSource={invoices.data}
                    pagination={{
                        total: invoices.count,
                        current: params.get('page'),
                        onChange: (pageNo) => history.push(`?page=${pageNo}`),
                        // simple: true,
                        position: 'bottomCenter',
                        size: 10
                    }}
                />
                : null}
        </div>
    )
}

export default Invoices;