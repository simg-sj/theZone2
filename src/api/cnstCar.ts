/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-08-05 15:58:49
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-08-06 16:32:32
 * @FilePath: src/api/cnstCar.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */



import {consultCarApi} from "./axiosInstance.ts";

interface carResult{
    statusCode : string
}

export const cnstCarApi1001 = async(params : any) : Promise<carResult | undefined> => {
    try {
        const {data} =  await consultCarApi.post<carResult>('/api1001', params);
        console.log(data);
        return data.statusCode;
    }catch(e){
        alert('서비스 오류입니다. \n본사에 문의주시기 바랍니다. \n☎ 1670-0470');
    }
}
