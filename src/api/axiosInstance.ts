/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-08-05 16:20:18
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-08-20 16:05:41
 * @FilePath: src/api/axiosInstance.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadingActions} from "../redux/slice/authSlice.ts";

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

const useAxiosInterceptors = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const setUpInterceptors = (apiInstance: AxiosInstance) => {
            apiInstance.interceptors.request.use(
                (config: InternalAxiosRequestConfig) => {
                    dispatch(loadingActions.GLOBAL_LOADING());
                    return config;
                },
                (error: AxiosError) => {
                    dispatch(loadingActions.GLOBAL_LOADED());
                    return Promise.reject(error);
                }
            );

            apiInstance.interceptors.response.use(
                (response: AxiosResponse) => {
                    dispatch(loadingActions.GLOBAL_LOADED());
                    return response;
                },
                (error: AxiosError) => {
                    dispatch(loadingActions.GLOBAL_LOADED());
                    return Promise.reject(error);
                }
            );
        };

        // 두 인스턴스에 동일한 인터셉터 설정
        setUpInterceptors(bussinessCheckApi);
        setUpInterceptors(consultCarApi);
        setUpInterceptors(stomAndFloodApi);
    }, [dispatch]);
};



export {bussinessCheckApi, consultCarApi, stomAndFloodApi,useAxiosInterceptors};