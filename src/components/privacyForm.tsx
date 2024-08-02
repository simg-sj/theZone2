import React, { useState, useCallback } from "react";
import Button from "./button.tsx";
import CollectDetails from "./privacy/collect.tsx";
import ProvisionDetails from "./privacy/provision.tsx";
import MarketingDetails from "./privacy/marketing.tsx";

interface PrivacyFormProps {
    hideDesiredInsurance?: boolean;
    hideEmail?: boolean;
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    name: string;
    phone: string;
    email: string;
    desiredInsurance: string;
    checkboxes: CheckboxState;
}

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


type DetailType = 'collect' | 'provision' | 'marketing' | null;

const PrivacyForm: React.FC<PrivacyFormProps> = ({ hideDesiredInsurance = false, hideEmail = false, onSubmit }) => {


//자세히보기 구현
const [openDetail, setOpenDetail] = useState<DetailType>(null);

const toggleDetails = (name: DetailType) => {
    console.log(name);
    setOpenDetail(prev => prev === name ? null : name);
};

//**개인정보 유효성 검사
//이름 휴대폰번호 유효성 검사
const [name, setName] = useState<string>('');
const [phone, setPhone] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [desiredInsurance, setDesiredInsurance] = useState<string>('');

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

// 가입희망보험 입력 제한 : 최대 50자 입력가능
const handleDesiredInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
        setDesiredInsurance(value);
    }
};

// 이메일 입력 처리 함수 수정
const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value.slice(0, 50)); // 최대 50자로 제한
};

// 전화번호 유효성 검사 함수 : 전화번호 포맷 확인 모바일, 국제, 국내 번호만 가능
const isValidPhone = useCallback((phone: string): boolean => {
    const mobileRegex = /^01[016789]\d{7,8}$/;
    const internationalRegex = /^00[1-9]\d{8,}$/;
    const landlineRegex = /^0[2-7]\d{7,9}$/;
    return mobileRegex.test(phone) || internationalRegex.test(phone) || landlineRegex.test(phone);
}, []);

// 이메일 유효성 검사 함수 추가
const isValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}, []);

//유호성검사 실패시 나오는 경고 문구
    const handleSubmit = () => {
        if (name.length < 2) {
            alert('올바른 성함을 입력해주세요.');
            return;
        }
        if (!isValidPhone(phone)) {
            alert('올바른 연락처를 입력해주세요.');
            return;
        }
        if (!hideEmail && !isValidEmail(email)) {
            alert('올바른 이메일을 입력해주세요.');
            return;
        }
        if (!checkboxes.collect || !checkboxes.provision) {
            alert('필수 개인정보 동의에 체크해주세요.');
            return;
        }

        onSubmit({
            name,
            phone,
            email,
            desiredInsurance,
            checkboxes
        });
    };

    return (
        <>
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
            {!hideEmail && (
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
            )}
            {!hideDesiredInsurance && (
                <div className={'mt-3'}>
                    <div className={'text-lg text-gray-800 px-3 py-2'}>가입희망보험</div>
                    <input
                        type="text"
                        className={'w-full h-[35px] p-5 rounded-xl'}
                        value={desiredInsurance}
                        onChange={handleDesiredInsuranceChange}
                        placeholder="가입희망보험을 작성해주세요"
                    />
                </div>
            )}
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
    );
};

export default PrivacyForm;