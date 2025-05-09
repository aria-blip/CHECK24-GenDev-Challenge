import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
import {fetchWebWunderOffers} from "./apicallmethod.ts" // this is the function that will be used to fetch the data from the api

interface Props {

    value: Signal<string[]>;
  }

export default  function ResultPage({value}:Props) {
  var   listofdata = useSignal([""])

  useEffect(() => {
      
    async function updatelist() {
     fetchWebWunderOffers(value.value,"54846DFD9C29D20ACBF9975E770155A7CAA52C6BBC2728294FF961C8F1E9A2D633A8B91A0B04517C24CAB87999120A9558CD748335627DD982DA02D97038E0E0" )
    }
    updatelist()
    
  }, [value.value]); // Re-fetch when `pretextvalue.value` changes


    return(
        <>
     <h1>{value.value}</h1>
    </> 
  )    

}