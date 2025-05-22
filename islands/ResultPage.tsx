import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
import {fetchBytemeOffers,fetchWebWunderOffers,fetchPingPerfectOffers,fetchVerbynDichOffers} from "./apicallmethod.ts" // this is the function that will be used to fetch the data from the api
import { Product } from "./product.ts";
import list from "npm:postcss@8.4.35/lib/list";
import { JSX } from "preact/jsx-runtime";
import {listofdata} from "./state.ts" // this is used to share states across different files
// boilerplate
function removeDups<T>(array: T[]): T[] {
    return [...new Set(array)];
}

interface Props {

    value: Signal<string[]>;
  }

export default  function ResultPage({value}:Props) {
  var hasrun = useSignal(false)

  useEffect(() => {
    var pingperfectextra=[...value.value,false]
    async function updatelist() {
    if(hasrun.value == true){
    const results = await Promise.allSettled([
/*
     fetchWebWunderOffers(value.value ).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          listofdata.value = _listofdata
        }
    ),
fetchBytemeOffers(value.value).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost
          listofdata.value = _listofdata
        }
    ),  

fetchPingPerfectOffers(value.value).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          listofdata.value = _listofdata
        }
    )*/
fetchVerbynDichOffers(value.value).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          listofdata.value = _listofdata
        }
    )


    ]); // this is cool because it dosent care if one has an error or not it just runs whatever
    console.log(results)  // for later if results.map ... result.status != "fulfilled" error handling

    }
    hasrun.value = true
  }
    updatelist()
    
  }, [value.value]); // fetch when pretextvalue.value changes

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
    console.log(listofdata.value.length)
    const listofelements: JSX.Element[] = listofdata.value.slice(1).map((prod: Product) => {  // for some reason the first element was always null this is temporerel solution
      return createelele(prod)})

    return(
        <>
     <h1>{value.value}

      {listofelements}

     </h1>
    </> 
  )    

}