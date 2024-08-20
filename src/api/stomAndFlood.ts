/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-07-30 13:54:39
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-08-16 14:41:04
 * @FilePath: src/api/stomAndFlood.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import {bussinessCheckApi, stomAndFloodApi,} from './axiosInstance.ts';
import {businessType} from "../@types/common";

interface ResultBusinessType{
    items : businessType[]
}
export const isBusinessNumber = async(params : any) : Promise<businessType[] > => {
    try {
        /*let serviceKey = 'ai5a6pvD0V3lvsdTXpIhd2zbh5PL8n4nNgfJ4se1Qy2UQwMcSQgYgcg3O7PgU4ZAwX2B65h%2BwgBnRTYFnOLjpw%3D%3D';
        let baseUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;*/
        let serviceKey  = 'cmxhcmxlanIzMTc4QG5hdmVyLmNvbSAg';
        const {data } =  await bussinessCheckApi.post<ResultBusinessType>(`fapi?key=${serviceKey}&gb=${params.gb}&q=${params.q}&type=${params.type}`);
        if(typeof data === 'object' && Array.isArray(data.items)){
            return data.items;
        }else {
            alert('서비스 오류입니다. \n본사에 문의주시기 바랍니다. \n☎ 1670-0470');
            throw new Error('error');
        }
    }catch(e){
        alert('서비스 오류입니다. \n본사에 문의주시기 바랍니다. \n☎ 1670-0470');
        throw e;
    }
}

interface stomResult {
    statusCode : string;
}

export const cnstStomAndFloodApi = async(params : any) : Promise<stomResult> => {
    try {
        const {data} =  await stomAndFloodApi.post<stomResult>('/api1001', params);
        if(typeof data === 'object' && typeof data.statusCode === 'string'){
            return data;
        }else {
            alert('서비스 오류입니다. \n본사에 문의주시기 바랍니다. \n☎ 1670-0470');
            throw new Error('error');
        }
    }catch(e){
        alert('서비스 오류입니다. \n본사에 문의주시기 바랍니다. \n☎ 1670-0470');
        throw e;
    }
}