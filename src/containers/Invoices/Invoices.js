import React, { useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import API from '../../containers/API/API';
import PaymentModal from './PaymentModal';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Invoices = (props) => {
    let history = useHistory();
    let params = useQuery();

    const [api,] = useState(new API());
    const [invoices, setInvoices] = useState(null);
    // const [vendors, setVendors] = useState(null);
    const [columns, setColumns] = useState(null);

    const [paymentModal, setPaymentModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const mergeProcessor = (invoices, vendors) => {
        let vendorsHash = {};
        vendors.data.map(vendor => {
            vendorsHash[vendor.vendorId] = vendor;
            return null;
        })
        let invoiceDetails = invoices.data.map(invoice => {
            return {
                ...invoice,
                vendor: {...vendorsHash[invoice.vendorId]}
            }
        })
        setInvoices({
            data: invoiceDetails,
            count: invoices.count
        });
        // setVendors(vendors);
    }

    useEffect(() => {
        const getInvoices = api.getAll({
            url: props.config.dataEndPoints.call2.getAll,
            // setState: setInvoices,
            limit: 10,
            page: params.get('page')
        });
        const getVendors = api.getAll({
            url: props.config.dataEndPoints.call3.getAll,
            // setState: setVendors
        })
        Promise.all([getInvoices, getVendors])
            .then((response) => {
                mergeProcessor(response[0], response[1]);
            })
        
    }, [params.get('page')])

    useEffect(() => {
        setColumns(getColumns());
    }, [])

    const paymentHandler = (invoice) => {
        setSelectedInvoice(invoice);
        setPaymentModal(true)
    }

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
                        return (
                            <Space size="middle">
                                <Button type="primary"
                                    onClick={() => paymentHandler(record)}
                                    disabled={+record.amountDue === 0 ? true : false}>
                                    Pay
                                </Button>
                            </Space>
                        )
                    },
                }
            )
        return columns;
    }

    return (
        <div>
            <PaymentModal 
                visible={paymentModal}
                setVisible={setPaymentModal}
                invoice={selectedInvoice}
                endPoints={props.config.dataEndPoints}
                applyCredit={props.config.tableConfig.adjustEnabled}
                />
            {columns !== null && invoices !== null ?
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