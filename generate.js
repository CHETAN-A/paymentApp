module.exports = function() {
    var faker = require("faker");
    var _ = require("lodash");
    vendorIds = _.times(20, function (n) {
        return faker.random.alphaNumeric(3)
    })
    return {
        invoices: _.times(30, function (n) {
            return {
                id: n,
                vendorId: faker.random.arrayElement(vendorIds),
                invoiceId: faker.random.number(1000, 2000),
                quantity: faker.random.number(10, 600),
                product: faker.commerce.product(),
                amountBal: faker.finance.amount(0, 500, 2),
                amountDue: faker.finance.amount(0, 500, 2),
                invoiceDate: faker.date.past(2)
            }
        }),

        vendors: _.times(20, function (n) {
            return {
                vendorId: vendorIds[n],
                vendorName: faker.company.companyName(),
                creditBal: faker.finance.amount(0, 600, 2),
            }
        }),

        app_config: {
            name: "Ivoyant",
            tableConfig:{
                //Define config for All columns
                paymentEnabled: true, //if action enabled is true, then there will be a last column with Button, which when clicked will open the modal - that either shows Adjust / Payment or Both
                adjustEnabled : true, // if payment is enabled and Adjustment is enabled, then the user can use Credit. else he can only do payment (using credit card)
                columns:[

                    {
                        "fieldName": "invoiceId",
                        "displayName" : "Invoice Id",
                        "display" : true,
                        "filteringEnabled" : false,
                        "sortingEnabled" : true
                    },
                    {
                        "fieldName": "product",
                        "displayName" : "Product",
                        "display" : true,
                        "filteringEnabled" : false,
                        "sortingEnabled" : true
                    },
                    {
                        "fieldName": "vendorId",
                        "displayName" : "Vendor ID",
                        "display" : true,
                        "filteringEnabled" : false,
                        "sortingEnabled" : true
                    },
                    {
                        "fieldName": "quantity",
                        "displayName" : "Quantity",
                        "display" : true,
                        "filteringEnabled" : false,
                        "sortingEnabled" : true
                    },
                    {
                        "fieldName": "amountBal",
                        "displayName" : "Amount Balance",
                        "display" : true,
                        "filteringEnabled" : false,
                        "sortingEnabled" : true
                    },
                    {
                        "fieldName": "amountDue",
                        "displayName" : "Amount Due",
                        "display" : true,
                        "filteringEnabled" : false,
                        "sortingEnabled" : true
                    },
                    {
                        "fieldName": "invoiceDate",
                        "displayName" : "Invoice Date",
                        "display" : true,
                        "filteringEnabled" : false,
                        "sortingEnabled" : true
                    },
                ],
            },
            "dataEndPoints" :{
                "call2" : {
                    "getAll": "/invoices",
                    "post": "/invoices",
                    "get": "/invoices/{id}",
                    "put": "/invoices/{id}",
                    "delete": "/invoices/{id}",
                },
                "call3" : {
                    "getAll": "/vendors",
                    "post": "/vendors",
                    "get": "/vendors/{id}",
                    "put": "/vendors/{id}",
                    "delete": "/vendors/{id}",
                },
                "creditPost" : {
                    "get": "/credit"
                },
                "paymentPost" : {
                    "get": "/payment"
                }
            },
        }
    }
}