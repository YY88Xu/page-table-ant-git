import {convert} from './common'
export async function getData(url, params = {}, config) {
    try {
        const data = await fetch(convert(url, params), {
            method: 'GET',
            mode: 'cors',
            credential: 'include',
            ...config
        });
        if (data.status === 200) {
            const res = await data.json();
            return res;
        } else if (data.status === 404) {
            return {
                success: false,
                msg: "请求地址出错"
            }
        } else if (data.status === 500) {
            return {
                success: false,
                msg: "请求后端服务出错"
            }
        } else {
            return {
                success: false,
                msg: "请求出错"
            }
        }
    } catch (e) {
        console.log("Error", e);
        return Promise.reject(e);
    }
}

export async function postData(url, params = {}, config = {}) {
    try {
        const data = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credential: 'include',
            body: JSON.stringify(params),
            ...config
        });
        if (data.status === 200) {
            const res = await data.json();
            return res;
        } else {
            return {
                success: false,
                msg: "请求出错"
            }
        }
    } catch (e) {
        console.log("Error", e);
        return Promise.reject(e);
    }
}