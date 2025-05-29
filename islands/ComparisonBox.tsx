import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
import { Product } from "./product.ts";
import { JSX } from "preact/jsx-runtime";
import { createAdditionalElements } from "./apicallmethod.tsx";    
// this iss an input field in an island because it requires user interaction gets a shared state with ResultPage from index.tsx which means 
// we where to change things here like edit a value it the Inputfield section ill immidiently react , this is good because we can then
// first check if the input is a valid adress then send it ( so changing the value Signal )


function showDiff(value1:number|string,value2:number|string):JSX.Element{
    if(isNaN(Number(value1)) || isNaN(Number(value2))){
        return<></>
    }

        const diff =Math.round( Number(value1) - Number(value2));
        console.log(diff)
        console.log(value1 + " - "+ value2)

    if (diff < 0) {
    return (
        <>
        <span class="font-weight-light text-danger" > {diff}</span>
        </>
    );
    } else if(diff==0) {
    return <>
         <span class="font-weight-light text-info" > {diff}</span>   
    </>
      }else{
        return(
        <span class="font-weight-light text-success" > {diff}</span>
        )
      }

}




interface Props {

  twoselected: Signal<Product[]>;
}

export default  function ComparisonBox({twoselected}:Props) {

    var visible=useSignal("none")

    useEffect(() => {
        
    async function showBox() {
        if(twoselected.value[0].productId !="-1" && twoselected.value[1].productId!="-1"){
            visible.value="flex"

        }
    }
    showBox()
    
    }, [twoselected.value]); 


    return (
    <>

    <div class="comparison_container" style={{display:visible.value}} >
        {/* close button logic: reseting the twoselected items and changing  visibility */}
        <button class="close-button" onClick={(event)=>{
              twoselected.value=[new Product("-1"),new Product("-1")] 
              visible.value="none"
        }} >×</button>

        <div class="comparison_section">
            <div class="product-card">
                <div class="card-header">
                    <div class="provider-name">{twoselected.value[0].providerName}</div>
                    <div class="product-id">ID {twoselected.value[0].productId}</div>
                </div>
                
                <div class="card-content">
                    <div class="info-item">
                        <span class="info-label">Speed: {showDiff(twoselected.value[0].speed,twoselected.value[1].speed)} </span>
                        <span class="info-value">{twoselected.value[0].speed}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Monthly:  {showDiff(twoselected.value[0].monthlyCostInCent,twoselected.value[1].monthlyCostInCent)} </span>
                        <span class="info-value">{twoselected.value[0].monthlyCostInCent}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">25th Month:  {showDiff(twoselected.value[0].monthlyCostInCentFrom25thMonth,twoselected.value[1].monthlyCostInCentFrom25thMonth)}  </span>
                        <span class="info-value">{twoselected.value[0].monthlyCostInCentFrom25thMonth}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Discount:  {showDiff(twoselected.value[0].discountInCent,twoselected.value[1].discountInCent)} </span>
                        <span class="info-value">{twoselected.value[0].discountInCent}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Duration:  {showDiff(twoselected.value[0].contractDurationInMonths,twoselected.value[1].contractDurationInMonths)} </span>
                        <span class="info-value">{twoselected.value[0].contractDurationInMonths} Month</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Type:</span>
                        <span class="info-value">{twoselected.value[0].connectionType}</span>
                    </div>
                </div>
                
                <div class="additional-info">
                    <div class="additional-item">

                            {createAdditionalElements(twoselected.value[0].additionalInfo)}
                    </div>
                </div>
            </div>
        </div>

        <div class="separator"></div>

        <div class="comparison_section">
            <div class="product-card">
                <div class="card-header">
                    <div class="provider-name">{twoselected.value[1].providerName}</div>
                    <div class="product-id">ID {twoselected.value[1].productId}</div>
                </div>
                
                <div class="card-content">
                    <div class="info-item">
                        <span class="info-label">Speed:  {showDiff(twoselected.value[1].speed,twoselected.value[0].speed)} </span>
                        <span class="info-value">{twoselected.value[1].speed}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Monthly:{showDiff(twoselected.value[1].monthlyCostInCent,twoselected.value[0].monthlyCostInCent)} </span>
                        <span class="info-value">{twoselected.value[1].monthlyCostInCent}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">25th Month:{showDiff(twoselected.value[1].monthlyCostInCentFrom25thMonth,twoselected.value[0].monthlyCostInCentFrom25thMonth)}  </span>
                        <span class="info-value">{twoselected.value[1].monthlyCostInCentFrom25thMonth}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Discount: {showDiff(twoselected.value[1].discountInCent,twoselected.value[0].discountInCent)} </span>
                        <span class="info-value">{twoselected.value[1].discountInCent}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Duration:  {showDiff(twoselected.value[0].contractDurationInMonths,twoselected.value[1].contractDurationInMonths)} </span>
                        <span class="info-value">{twoselected.value[1].contractDurationInMonths} Month</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Type:</span>
                        <span class="info-value">{twoselected.value[1].connectionType}</span>
                    </div>
                </div>
                
                <div class="additional-info">
                    <div class="additional-item">
                            {createAdditionalElements(twoselected.value[1].additionalInfo)}
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>

    )

}
