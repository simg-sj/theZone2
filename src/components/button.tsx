import React from "react";

// 필요한 컬러 추가
type colorType = "blue" | "lightblue" | "gray" | "white";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    rounded?: boolean;
    textSize?: number;
    fill?: boolean;
    color: colorType;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
}

// 버튼 배경 색상
const bgColor: { blue: string; white: string; lightblue: string; gray: string } = {
    blue: "bg-[#4986fc]",
    lightblue: "bg-[#91b6ff]",
    gray: "bg-[#c3c3c3]",
    white: "bg-[#ffffff]",
}
// 버튼 테두리 색상
const borderColor: { blue: string; white: string; lightblue: string; gray: string } = {
    blue: "border-[#4986fc]",
    lightblue: "border-[#91b6ff]",
    gray: "border-[#c3c3c3]",
    white: "border-[#ffffff]",
}
// 버튼 글자 색상
const textColor: { blue: string; white: string; lightblue: string; gray: string } = {
    blue: "text-[#4986fc]",
    lightblue: "text-[#91b6ff]",
    gray: "text-[#c3c3c3]",
    white: "text-[#ffffff]",
};

// 버튼 라운드, 컬러, 폰트두께 설정
function combineClass({rounded, fill, color, fontWeight}: Omit<Button, "children" | "width" | "height">) {
    let className = rounded ? "rounded-full" : "rounded-md";
    if (fontWeight) className += " " + fontWeight;
// 버튼 배경색에 따라 폰트색상, 테두리 자동으로 바꾸기
    if (fill) {
        let textColor = "text-white";
        if (color === "gray") {
            textColor = "text-[#c3c3c3]";
        }
        // @ts-ignore
        return `${className} ${bgColor[color]} ${textColor}`;
    } else {
        // @ts-ignore
        return `border bg-white ${className} ${borderColor[color]} ${textColor[color]}`;
    }
}

//버튼 가로, 세로, 폰트사이즈
function Button({
                    children,
                    type = "button",
                    rounded = false,
                    textSize,
                    fill = false,
                    color,
                    fontWeight,
                    width,
                    height,
                    className = "",
                    style,
                    ...props
                }: Button) {
    if (!style) style = {};

    if (width) {
        style.width = width + "px";
    }
    if (height) {
        style.height = height + "px";
    }
    if (textSize) {
        style.fontSize = textSize + "px";
    }

    return (
        <button
            {...props}
            type={type}
            className={`inline-flex items-center justify-center py-1 px-1 ${combineClass({
                color,
                fill,
                rounded,
                fontWeight
            })}${
                className ? " " + className : ""
            }`}
            style={style}
        >
            {children}
        </button>
    );
}

export default Button;
