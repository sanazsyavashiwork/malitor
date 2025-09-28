export const BASE_URL = `${process.env.NEXTAUTH_URL ?? ""}/`;

export const ROUTES = Object.freeze({
  PUBLIC: {
    Main_page: "/",
  },
  AUTH: {
    SIGN_IN: `${BASE_URL}signin`,
    SIGN_UP: `${BASE_URL}signup`,
    FORGET_PASSWORD: `${BASE_URL}forget-password`,
    VERIFICATION: `${BASE_URL}verification`,
    RESET_PASSWORD: `${BASE_URL}resetPassword`,
    OTP: `${BASE_URL}otp`,
    PASSWORD: `${BASE_URL}password`,
  },
  PRIVATE: {
    DASHBOARD: `${BASE_URL}dashboard`,
    MOVADIAN_LIST: `${BASE_URL}member`,
    MOVADIAN_ADD: `${BASE_URL}member/add`,
    MOVADIAN_EDIT: `${BASE_URL}member/edit`,
    CUSTOMERS_LIST: `${BASE_URL}customers`,
    CUSTOMERS_ADD: `${BASE_URL}customers/add`,
    CUSTOMERS_EDIT: `${BASE_URL}customers/edit`,
    ITEMS_LIST: `${BASE_URL}stuff`,
    ITEMS_ADD: `${BASE_URL}stuff/add`,
    INVOICE: `${BASE_URL}invoice`,
    INVOICE_ADD: `${BASE_URL}invoice/add`,
    INVOICE_EDIT: `${BASE_URL}invoice/edit`,
    INVOICE_PRINT: `${BASE_URL}invoice/InvoicePrint`,
    CHANGE_PASSWORD: `${BASE_URL}change-password`,
    MY_PROFILE: `${BASE_URL}my-profile`,
  },
  ADMIN: {
    USER_LIST: `${BASE_URL}user`,
    USER_ADD: `${BASE_URL}user/add`,
    USER_EDIT: `${BASE_URL}user/edit`,
  },
});
