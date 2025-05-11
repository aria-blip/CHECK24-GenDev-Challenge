import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
import {fetchBytemeOffers,fetchWebWunderOffers} from "./apicallmethod.ts" // this is the function that will be used to fetch the data from the api
import { Product } from "./product.ts";
import list from "npm:postcss@8.4.35/lib/list";
import { JSX } from "preact/jsx-runtime";

interface Props {

    value: Signal<string[]>;
  }

export default  function ResultPage({value}:Props) {
  var   listofdata:Signal<Product[]> = useSignal([])

  useEffect(() => {
      
    async function updatelist() {

    const results = await Promise.allSettled([

     fetchWebWunderOffers(value.value ).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          listofdata.value = _listofdata
        }
    ),
fetchBytemeOffers(value.value)

    ]); // this is cool because it dosent care if one has an error or not it just runs whatever
    console.log(results)  // for later if results.map ... result.status != "fulfilled" error handling

    }
    updatelist()
    
  }, [value.value]); // Re-fetch when `pretextvalue.value` changes

    function createelele(prod:Product):JSX.Element {
      return <>
    <hr></hr>
        <h1>{prod.providerName}</h1>
        <h1>{prod.productId}</h1>
        <h1>{prod.speed}</h1>
        <h1>{prod.monthlyCostInCent}</h1>
        <h1>{prod.monthlyCostInCentFrom25thMonth}</h1>
        <h1>{prod.discountInCent}</h1>
        <h1>{prod.contractDurationInMonths}</h1>
        <h1>{prod.connectionType}</h1>
        <br>  </br>
        <hr></hr>
      </>
    }
    const listofelements: JSX.Element[] = listofdata.value.map((prod: Product) => {
      return createelele(prod)})

    return(
        <>
     <h1>{value.value}

      {listofelements}

     </h1>
    </> 
  )    

}