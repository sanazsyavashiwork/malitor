"use client";

const version = "/v1";
const INVOICES = `${version}/invoices`;
const AUTH = `${version}/auth`;
const USERS = `${version}/users`;

const useEndPoint = () => {
  const endPoints = Object.freeze({
    // user
    TAX_PAYERS: `${version}/tax-payers`,
    //customers
    CUSTOMERS: `${version}/customers`,

    //stuffIds
    STUFF: `${version}/stuff-ids`,

    INVOICES: `${version}/invoices`,

    SEND_INVOICES: `${INVOICES}/send-invoice/`,
    //enumes

    //invoice-item-units
    INVOICE_ITEM_UNIT: `${INVOICES}/invoice-item-units`,

    //invoice-patterns
    INVOICE_PATTERNS: `${INVOICES}/invoice-patterns`,

    //invoice-subjects
    INVOICE_SUBJECTS: `${INVOICES}/invoice-subjects`,

    //invoice-types
    INVOICE_TYPES: `${INVOICES}/invoice-types`,

    //payment-methods
    PAYMENT_METHOD: `${INVOICES}/payment-methods`,

    //settlement-methods
    SETTLEMENT_METHODS: `${INVOICES}/settlement-methods`,

    //settlement-methods
    AUTHENTICATE: `${AUTH}/authenticate`,

    //settlement-methods
    REGISTER: `${AUTH}/register`,

    //refresh token
    REFRESH_TOKEN: `${AUTH}/refresh-token`,

    //users
    USERS: `${USERS}`,

    CHANGE_PASSWORD: `${USERS}/change-password`,

    MY_PROFILE: `${USERS}/my-profile`,
  });

  return { endPoints };
};

export default useEndPoint;
