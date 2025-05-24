import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
// this iss an input field in an island because it requires user interaction gets a shared state with ResultPage from index.tsx which means 
// we where to change things here like edit a value it the Inputfield section ill immidiently react , this is good because we can then
// first check if the input is a valid adress then send it ( so changing the value Signal )






interface Props {

  value: Signal<string[]>;
}

export default  function Inputfield({value}:Props) {
var   pretextvalue = useSignal([""])
var wantsfuber = useSignal(false)
useEffect(() => {
      
  async function checkValidadress() {
    if(pretextvalue.value[3].length == 5){
      pretextvalue.value[4] = wantsfuber.value.toString()

      value.value = pretextvalue.value
    }
  }
  checkValidadress()
  
}, [pretextvalue.value]); // Re-fetch when `pretextvalue.value` changes


return (
<>

<input type="text"  onInput={(event:InputEvent
        )=> {const target = event.target as HTMLInputElement;
          const updated = [...pretextvalue.value];
          updated[0] = target.value;
          pretextvalue.value = updated;  } }  id="inputli" class="input-field" placeholder="Enter Street" />
<input type="text"  onInput={(event:InputEvent
        )=> {
          const target = event.target as HTMLInputElement;
          const updated = [...pretextvalue.value];
          updated[1] = target.value;
          pretextvalue.value = updated;

        } }  id="inputli" class="input-field" placeholder="Enter Housenumber" />
<input type="text"  onInput={(event:InputEvent
        )=> {          const target = event.target as HTMLInputElement;
          const updated = [...pretextvalue.value];
          updated[2] = target.value;
          pretextvalue.value = updated;  } }  id="inputli" class="input-field" placeholder="Enter City" />
<input type="text"  onInput={(event:InputEvent
        )=> {          const target = event.target as HTMLInputElement;
          const updated = [...pretextvalue.value];
          updated[3] = target.value;
          pretextvalue.value = updated;  } }  id="inputli" class="input-field" placeholder="Enter Plz" />
<label>
  <input
    type="checkbox"
    id="wantsFiberToggle"
    onChange={
      (event) => {
        wantsfuber.value=wantsfuber.value == false ? true : false
        pretextvalue.value[4] = wantsfuber.value.toString()
      }}
      
  />
  Wants Fiber?
</label>


</>

)

}
