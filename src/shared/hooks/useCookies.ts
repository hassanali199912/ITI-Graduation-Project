import { useCookies as uesReactCookies } from "react-cookie"



export function useCookies() {

    const [cookie, setCookie, removeCookie] = uesReactCookies();


    const get = (key: string): string | undefined => {
        return cookie[key];
    }

    const set = (key: string, vlaue: any, option = {
        path: "/", maxAge: 7 * 24 * 60 * 60
    }) => {
        setCookie(key, vlaue, option);
    }

    const remove = (key: string, options = { path: "/" }) => {
        removeCookie(key, options);
    };


    const clear = () => {
        Object.keys(cookie).forEach(key => remove(key));
    }


    return {
        getCookie: get,
        setCookie: set,
        removeCookie: remove,
        removeAllCookies: clear
    }


}