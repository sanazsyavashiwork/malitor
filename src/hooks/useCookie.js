"use client";

import Cookies from "js-cookie";

export const cookieRoot = Cookies.withAttributes({ expires: 30, path: "/" });
