import { useEffect } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
import {fetchBytemeOffers,fetchWebWunderOffers,fetchPingPerfectOffers,fetchVerbynDichOffers,fetchServuSpeed} from "./apicallmethod.ts" // this is the function that will be used to fetch the data from the api
import { Product } from "./product.ts";
import list from "npm:postcss@8.4.35/lib/list";
import { JSX } from "preact/jsx-runtime";
import {listofdata} from "./state.ts" // this is used to share states across different file
import { VerbyndichResponse } from "./apicallmethod.ts";
// boilerplate

var pagenum:number = 0

function removeDups<T>(array: T[]): T[] {
    return [...new Set(array)];
}
function verbynddichtemplate(data:VerbyndichResponse){
          if(data.lastPage == false){
                      var _listofdata:Product[] = listofdata.value
          _listofdata.push(data.product)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost
          pagenum ++
          listofdata.value = _listofdata
          }
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
 // /*
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
    ),
fetchVerbynDichOffers( [...value.value,pagenum.toString()] ).then((data)=>
        {    
          if(data.lastPage == false){
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(data.product)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost
          pagenum++
          listofdata.value = _listofdata
// i know this is not the WAY but i dont think it mattess on speed the problem is i dont know what the max number i tesed and they seem to be 10-15 so i set it to 20 it dosent matter if it stops at 10 because if it returns false all the others wont be called there is problaly some smarter way of doing it but this is MY way (: 
fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data1 => {
  verbynddichtemplate(data1);
  fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data2 => {
    verbynddichtemplate(data2);
    fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data3 => {
      verbynddichtemplate(data3);
      fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data4 => {
        verbynddichtemplate(data4);
        fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data5 => {
          verbynddichtemplate(data5);
          fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data6 => {
            verbynddichtemplate(data6);
            fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data7 => {
              verbynddichtemplate(data7);
              fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data8 => {
                verbynddichtemplate(data8);
                fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data9 => {
                  verbynddichtemplate(data9);
                  fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data10 => {
                    verbynddichtemplate(data10);
                    fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data11 => {
                      verbynddichtemplate(data11);
                      fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data12 => {
                        verbynddichtemplate(data12);
                        fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data13 => {
                          verbynddichtemplate(data13);
                          fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data14 => {
                            verbynddichtemplate(data14);
                            fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data15 => {
                              verbynddichtemplate(data15);
                              fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data16 => {
                                verbynddichtemplate(data16);
                                fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data17 => {
                                  verbynddichtemplate(data17);
                                  fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data18 => {
                                    verbynddichtemplate(data18);
                                    fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data19 => {
                                      verbynddichtemplate(data19);
                                      fetchVerbynDichOffers([...value.value, pagenum.toString()]).then(data20 => {
                                        verbynddichtemplate(data20);
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
                                                      
          }
        }
    ),
//   */

fetchServuSpeed(value.value).then((data)=>
{
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          listofdata.value = _listofdata

}  )


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