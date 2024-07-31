import React, {useState} from "react";
import Button from "../button.tsx";
import ProvisionDetails from "../privacy/provision.tsx";
import MarketingDetails from "../privacy/marketing.tsx";
import CollectDetails from "../privacy/collect.tsx";
import DbLogo from '../../assets/images/logo/db_logo.png';
import HyundaiLogo from '../../assets/images/logo/hyundai_logo.png';
import SimgLogo from '../../assets/images/logo/simg_logo.png';
import KbLogo from '../../assets/images/logo/kb_logo.png';
import CloseIcon from '../../assets/images/icon/close.png';
import PrevIcon from '../../assets/images/icon/back.png';
import CarIcon from '../../assets/images/icon/icon_car.png';
//팝업 열고 닫기
interface PopupProps {
    onClose: () => void;
}

//팝업 내용 타입정의
type ViewType = 'main' | 'information' | 'complete';


export const CarPopup: React.FC<PopupProps> = ({onClose}) => {

    //케이스따라 팝업 내용변경, 뒤로가기 구현
    const [viewHistory, setViewHistory] = useState<ViewType[]>(['main']);

    const navigateTo = (view: ViewType) => {
        setViewHistory(prev => [...prev, view]);
    }

    const goBack = () => {
        setViewHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }

    const currentView = viewHistory[viewHistory.length - 1];

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

    //자세히보기 타입정의
    type DetailType = 'collect' | 'provision' | 'marketing' | null;


    //자세히보기 구현
    const [openDetail, setOpenDetail] = useState<DetailType>(null);

    const toggleDetails = (name: DetailType) => {
        console.log(name);
        setOpenDetail(prev => prev === name ? null : name);
    };

    // 변경되는 팝업 내용
    //자동차보험 메인
    const renderView = () => {
        switch (currentView) {
            case 'main':
                return (
                    <>
                        <div className={'flex justify-end'}>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex justify-between'}>
                            <div>
                                <div className={'font-medium mt-4 text-2xl'}>자동차 보험 가입하기</div>
                                <div className={'text-xl mt-2 tracking-wide'}>보험사를 선택해주세요</div>
                            </div>
                            <img src={CarIcon} width={150} alt={'자동차 아이콘'}/>
                        </div>
                        <div className={'flex flex-wrap'}>
                            <div onClick={() => window.open("https://simg.kr/")}
                                 className="bg-[#fcfcfc] text-lg p-5 rounded-xl w-[230px] h-[160px] mx-[20px] shadow-md flex flex-col justify-between hover:shadow-xl relative">
                                DB 손해보험
                                <img src={DbLogo} width={180}
                                     className={'absolute right-4 bottom-4'} alt={'DB 손해보험'}/>
                            </div>
                            <div onClick={() => window.open("https://simg.kr/")}
                                 className="bg-[#fcfcfc] text-lg p-5 rounded-xl w-[230px] h-[160px] mx-[20px] shadow-md flex flex-col justify-between hover:shadow-xl relative">
                                KB 손해보험
                                <img src={KbLogo} width={190}
                                     className={'absolute right-4 bottom-4'}/>
                            </div>
                            <div onClick={() => window.open("https://simg.kr/")}
                                 className="bg-[#fcfcfc] text-lg p-5 rounded-xl w-[230px] h-[160px] mx-[20px] shadow-md flex flex-col justify-between mt-[30px] hover:shadow-xl relative">
                                현대해상
                                <img src={HyundaiLogo} width={160}
                                     className={'absolute right-4 bottom-4'}/>
                            </div>
                            <div onClick={() => navigateTo('information')}
                                 className="bg-[#fcfcfc] text-lg p-5 rounded-xl w-[230px] h-[160px] mx-[20px] shadow-md flex flex-col justify-between mt-[30px] hover:shadow-xl relative">
                                맞춤보험 가입하기
                                <img src={SimgLogo} width={140}
                                     className={'absolute right-4 bottom-4'} alt={'에스아이엠지 로고'}/>
                            </div>
                        </div>
                        <Button color={'blue'} fill={true} width={550} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={() => navigateTo('information')}>
                            확인
                        </Button>
                    </>
                );
            //자동차보험 - 맞춤보험 선택
            case 'information':
                return (
                    <>
                        <div className={'flex justify-between'}>
                            <img src={PrevIcon} className={'cursor-pointer h-[20px]'} alt={'뒤로가기'}
                                 onClick={goBack}/>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex justify-between'}>
                            <div>
                                <div className={'font-medium mt-4 text-2xl'}>개인정보처리 동의</div>
                                <div className={'text-xl mt-2 tracking-wide'}>보험가입 상담을 위해 개인정보를 입력해주세요. <br/> 맞춤보험 상담신청시
                                    확인 후 맞춤 보험 안내전화를 드립니다
                                </div>
                            </div>
                        </div>
                        <div className={'mt-7'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>성함</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'}/>
                        </div>
                        <div className={'mt-3'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>연락처</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'}/>
                        </div>
                        <div className={'mt-3'}>
                            <div className={'text-lg text-gray-800 px-3 py-2'}>가입희망보험</div>
                            <input type={"text"} className={'w-full h-[35px] p-5 rounded-xl'}/>
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
                        <Button color={'blue'} fill={true} width={550} height={50} textSize={20}
                                className={'mt-[60px]'} rounded={true} onClick={() => navigateTo('complete')}>
                            맞춤보험 상담 신청하기
                        </Button>
                    </>
                );
            //자동차보험 - 맞춤보험완료
            case 'complete':
                return (
                    <>
                        <div className={'flex justify-end'}>
                            <img src={CloseIcon} className={'cursor-pointer h-[20px]'} alt={'닫기'}
                                 onClick={onClose}/>
                        </div>
                        <div className={'flex flex-col items-center'}>
                            <div className={'font-medium mt-4 text-2xl'}>맞춤보험 상담신청이 완료되었습니다</div>
                            <div className={'text-xl mt-2'}>기입하신 연락처로 맞춤보험 상담 전화를 드릴 예정입니다</div>
                        </div>
                        <Button color={'blue'} fill={true} width={550} height={50} textSize={20}
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
        <div className={'w-[550px]'}>
            {renderView()}
        </div>
    );
}