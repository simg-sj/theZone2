/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-08-05 16:20:18
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-08-20 13:42:34
 * @FilePath: src/api/axiosInstance.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


import axios from "axios";

const bussinessCheckApi = axios.create({
    baseURL: "https://bizno.net/api/",
    timeout: 10000,
})

const consultCarApi = axios.create({
    baseURL: "https://douzone.simg.kr/api/prod/",
    headers : {
        "Content-Type": "application/json",
        "X-API-SECRET" : 'FA4A2F94-B9F4-41A0-B064-BFA28CE23BF6'
    },
    timeout: 10000,
})

const stomAndFloodApi = axios.create({
    baseURL: "https://douzone.simg.kr/api/prod/",
    headers : {
        "Content-Type": "application/json",
        "X-API-SECRET" : 'FA4A2F94-B9F4-41A0-B064-BFA28CE23BF6'
    },
    timeout: 10000,
})




export {bussinessCheckApi, consultCarApi, stomAndFloodApi};