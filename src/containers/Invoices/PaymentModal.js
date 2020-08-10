import React, { useEffect, useState } from 'react';
import { Modal, Radio, InputNumber } from 'antd';

import API from '../../containers/API/API';

const options = [
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'Money Transfer(IMPS)', value: 'money_transfer' },
  ];

const PaymentModal = (props) => {
    
    const [api,] = useState(new API());
    const [paymentMethod, setPaymentMethod] = useState('debit_card');
    const [confirmLoading, setConfirmLoading] = useState(false)

    useEffect(() => {
        
    }, [])

    const makePayment = () => {
        setConfirmLoading(true)
        api.post({
            url: props.endPoints.payment.post,
            data: {
                invoiceId: props.invoice.invoiceId,
                amountPayment: props.invoice.amountDue,
                type: paymentMethod
            },
            callback: (callbackProps) => {
                setConfirmLoading(false)
                props.setVisible(false)
            }
        })
    }
    
    return (
      <div>
        <Modal
          title="Payment Window"
          visible={props.visible}
          okText='Make Payment'
          onOk={makePayment}
          confirmLoading={confirmLoading}
          onCancel={() => props.setVisible(false)}
        >
        <p>Amount Due: {props.invoice? props.invoice.amountDue: 0} </p>
          <p>Select Payment Process</p>
          <Radio.Group options={options} onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} />
          <p>Enter Amount:&nbsp;
              <InputNumber size="large" min={1} max={100000} value={props.invoice? props.invoice.amountDue: 0} onChange={() => null} />
            </p>
        </Modal>
      </div>
    );
  }

export default PaymentModal;