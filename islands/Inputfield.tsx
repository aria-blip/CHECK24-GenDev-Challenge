import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
// this iss an input field in an island because it requires user interaction gets a shared state with ResultPage from index.tsx which means 
// we where to change things here like edit a value it the Inputfield section ill immidiently react , this is good because we can then
// first check if the input is a valid adress then send it ( so changing the value Signal )






interface Props {

  value: Signal<string[]>;
}

export default  function Inputfield({value}:Props) {
var   pretextvalue = useSignal(["","","",""])
var wantsfuber = useSignal(false)
var clicked = useSignal(false)
if( localStorage.getItem("adress")==null){
console.log("first time ")

}else{
  pretextvalue.value=JSON.parse(localStorage.getItem("adress")!)
}

useEffect(() => {
      
  async function checkValidadress() {
    console.log(pretextvalue.value.length)
    if(pretextvalue.value[0] != "" && pretextvalue.value[1] != "" && pretextvalue.value[2] != "" && pretextvalue.value[3] != ""){
  
    if(pretextvalue.value[3].length == 5 && pretextvalue.value[1].length <= 3){
      pretextvalue.value[4] = wantsfuber.value.toString()
      console.log("pretextvalue.value", pretextvalue.value)
      value.value = pretextvalue.value
    }else{
      alert("Please enter a valid address with a 5-digit postal code and a house number of up to 3 digits.");
    } 
   }
  }
  checkValidadress()
  
}, [clicked.value]); // Re-fetch when `pretextvalue.value` changes


return (
<>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="input-group shadow-sm" style="border-radius: 0.5rem; overflow: hidden;">
                    <input type="text" value={pretextvalue.value[0]}  onInput={(event:InputEvent) => {
                        const target = event.target as HTMLInputElement;
                        const cleanedValues = target.value.replace(/[^a-zA-ZäöüÄÖÜß\s]/g, '');
                        const updated = [...pretextvalue.value];
                        updated[0] = cleanedValues;
                        pretextvalue.value = updated; 
                        target.value = cleanedValues;
                        localStorage.setItem("adress",JSON.stringify(pretextvalue.value));

                    }} id="inputli" class="form-control border-end-0" placeholder="Berliner str" style="border-radius: 0.5rem 0 0 0.5rem; border-right: none; box-shadow: none;" />
                    
                    <input type="text" value={pretextvalue.value[1]} onInput={(event:InputEvent) => {
                        const target = event.target as HTMLInputElement;
                        const cleanedValues = target.value.replace(/[^0-9]/g, '');
                        const updated = [...pretextvalue.value];
                        updated[1] = cleanedValues;
                        pretextvalue.value = updated;
                        target.value = cleanedValues;
                        localStorage.setItem("adress",JSON.stringify(pretextvalue.value));

                    }} id="inputli"  class="form-control border-start-0 border-end-0" placeholder="123" style="border-left: none; border-right: none; box-shadow: none;" />
                    
                    <input type="text" value={pretextvalue.value[2]} onInput={(event:InputEvent) => {         
                        const target = event.target as HTMLInputElement;
                        const cleanedValues = target.value.replace(/[^a-zA-ZäöüÄÖÜß\s]/g, '');
                        const updated = [...pretextvalue.value];
                        updated[2] = cleanedValues;
                        pretextvalue.value = updated; 
                        target.value = cleanedValues;
                        localStorage.setItem("adress",JSON.stringify(pretextvalue.value));

                    }} id="inputli" class="form-control border-start-0 border-end-0" placeholder="Berlin" style="border-left: none; border-right: none; box-shadow: none;" />
                    
                    <input type="text"  value={pretextvalue.value[3]}  onInput={(event:InputEvent) => {            
                        const target = event.target as HTMLInputElement;
                        const cleanedValues = target.value.replace(/[^0-9]/g, '');
                        const updated = [...pretextvalue.value];
                        updated[3] = cleanedValues;
                        pretextvalue.value = updated; 
                        target.value = cleanedValues;
                        localStorage.setItem("adress",JSON.stringify(pretextvalue.value));

                    }} id="inputli" class="form-control border-start-0" placeholder="51103" style=" border-left: none;border-right:none; box-shadow: none;" />
                                   
                                   
                       <button class="btn btn-primary bg-secondary border-start-0" type="button"  onClick={(event) => {         
                        const target = event.target as HTMLInputElement;
                        clicked.value=clicked.value == false ? true : false
                        console.log("clicked", clicked.value)
                    }}  style="border-left: none; border-radius: 0;">Search</button>

                </div>
            </div>
        </div>
    </div>
    


                    

  
  {/* <input
    type="checkbox"
    id="wantsFiberToggle"
    onChange={
      (event) => {
        wantsfuber.value=wantsfuber.value == false ? true : false
        pretextvalue.value[4] = wantsfuber.value.toString()
      }}
      
  /> */}
  Wants Fiber?


</>

)

}
