import React, { useEffect, useState, useRef } from 'react';
import Button from "./button.tsx";
import { CarPopup } from './popup/popup_car.tsx';
import { RainPopup } from './popup/popup_rain.tsx';
import CarIcon from '../assets/images/icon/icon_car.png';
import RainIcon from '../assets/images/icon/icon_rain.png';

// 팝업 컴포넌트
const Popup: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div ref={popupRef} className="bg-white px-10 rounded-xl shadow-[0_2px_30px_5px_rgba(0,0,0,0.3)] max-h-[700px] overflow-y-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}

interface CardProps {
    imagePath: string;
    title: string;
    content: string;
    tag: string;
    PopupComponent: React.ComponentType<{ onClose: () => void }>;
}

const Card: React.FC<CardProps> = ({ imagePath, title, content, tag, PopupComponent }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleCardClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showPopup]);

    return (
        <>
            <div className="bg-[#fcfcfc] text-lg p-5 rounded-xl w-[350px] h-[260px] mx-[25px] shadow-md flex flex-col justify-between mt-[60px] cursor-pointer hover:shadow-xl"
                 onClick={handleCardClick}>
            <div>
                <div className={"flex"}>
                    <img src={imagePath} alt={title} width={50} className={'mr-3'}/>
                    <div className="font-semibold mt-3">{title}</div>
                </div>
                <div className={'mt-3 text-gray-700 break-keep text-base whitespace-pre-line'}>{content}</div>
            </div>
            <div className={'mt-3 text-blue-500 break-keep text-base'}>{tag}</div>
            <div className={"flex justify-end"}>
            <Button color={'blue'} fill={true} width={100} height={35}>가입하기</Button>
            </div>
        </div>
            {showPopup && (
                <Popup onClose={handleClosePopup}>
                    <PopupComponent onClose={handleClosePopup} />
                </Popup>
            )}
        </>
    );
}

export default function CardList() {
    return (
        <div className="flex flex-wrap">
            <Card
                imagePath={CarIcon}
                title="자동차 보험"
                content="타는 만큼 내는 쉽고 간편한 자동차보험"
                tag="#교통 #단체보험 #개인보험"
                PopupComponent={CarPopup}
            />
            <Card
                imagePath={RainIcon}
                title="풍수해보험"
                content="소상공인 풍수해보험(Ⅳ) 전액지원!
                          자연재해로 인한 피해보장"
                tag="#소상공인 #단체보험 #개인보험"
                PopupComponent={RainPopup}
            />
        </div>
    );
}