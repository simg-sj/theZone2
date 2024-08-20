/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-08-05 14:52:30
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-08-20 13:45:20
 * @FilePath: src/components/popup/daumPost.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import DaumPostcode from 'react-daum-postcode';
import React, {SetStateAction} from "react";
import PrevIcon from "../../assets/images/icon/back.png";
import CloseIcon from "../../assets/images/icon/close.png";

interface Props {
    goBack : any,
    onClose : any
    setAddress : React.Dispatch<SetStateAction<string>>
    setBuildName : React.Dispatch<SetStateAction<string>>
    setPostNum : React.Dispatch<SetStateAction<string>>
}

const DaumPost = ({ goBack, onClose, setAddress, setBuildName, setPostNum}: Props) => {
    const onCompletePost = (data : any) => {
        console.log(data);
        setAddress(data.address);
        setBuildName(data.buildingName);
        setPostNum(data.zonecode);
        goBack();
    }    

    return (
        <div>
            <div className={'flex justify-between fixed bg-white w-[600px] py-6'}>
                <img src={PrevIcon} className={'cursor-pointer h-[20px]'} alt={'뒤로가기'}
                     onClick={goBack}/>
                <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                     onClick={onClose}/>
            </div>
            <div className={'pt-[55px]'}>
                <div className={'font-medium mt-4 text-2xl'}>사업장 주소를 검색해주세요</div>
                <div className={'text-xl mt-2'}>건축물 대장을 기준으로 정확하게 입력해주세요</div>
            </div>
            <div className={'mt-7'}>
                <DaumPostcode onComplete={onCompletePost}/>
            </div>
        </div>
);
}

export default DaumPost