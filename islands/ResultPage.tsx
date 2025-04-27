import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";

interface Props {

    value: Signal<string>;
  }

export default  function ResultPage({value}:Props) {

    return(
        <>
     <h1>{value}</h1>
    </> 
  )    

}