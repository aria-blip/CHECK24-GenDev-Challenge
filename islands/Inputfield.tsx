import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";

// this iss an input field in an island because it requires user interaction gets a shared state with ResultPage from index.tsx which means 
// we where to change things here like edit a value it the Inputfield section ill immidiently react , this is good because we can then
// first check if the input is a valid adress then send it ( so changing the value Signal )
interface Props {

  value: Signal<string>;
}

export default  function Inputfield({value}:Props) {
var   pretextvalue = useSignal("none adress")

useEffect(() => {
      
  async function checkValidadress() {
    if(pretextvalue.value=="strase1"){
      value.value = "strase1"
    }
  }
  checkValidadress()
  
}, [pretextvalue.value]); // Re-fetch when `pretextvalue.value` changes


return (
<>

<input type="text"  onInput={(event:InputEvent
        )=> {const target = event.target as HTMLInputElement;
          pretextvalue.value =target.value  } }  id="inputli" class="input-field" placeholder="Enter Adresss" />

</>

)

}
