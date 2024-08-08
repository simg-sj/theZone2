import React, {SetStateAction, useState} from 'react';

//SelectButton 컴포넌트 Props 타입 정의
interface SelectButtonProps {
    id: string | number,
    text: string,
    isActive: boolean,
    onClick: (id: string | number) => void,
    activeColor: string,
    inactiveColor: string,
    className?: string,
}

//SelectButton 컴포넌트 정의
const SelectButton: React.FC<SelectButtonProps> = ({
                                                       id,
                                                       text,
                                                       isActive,
                                                       onClick,
                                                       activeColor,
                                                       inactiveColor,
                                                       className,
                                                   }) => {
    return (
        <button
            className={`
        px-5 py-2 rounded-md transition-colors duration-300 ease-in-out
        ${isActive ? activeColor : inactiveColor}
        ${className || ''}
      `.trim()}
            onClick={() => onClick(text)}
        >
            {text}
        </button>
    );
};

// SelectButtonGroup 컴포넌트는 이전과 동일합니다.

//버튼 데이터 타입정의
// interface ButtonData {
//     id: string | number;
//     text: string;
// }

//SelectButtonGroup 컴포넌트 props 타입 정의
interface SelectButtonGroupProps {
    buttons: Array<{ id: string; text: string; className?: string }>,
    activeColor: string,
    type : string,
    inactiveColor: string,
    onChange: (type : string ,selected: string) => void;
}

//SelectButtonGroup 컴포넌트 정의
const SelectButtonGroup: React.FC<SelectButtonGroupProps> = ({buttons,type, activeColor, inactiveColor, onChange}) => {
    // 현재 활성화된 버튼의 ID를 저장하는 상태 (초기 상태를 첫 번째 버튼의 id로 설정)
    const [activeButtonId, setActiveButtonId] = useState<string | number>(buttons[0].text);

    //버튼 클릭시 동작
    const handleButtonClick = (text: string | number): void => {
        setActiveButtonId(text);
        onChange(type , text.toString()); // 부모 컴포넌트에 선택된 값을 전달
    };

    return (
        <div className='flex'>
            {buttons.map((button, index) => (
                <div key={index}>
                    <SelectButton
                        {...button}
                        isActive={activeButtonId === button.text} //현재 버튼이 활성화 된 상태인지 확인
                        onClick={handleButtonClick}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                    />
                </div>
            ))}
        </div>
    );
};

export default SelectButtonGroup;