import React, { useState } from "react";
import Button from "../button.tsx";
import { isBusinessNumber } from "../../api/stomAndFlood.ts";

//팝업 열고 닫기 뒤로가기 구현
interface PopupProps {
    onClose: () => void;
}
//팝업별 지정
type ViewType = 'main' | 'information' | 'address' | 'warning';

export const RainPopup: React.FC<PopupProps> = ({onClose}) => {
    const [viewHistory, setViewHistory] = useState<ViewType[]>(['main']);
    const [bNo, setBNo] = useState<string>('');
    const [bName, setBName] = useState<string>('');
    const navigateTo = (view: ViewType) => {
        setViewHistory(prev => [...prev, view]);
    }

    const goBack = () => {
        setViewHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }

    const currentView = viewHistory[viewHistory.length - 1];

    const onClickHandler = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //1288716058
        let param = {
            b_no : [bNo]
        };
        let result  = await isBusinessNumber(param);
        if(result.b_stt_cd === '01'){
            alert('유효');
        }else {
            alert('등록되지 않은 사업자');
        }
    }
    //풍수해보험 메인
    const renderView = () => {
        switch(currentView) {
            case 'main':
                return (
                    <>
                        <div className={'flex justify-end'}>
                            <img src={'../../public/icon/close.png'} className={'cursor-pointer h-[20px]'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex justify-between'}>
                            <div>
                                <div className={'font-medium mt-4 text-2xl'}>풍수해보험 가입하기</div>
                                <div className={'text-xl mt-2'}>예기치 못한 자연재해들로부터 피해를 입은 소상공인 <br/> 사업장의 건물, 시설, 재고자산등의 피해
                                    복구 비용을<br/>최대 5천만원까지 보상해드립니다. (가입기간 1년, 이후 갱신)
                                </div>
                            </div>
                            <img src={'../../public/icon/icon_rain.png'} width={120} className={'mt-3'}/>
                        </div>
                        <div className={'mt-8 flex justify-end'}>
                            <Button color={'blue'} fill={false} width={160} height={30} textSize={16}
                                    rounded={true} className={'mr-3'}>상품안내 미리보기</Button>
                            <Button color={'blue'} fill={false} width={160} height={30} textSize={16}
                                    rounded={true}>보험약관 다운받기</Button>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장명</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'}/>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업자등록번호</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setBNo(e.currentTarget.value)}/>
                        </div>
                        <div className={'mt-3 text-gray-500'}>* 법인 사업자는 보험료 결제 시 공인인증서가 필요합니다</div>
                        <Button color={'blue'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={onClickHandler}>
                            확인
                        </Button>
                    </>
                );
                //풍수해보험 사업장정보
            case 'information':
                return (
                    <>
                        <div className={'flex justify-between'}>
                            <img src={'../../public/icon/back.png'} className={'cursor-pointer h-[20px]'}
                                 onClick={goBack}/>
                            <img src={'../../public/icon/close.png'} className={'cursor-pointer h-[20px]'}
                                 onClick={onClose}/>
                        </div>
                        <div>
                            <div className={'font-medium mt-4 text-2xl'}>사업장 정보를 입력해주세요</div>
                            <div className={'text-xl mt-2'}>건축물 대장을 기준으로 정확하게 입력해주세요</div>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장주소</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'} onClick={() => navigateTo('address')}/>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl mt-2'} placeholder={'동, 호수 등 기타주소를 입력해주세요'}/>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장면적</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'}/>
                        </div>
                        <Button color={'blue'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={() => navigateTo('warning')}>
                            보험료 조회 및 가입하기
                        </Button>
                    </>
                );
                //풍수해보험 주소검색
            case 'address':
                return (
                    <>
                        <div className={'flex justify-between'}>
                            <img src={'../../public/icon/back.png'} className={'cursor-pointer h-[20px]'}
                                 onClick={goBack}/>
                            <img src={'../../public/icon/close.png'} className={'cursor-pointer h-[20px]'}
                                 onClick={onClose}/>
                        </div>
                        <div>
                            <div className={'font-medium mt-4 text-2xl'}>사업장 주소를 검색해주세요</div>
                            <div className={'text-xl mt-2'}>건축물 대장을 기준으로 정확하게 입력해주세요</div>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장주소 검색영역</div>
                        </div>
                        <Button color={'blue'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={goBack}>
                            확인
                        </Button>
                    </>
                );
                //풍수해보험가입완료 (나중에 사업번호 일치안하는 경고문으로 바꿀예정**
            case 'warning':
                return (
                    <>
                        <div className={'flex justify-end'}>
                            <img src={'../../public/icon/close.png'} className={'cursor-pointer h-[20px]'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex flex-col items-center'}>
                            <div className={'font-medium mt-4 text-2xl'}>풍수해보험 가입이 완료되었습니다</div>
                        </div>
                        <Button color={'blue'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[50px]'} rounded={true} onClick={onClose}>
                            확인
                        </Button>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <div className={'w-[600px]'}>
            {renderView()}
        </div>
    );
}