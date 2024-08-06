/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-07-30 14:43:45
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-08-05 17:01:52
 * @FilePath: src/@types/common.d.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


export type businessType = {
    /*b_no:string
    b_stt:string
    b_stt_cd:string
    end_dt:string | null
    invoice_apply_dt:string | null
    rbf_tax_type:string
    rbf_tax_type_cd:string
    tax_type:string
    tax_type_cd:string
    tax_type_change_dt:string | null
    utcc_yn:string*/
    items : [
        {
            bno : string,
            company : string
        }   
    ]
}