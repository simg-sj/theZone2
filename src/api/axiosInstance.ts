/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-08-05 16:20:18
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-08-05 16:42:41
 * @FilePath: src/api/axiosInstance.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


import axios from "axios";

const stomAndFloodApi = axios.create({
    baseURL: "https://bizno.net/api/",
    timeout: 10000,
})

const consultCarApi = axios.create({
    baseURL: "https://43.201.51.204:42524/api/v1/prod/",
    timeout: 10000,
})

export {stomAndFloodApi, consultCarApi};