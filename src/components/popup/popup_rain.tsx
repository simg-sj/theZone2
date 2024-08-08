import React, {useCallback, useEffect, useState} from "react";
import Button from "../button.tsx";
import {cnstStomAndFloodApi, isBusinessNumber} from "../../api/stomAndFlood.ts";
import RainIcon from '../../assets/images/icon/icon_rain.png';
import CloseIcon from '../../assets/images/icon/close.png';
import PrevIcon from '../../assets/images/icon/back.png';
import WarningIcon from '../../assets/images/icon/icon_warning.png';
import {pdfjs} from 'react-pdf';
import SelectButtonGroup from "../selectbutton.tsx";
import CollectDetails from "../privacy/collect.tsx";
import ProvisionDetails from "../privacy/provision.tsx";
import MarketingDetails from "../privacy/marketing.tsx";
import DaumPost from "./daumPost.tsx";
import Loading from "../loading.tsx";
import {cnstCarApi1001} from "../../api/cnstCar.ts";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


//팝업 열고 닫기 뒤로가기 구현
interface PopupProps {
    onClose: () => void;
}

//팝업별 지정
type ViewType = 'main' | 'information' | 'address' | 'privacy' | 'warning' | 'complete';

//상품안내 미리보기 뷰어 열기
const openProductGuideViewer = () => {
    const pdfUrl = 'https://douzone.simg.kr/풍수해보험상품안내_DB.pdf'; //공개서버 pdf 업로드 후 사용
    const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;
    window.open(viewerUrl, '_blank', 'width=800,height=600');
};
//보험약관 다운받기
const downloadInsuranceTerms = () => {
    const link = document.createElement('a');
    link.href = 'https://douzone.simg.kr/DB_소상공인_풍수해보험_약관.pdf'; //공개서버 pdf 업로드 후 사용
    link.download = '풍수해보험약관.pdf';
    link.target= '_blank';
    link.click();
};


export const RainPopup: React.FC<PopupProps> = ({onClose}) => {
    const [viewHistory, setViewHistory] = useState<ViewType[]>(['main']);
    const [bNo, setBNo] = useState<string>('');
    //const [bName, setBName] = useState<string>('');


    const navigateTo = (view: ViewType) => {
        setViewHistory(prev => [...prev, view]);
    }
    //뒤로가기
    const goBack = () => {
        setViewHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }
    const currentView = viewHistory[viewHistory.length - 1];
    //버튼선택
    const usage = [
        {id: 'workspace', text: "사업장"},
        {id: 'factory', text: "공장", className: "ml-10"},
    ]
    //버튼선택
    const underground = [
        {id: 'under_yes', text: "지하있음"},
        {id: 'under_no', text: "지하없음", className: "ml-10"},
    ]
    //버튼선택
    const build = [
        {id: 'concrete', text: "콘크리트"},
        {id: 'ect', text: "기타", className: "ml-10"},
    ]
    // ** 체크박스
    //체크박스 타입정의
    interface CheckboxState {
        all: boolean;
        collect: boolean;
        provision: boolean;
        marketing: boolean;
    }

    //체크박스 구현
    const [checkboxes, setCheckboxes] = useState<CheckboxState>({
        all: false,
        collect: false,
        provision: false,
        marketing: false,
    });

    //체크박스구현
    const handleCheckboxChange = (name: keyof CheckboxState) => {
        if (name === 'all') {
            const newValue = !checkboxes.all;
            setCheckboxes({
                all: newValue,
                collect: newValue,
                provision: newValue,
                marketing: newValue,
            });
        } else {
            const newCheckboxes = {
                ...checkboxes,
                [name]: !checkboxes[name],
            };
            setCheckboxes({
                ...newCheckboxes,
                all: newCheckboxes.collect && newCheckboxes.marketing && newCheckboxes.provision,
            });
        }
    };

    // ** 자세히보기 버튼
    //자세히보기 타입정의
    type DetailType = 'collect' | 'provision' | 'marketing' | null;


    //자세히보기 구현
    const [openDetail, setOpenDetail] = useState<DetailType>(null);

    const toggleDetails = (name: DetailType) => {
        console.log(name);
        setOpenDetail(prev => prev === name ? null : name);
    };

    //**개인정보 유효성 검사
    //유효성검사 정의
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [buildName, setBuildName] = useState<string>('');
    const [area, setArea] = useState<string>('');
    const [useType, setUseType] = useState<string>('사업장');
    const [undergroundYn, setUnderGroundYn] = useState<string>('지하있음');
    const [buildType, setBuildType] = useState<string>('콘크리트');
    const [bName, setBName] = useState<string>('');

    // 이름 유효성 검사 및 입력 제한 : 숫자입력불가능, 최대 20자 입력가능
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const noNumbersValue = value.replace(/[0-9]/g, '');
        setName(noNumbersValue.slice(0, 20)); // 최대 20자로 제한
    };

    // 전화번호 유효성 검사 및 입력 제한 : 숫자만 입력가능
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setPhone(value);
    };

    // 이메일 유효성 검사 및 입력 제한 : 최대 50자
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value.slice(0, 50)); // 최대 50자로 제한
    };
    // 사업장주소 유효성 검사 및 입력 제한 : 최대 50자
    const handleBuildNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setBuildName(value);
        }
    };
    // 사업장면적 유효성 검사 및 입력 제한 : 숫자만 입력가능
    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setArea(value);
    };

    // 전화번호 유효성 검사 함수 : 전화번호 포맷 확인 모바일, 국제, 국내 번호만 가능
    const isValidPhone = useCallback((phone: string): boolean => {
        const mobileRegex = /^01[016789]\d{7,8}$/;
        const internationalRegex = /^00[1-9]\d{8,}$/;
        const landlineRegex = /^0[2-7]\d{7,9}$/;
        return mobileRegex.test(phone) || internationalRegex.test(phone) || landlineRegex.test(phone);
    }, []);

