import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function Loading() {
    const {isLoading} = useSelector((state : any) => state.loading);
    useEffect(()=>{
        console.log(isLoading)
    },[isLoading]);
    return (
        <div className={''}>
            {
                isLoading === false ?
                    "" :
                    <div className={'flip-to-square absolute z-[100]'}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
            }
        </div>
    );
}