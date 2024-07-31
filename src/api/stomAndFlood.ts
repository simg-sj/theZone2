/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-07-30 13:54:39
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-07-30 16:12:16
 * @FilePath: src/api/stomAndFlood.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import axios from 'axios';
import {businessType} from "../@types/common";

export const isBusinessNumber = async<T = businessType>(params) : Promise<T> => {
    try {
        let serviceKey = 'ai5a6pvD0V3lvsdTXpIhd2zbh5PL8n4nNgfJ4se1Qy2UQwMcSQgYgcg3O7PgU4ZAwX2B65h%2BwgBnRTYFnOLjpw%3D%3D';
        let baseUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;
        const {data} =  await axios.post<T>(baseUrl, params);
        return data.data[0];
    }catch(e){
        alert('서비스 오류입니다. \n본사에 문의주시기 바랍니다. \n☎ 1670-0470');
    }
}