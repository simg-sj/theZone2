export function Inquiry(){
    return(
        <div className='flex flex-col mt-4 base_font text-[12px] px-4 space-y-4 bg-white'>
            <div className='flex flex-col'>
                <p className='font-bold text-[14px]'>개인(신용)정보의 조회에 관한 사항</p>
                <p>당사는 「개인정보보호법」 및 「신용정보의 이용 및 보호에 관한 법률」에 따라 귀하의 개인(신용)정보를 다음과 같이 조회하고자 합니다.</p>
            </div>
            <div className='flex flex-col'>
                <p className='font-bold text-[14px]'>1. 조회 대상 및 조회 목적</p>
                <p>º 조회 대상 기관 :<br/>
                    신한EZ, 에스아이엠지, 종합신용정보집중기관, 생명ㆍ손해보험협회, 보험요율산출기관, 금융거래기관, 코리안크레딧뷰로, 본인인증기관, 의무보험 관계 법령의 소관부처 및 그 상ㆍ하급
                    정부조직ㆍ공공기관ㆍ자동차 제조회사<br/>
                    º 조회 목적<br/>
                    - 종합신용정보집중기관 : 보험계약 인수여부 결정을 위한 판단, 보험 가입한도 조회, 실제 발생하는 손해를 보상하는 실손형 보험의 중복가입, 새로운 보험계약 체결 시 기존
                    보험계약과의 중요사항 비교 설명<br/>
                    - 생명ㆍ손해보험협회, 의무보험 관계 법령의 소관부처 및 그 상ㆍ하급 정부조직ㆍ공공기관 : 보험가입 의무대상 확인<br/>
                    - 자동차 제조회사 : 차량모델 및 부속장치 확인<br/>
                    - 보험요율산출기관 : 보험계약 인수여부 결정을 위한 판단, 주행거리 확인, 보험요율 산출 정보 확인<br/>
                    - 금융거래기관 : 예금주(카드소유주) 본인확인<br/>
                    - 본인인증기관 : 실명인증, 본인인증<br/>
                    - 코리안크레딧뷰로 : 보험계약 인수여부 결정을 위한 판단</p>
            </div>
            <div className='flex flex-col'>
                <p className='font-bold text-[14px]'>2. 조회할 개인(신용)정보의 내용</p>
                <p>
                    º 고유식별정보 : 주민등록번호, 외국인등록번호, 여권번호, 운전면허번호<br/>
                    º 민감정보 : 피보험자의 질병ㆍ상해에 관한 정보 (진료기록, 상병명, 기왕증 등), 교통사고ㆍ교통법규위반정보(자동차보험에 한함)<br/>
                    - 신용 거래 정보 : 보험계약정보(상품종류, 기간, 보험가입금액 등), 보험금정보(보험금 지급사유, 지급금액, º 개인(신용)정보<br/>
                    - 일반개인정보 : 성명, CI, 국내거소신고번호, 주행거리정보, 의무보험 가입대상 여부ㆍ일련번호, 보험요율 산출 정보, 주행거리정보<br/>
                    - 신용거래정보 : 보험계약정보 (상품종류, 기간, 보험료, 보험가입금액 등)ㆍ보험금정보 (보험금 지급사유, 지급금액 등)<br/>
                    - 신용능력정보 : 소득, 신용등급<br/>
                    - 공공정보 등 : 군운전경력정보*, 자동차등록관련 정보 (자동차보험에 한함)<br/>
                    * 보험요율 산출기관이 행정정보 공동이용센터를 통해 병무청으로부터 제공받는 정보(단, 요율 산출에 필요한 보험계약에 한함)<br/>
                </p>
            </div>
            <div className='flex flex-col'>
                <p className='font-bold text-[14px]'>3. 보유 및 이용 기간</p>
                <p>동의일로부터 보험계약의 청약시까지(최대 3개월)</p>
            </div>

        </div>
    )
}
