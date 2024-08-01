import React, { useState } from "react";
import Button from "../button.tsx";
import { isBusinessNumber } from "../../api/stomAndFlood.ts";
import RainIcon from '../../assets/images/icon/icon_rain.png';
import CloseIcon from '../../assets/images/icon/close.png';
import PrevIcon from '../../assets/images/icon/back.png';
import WarningIcon from '../../assets/images/icon/icon_warning.png';
import { pdfjs } from 'react-pdf';
import SelectButtonGroup from "../selectbutton.tsx";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


//팝업 열고 닫기 뒤로가기 구현
interface PopupProps {
    onClose: () => void;
}
//팝업별 지정
type ViewType = 'main' | 'information' | 'address' | 'warning';

//상품안내 미리보기 뷰어 열기
const openProductGuideViewer = () => {
    const pdfUrl = 'https://풍수해보험상품안내_DB.pdf'; //공개서버 pdf 업로드 후 사용
    const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;
    window.open(viewerUrl, '_blank', 'width=800,height=600');
};
//보험약관 다운받기
const downloadInsuranceTerms = () => {
    const link = document.createElement('a');
    link.href = 'https://풍수해보험약관_DB.pdf'; //공개서버 pdf 업로드 후 사용
    link.download = '풍수해보험약관.pdf';
    link.click();
};

//팝업
export const RainPopup: React.FC<PopupProps> = ({onClose}) => {
    const [viewHistory, setViewHistory] = useState<ViewType[]>(['main']);
    const [bNo, setBNo] = useState<string>('');

    const navigateTo = (view: ViewType) => {
        setViewHistory(prev => [...prev, view]);
    }
//뒤로가기
    const goBack = () => {
        setViewHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }
    const currentView = viewHistory[viewHistory.length - 1];
    //버튼선택
    const build = [
        { id: 'concrete', text: "콘크리트" },
        { id: 'ect', text: "기타", className: "ml-10" },
    ]
    //버튼선택
    const underground = [
        { id: 'under_yes', text: "지하있음" },
        { id: 'under_no', text: "지하없음", className: "ml-10" },
    ]
//사업자등록번호 확인
    const onClickHandler = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //1288716058
        let param = {
            b_no : [bNo]
        };
        let result  = await isBusinessNumber(param);
        if(result.b_stt_cd === '01'){
            navigateTo('information');  // 유효한 경우 'information' 페이지로 이동
        }else {
            navigateTo('warning');  // 유효하지않은 경우 'warning' 페이지로 이동
        }
    }
    //풍수해보험 메인
    const renderView = () => {
        switch(currentView) {
            case 'main':
                return (
                    <>
                        <div className={'flex justify-end fixed bg-white w-[600px] py-6'}>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex justify-between pt-[55px]'}>
                            <div>
                                <div className={'font-medium mt-4 text-2xl'}>풍수해보험 가입하기</div>
                                <div className={'text-xl mt-2'}>예기치 못한 자연재해들로부터 피해를 입은 소상공인 <br/> 사업장의 건물, 시설, 재고자산등의 피해
                                    복구 비용을<br/>최대 5천만원까지 보상해드립니다. (가입기간 1년, 이후 갱신)
                                </div>
                            </div>
                            <img src={RainIcon} width={120} className={'mt-3'} alt={'우산아이콘'}/>
                        </div>
                        <div className={'mt-8 flex justify-end'}>
                            <Button color={'blue'} fill={false} width={160} height={30} textSize={16}
                                    rounded={true} className={'mr-3'} onClick={openProductGuideViewer}>
                                상품안내 미리보기
                            </Button>
                            <Button color={'blue'} fill={false} width={160} height={30} textSize={16}
                                    rounded={true} onClick={downloadInsuranceTerms}>
                                보험약관 다운받기
                            </Button>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장명</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'}/>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업자등록번호</div>
                            <input type={"number"} className={'w-full h-[35px] p-5 rounded-xl'} maxLength={10}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value.length > e.target.maxLength)
                                    e.target.value = e.target.value.slice(0, e.target.maxLength);
                            }}

                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBNo(e.currentTarget.value)}/>
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
                        <div className={'flex justify-between fixed bg-white w-[600px] py-6'}>
                            <img src={PrevIcon} className={'cursor-pointer h-[20px]'} alt={'뒤로가기'}
                                 onClick={goBack}/>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'pt-[55px]'}>
                            <div className={'font-medium mt-4 text-2xl'}>사업장 정보를 입력해주세요</div>
                            <div className={'text-xl mt-2'}>건축물 대장을 기준으로 정확하게 입력해주세요</div>
                        </div>
                        <div className={'mt-7 relative'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장주소</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl cursor-pointer'}
                                   onClick={() => navigateTo('address')}/>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl mt-2'}
                                   placeholder={'동, 호수 등 기타주소를 입력해주세요'}/>
                        </div>
                        <div className={'mt-7 relative'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장면적</div>
                            <input type={"number"} className={'w-full h-[35px] p-5 pr-[50px] rounded-xl'}/>
                            <div className={'absolute top-[53px] right-5'}>㎡</div>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>건축물 유형</div>
                            <SelectButtonGroup
                                buttons={build}
                                activeColor="bg-blue-400 text-white rounded-xl w-[280px] h-[45px]"
                                inactiveColor="text-gray-400 border-inherit border-2 rounded-xl w-[280px] h-[45px]"
                            />
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>지하소재 여부</div>
                            <SelectButtonGroup
                                buttons={underground}
                                activeColor="bg-blue-400 text-white rounded-xl w-[280px] h-[45px]"
                                inactiveColor="text-gray-400 border-inherit border-2 rounded-xl w-[280px] h-[45px]"
                            />
                        </div>
                        <Button color={'blue'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={onClose}>
                            보험료 조회 및 가입하기
                        </Button>
                    </>
                );
            //풍수해보험 주소검색
            case 'address':
                return (
                    <>
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
                            <div className={'text-lg text-gray-800 px-3 py-2'}>daum 주소 검색 api 불러오기</div>
                        </div>
                        <Button color={'blue'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={goBack}>
                            확인
                        </Button>
                    </>
                );
            //등록되지않은 사업자
            case 'warning':
                return (
                    <>
                        <div className={'flex justify-end fixed bg-white w-[600px] py-6'}>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex flex-col items-center pt-[55px]'}>
                            <img src={WarningIcon} alt={'warning'} width={80} className={'my-5'} />
                            <div className={'font-medium mt-4 text-2xl'}>올바른 사업자 번호가 아닙니다</div>
                            <div className={'text-xl mt-2'}>사업자등록증을 기준으로 사업자 번호를 작성해주세요</div>
                        </div>
                        <Button color={'red'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[50px]'} rounded={true} onClick={() => navigateTo('main')}>
                            다시 입력하기
                        </Button>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <div className={'w-[600px] pb-8'}>
            {renderView()}
        </div>
    );
}