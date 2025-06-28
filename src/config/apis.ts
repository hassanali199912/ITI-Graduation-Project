import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import logger from "./logger";
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react"



const axiosInterseptor = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "Application/json"
    }
});


axiosInterseptor.interceptors.request.use((config) => {

    const lang: string = localStorage.getItem("lang") as string || "";
    const token: string = localStorage.getItem("token") as string || "";
    config.headers["Accept-Language"] = lang;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    logger.error(`[Request Error] Level 1 Config `, error);
    return Promise.reject(error);
});


axiosInterseptor.interceptors.response.use((response) => response,
    (error) => {

        const lang: string = localStorage.getItem("lang") || "en";

        let errorMassage: string = "Unknown Error";

        if (error.response?.data) {
            const data = error.response.data;

            if (typeof data === 'string') {
                errorMassage = data;
            } else if (data.message) {
                errorMassage = data.message;
            } else {
                errorMassage = data.error;
            }
        }


        logger.error(`[Request Error] Level 1 Config `, error);
        return Promise.reject(trnaslateError(errorMassage, lang));
    });


const trnaslateError = (msg: string, lang: string): string => {

    switch (msg) {
        case "Unauthorized":
            return lang === "en" ? 'Unauthorized access' : 'غير مصرح لك بالدخول';

        default:
            return lang === "en" ? 'Something went wrong' : 'حدث خطأ ما';
    }
}


const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
        },
        unknown,
        unknown
    > =>
        async ({ url, method = 'GET', data, params }) => {
            try {
                const result = await axiosInterseptor({
                    url,
                    method,
                    data,
                    params,
                });

                return { data: result.data };
            } catch (axiosError) {
                const err = axiosError as AxiosError;

                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };


export const api = createApi({
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({})
})







export default axiosInterseptor