// 이메일 유효성 검사 함수 : 이메일 포맷으로만 가능
    const isValidEmail = useCallback((email: string): boolean => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    }, []);

    //개인정보 유호성검사 실패시 나오는 경고 문구
    const handleSubmit = async () => {
        if (name.length < 2) {
            alert('올바른 성함을 입력해주세요.');
            return;
        }
        if (!isValidPhone(phone)) {
            alert('올바른 연락처를 입력해주세요.');
            return;
        }
        if (!isValidEmail(email)) {
            alert('올바른 이메일을 입력해주세요.');
            return;
        }
        if (!checkboxes.collect || !checkboxes.provision) {
            alert('필수 개인정보 동의에 체크해주세요.');
            return;
        }


        let stomParam = {
            pdtType : 'saf',
            bNo : bNo,
            bName : bName,
            address : address,
            buildName : buildName,
            useType : useType,
            buildType : buildType,
            undergroundYn : undergroundYn,
            cName: name,
            area : area,
            cCell: phone,
            cMail : email,
            collect: checkboxes.collect ? 'Y' : 'N',
            marketing: checkboxes.marketing ? 'Y' : 'N',
            provision: checkboxes.provision ? 'Y' : 'N',
        }

        const statusCode = await cnstStomAndFloodApi(stomParam);


        console.log(stomParam)
        if(statusCode === '200'){

           // navigateTo('complete')
        }else {
            alert("서비스 오류")
        }

        //navigateTo('complete');
    };

    //사업장정보 유호성검사 실패시 나오는 경고 문구
    const handleSubmit2 = () => {
        if (area.length < 1) {
            alert('사업장면적을 입력해주세요.');
            return;
        }
        if (address.length < 1) {
            alert('사업장 주소를 입력해주세요.');
            return;
        }


        navigateTo('privacy');
    };

    const handleButtonChange = ( type, selected ) => {
        type === 'usage' && setUseType(selected);
        type === 'underground' && setUnderGroundYn(selected);
        type === 'build' && setBuildType(selected);
    }


    //사업자등록번호 확인
    const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //1288716058
        /*let param = {
            businesses : [
                {
                    "b_no" : bNo,
                    "b_nm" : bName
                }
            ]
        };*/
        let param = {
            "q" : bNo,
            "type" : 'json'
        }
        let result: any = await isBusinessNumber(param);

       if (result.company !== null) {
            setBName(result.company);
            navigateTo('information');  // 유효한 경우 'information' 페이지로 이동
        } else {
            navigateTo('warning');  // 유효하지않은 경우 'warning' 페이지로 이동
        }
    }
    //풍수해보험 메인
    const renderView = () => {
        switch (currentView) {
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
                        {/*<div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장명</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBName(e.currentTarget.value)}/>
                        </div>*/}
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업자등록번호</div>
                            <input type={"number"} className={'w-full h-[35px] p-5 rounded-xl'} maxLength={10}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > e.target.maxLength)
                                           e.target.value = e.target.value.slice(0, e.target.maxLength);
                                   }}

                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBNo(e.currentTarget.value)}/>
                        </div>
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
                        <div className={'flex justify-between fixed bg-white w-[600px] py-6 z-10'}>
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
                                   onClick={() => navigateTo('address')} value={address} readOnly={true} />
                            <input type={"text"} defaultValue={buildName} onChange={handleBuildNameChange}
                                   className={'w-full h-[35px] p-5 rounded-xl mt-2'}
                                   placeholder={'동, 호수 등 기타주소를 입력해주세요'}/>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>건물 용도</div>
                            <SelectButtonGroup
                                buttons={usage}
                                type = {'usage'}
                                onChange={handleButtonChange}
                                activeColor="bg-blue-400 text-white rounded-xl w-[280px] h-[45px]"
                                inactiveColor="text-gray-400 border-inherit border-2 rounded-xl w-[280px] h-[45px]"
                            />
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>지하소재 여부</div>
                            <SelectButtonGroup
                                buttons={underground}
                                type = {'underground'}
                                onChange={handleButtonChange}
                                activeColor="bg-blue-400 text-white rounded-xl w-[280px] h-[45px]"
                                inactiveColor="text-gray-400 border-inherit border-2 rounded-xl w-[280px] h-[45px]"
                            />
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>건축물 유형</div>
                            <SelectButtonGroup
                                buttons={build}
                                type = {'build'}
                                onChange={handleButtonChange}
                                activeColor="bg-blue-400 text-white rounded-xl w-[280px] h-[45px]"
                                inactiveColor="text-gray-400 border-inherit border-2 rounded-xl w-[280px] h-[45px]"
                            />
                        </div>
                        <div className={'mt-7 relative'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>사업장면적</div>
                            <input type={"number"} value={area} onChange={handleAreaChange}
                                   className={'w-full h-[35px] p-5 pr-[50px] rounded-xl'}/>
                            <div className={'absolute top-[53px] right-5'}>㎡</div>
                        </div>
                        <Button color={'blue'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={handleSubmit2}>
                            확인
                        </Button>
                    </>
                );
            //풍수해보험 주소검색
            case 'address':
                return (
                        <div className={'mt-7 h-[600px]'}>
                            <DaumPost goBack={goBack} onClose={onClose} setAddress={setAddress} setBuildName={setBuildName} />
                        </div>
                );
            //풍수해보험 개인정보처리동의
            case 'privacy':
                return (
                    <>
                        <div className={'flex justify-between fixed bg-white w-[600px] py-6'}>
                            <img src={PrevIcon} className={'cursor-pointer h-[20px]'} alt={'뒤로가기'}
                                 onClick={goBack}/>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex justify-between pt-[55px]'}>
                            <div>
                                <div className={'font-medium mt-4 text-2xl'}>개인정보처리 동의</div>
                                <div className={'text-xl mt-2 tracking-wide'}>보험가입을 위해 개인정보를 입력해주세요. <br/>
                                    확인 후 해당 연락처로 풍수재보험 가입을 안내해 드립니다
                                </div>
                            </div>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>성함</div>
                            <input
                                type="text"
                                className={'w-full h-[35px] p-5 rounded-xl'}
                                value={name}
                                onChange={handleNameChange}
                                placeholder="연락 받으실 분 성함을 입력해주세요"
                            />
                        </div>
                        <div className={'mt-3'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>연락처</div>
                            <input
                                type="tel"
                                className={'w-full h-[35px] p-5 rounded-xl'}
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="연락 받으실 연락처를 입력해주세요"
                            />
                        </div>
                        <div className={'mt-3'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>이메일</div>
                            <input
                                type="text"
                                className={'w-full h-[35px] p-5 rounded-xl'}
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="계약에 필요한 안내 및 서류를 전달드립니다"
                            />
                        </div>
                        {/*개인정보활용 동의*/}
                        <div>
                            <label className={'mt-5 flex items-center'}>
                                <input
                                    type="checkbox"
                                    className={'mr-3 w-4'}
                                    checked={checkboxes.all}
                                    onChange={() => handleCheckboxChange('all')}
                                />
                                <div className={'text-lg'}>개인정보 활용 전체 동의하기</div>
                            </label>
                            <div className={'mt-4 flex items-center justify-between'}>
                                <label className={'flex items-center'}>
                                    <input
                                        type="checkbox"
                                        className={'mr-3 w-4'}
                                        checked={checkboxes.collect}
                                        onChange={() => handleCheckboxChange('collect')}
                                    />
                                    <div className={'text-lg text-gray-700'}><span
                                        className={'text-black'}>(필수)</span> 개인정보 수집 및 이용에 대한 동의
                                    </div>
                                </label>
                                <Button color="lightblue" fill={false} width={120} height={30} textSize={16}
                                        rounded={true} onClick={() => toggleDetails('collect')}>
                                    자세히보기
                                </Button>
                            </div>
                            {openDetail === 'collect' && (
                                <CollectDetails/>
                            )}
                            <div className={'mt-4 flex items-center justify-between'}>
                                <label className={'flex items-center'}>
                                    <input
                                        type="checkbox"
                                        className={'mr-3 w-4'}
                                        checked={checkboxes.provision}
                                        onChange={() => handleCheckboxChange('provision')}
                                    />
                                    <div className={'text-lg text-gray-700'}><span
                                        className={'text-black'}>(필수)</span> 개인정보 제 3자 제공에 대한 동의
                                    </div>
                                </label>
                                <Button color="lightblue" fill={false} width={120} height={30} textSize={16}
                                        rounded={true} onClick={() => toggleDetails('provision')}>
                                    자세히보기
                                </Button>
                            </div>
                            {openDetail === 'provision' && (
                                <ProvisionDetails/>
                            )}
                            <div className={'mt-4 flex items-center justify-between'}>
                                <label className={'flex items-center'}>
                                    <input
                                        type="checkbox"
                                        className={'mr-3 w-4'}
                                        checked={checkboxes.marketing}
                                        onChange={() => handleCheckboxChange('marketing')}
                                    />
                                    <div className={'text-lg text-gray-700'}><span
                                        className={'text-black'}>(선택)</span> 광고성 정보 수신에 대한 동의
                                    </div>
                                </label>
                                <Button color="lightblue" fill={false} width={120} height={30} textSize={16}
                                        rounded={true} onClick={() => toggleDetails('marketing')}>
                                    자세히보기
                                </Button>
                            </div>
                            {openDetail === 'marketing' && (
                                <MarketingDetails/>
                            )}
                        </div>
                        <Button
                            color={'blue'}
                            fill={true}
                            width={600}
                            height={50}
                            textSize={20}
                            className={'mt-[60px]'}
                            rounded={true}
                            onClick={handleSubmit}
                        >
                            맞춤보험 상담 신청하기
                        </Button>
                    </>
                )
                    ;
            //등록되지않은 사업자
            case 'warning':
                return (
                    <>
                        <div className={'flex justify-end fixed bg-white w-[600px] py-6'}>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex flex-col items-center pt-[55px]'}>
                            <img src={WarningIcon} alt={'warning'} width={80} className={'my-5'}/>
                            <div className={'font-medium mt-4 text-2xl'}>올바른 사업자 번호가 아닙니다</div>
                            <div className={'text-xl mt-2'}>사업자등록증을 기준으로 사업자 번호를 작성해주세요</div>
                        </div>
                        <Button color={'red'} fill={true} width={600} height={50} textSize={20}
                                className={'mt-[50px]'} rounded={true} onClick={() => navigateTo('main')}>
                            다시 입력하기
                        </Button>
                    </>
                );
            //풍수해보험 - 신청완료
            case 'complete':
                return (
                    <>
                        <div className={'flex justify-end fixed bg-white w-[600px] py-6'}>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex flex-col items-center pt-[55px]'}>
                            <div className={'font-medium mt-4 text-2xl'}>풍수해보험 신청이 완료되었습니다</div>
                            <div className={'text-xl mt-2 text-center'}>보험가입 안내 사항은 메일을 확인해주세요</div>
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
        <div className={'w-[600px] pb-8'}>
            {renderView()}
        </div>
    );
}