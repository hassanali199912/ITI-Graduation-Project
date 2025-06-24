import axios from "axios";
import logger from "./logger";




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


axiosInterseptor.interceptors.request.use((response) => response,
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




export default axiosInterseptor