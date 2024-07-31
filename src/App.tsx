import React from 'react';
import './assets/common.css';
import CardList from './components/cardlist';


const App: React.FC = () => {


    return (
            <main className={'my-8'}>
                <div className={'w-[1200px] mx-auto'}>
                    {/*S : 배너*/}
                    <div className={'banner'}></div>
                    {/*E : 배너*/}
                    {/*S : 상품안내*/}
                    <div className={'pt-[60px] text-3xl  font-semibold'}>찾으시는 상품이 있나요 ?</div>
                    <div className={'pt-[30px] text-xl accent-gray-600 '}>더존비즈온에서 필요한 보험을 맞춤형으로 가입하세요</div>
                    <CardList />
                    {/*E : 상품안내*/}
                    {/*S : 고객센터*/}
                    <div className={'pt-[100px] text-3xl font-semibold'}>고객센터</div>
                    <div className={'pt-[30px] text-xl accent-gray-600 '}>보험료산출, 보험가입, 보험청구 등 보험관련 문의는 해당 보험사에 직접 문의 바랍니다</div>
                    <div className={'flex justify-between mt-12'}>
                        <div className={'w-[200px]'}>
                            <div className={'text-lg px-2'}>DB 손해보험</div>
                            <div className={'border-b-gray-400 border-b-2 mt-2 mb-4'}></div>
                            <div className={'px-2'}>0000-0000</div>
                        </div>
                        <div className={'w-[200px]'}>
                            <div className={'text-lg px-2'}>KB 손해보험</div>
                            <div className={'border-b-gray-400 border-b-2 mt-2 mb-4'}></div>
                            <div className={'px-2'}>0000-0000</div>
                        </div>
                        <div className={'w-[200px]'}>
                            <div className={'text-lg px-2'}>현대해상</div>
                            <div className={'border-b-gray-400 border-b-2 mt-2 mb-4'}></div>
                            <div className={'px-2'}>0000-0000</div>
                        </div>
                        <div className={'w-[200px]'}>
                            <div className={'text-lg px-2'}>풍수해보험관련</div>
                            <div className={'border-b-gray-400 border-b-2 mt-2 mb-4'}></div>
                            <div className={'px-2'}>0000-0000</div>
                        </div>
                    </div>
                    {/*E : 고객센터*/}
                </div>
            </main>
    );
};


export default App

