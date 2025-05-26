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

  // here i define the signals these will be used to store and update data if there is user interaction
  var hasrun = useSignal(false)
  var filterSignal=useSignal({
    speed: 0,
    wiredOnly: false,
    minMonthlyPrice: 0,
    minDuration: 0
  });

  var sortSignal = useSignal({
    sortBy: "",
    sortDirection: "asc" // or "desc"
  });


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
*/

fetchBytemeOffers(value.value).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost
          listofdata.value = _listofdata
        }
    ),  
  /*
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


fetchServuSpeed(value.value).then((data)=>
{
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          listofdata.value = _listofdata

}  )
*/

    ]); // this is cool because it dosent care if one has an error or not it just runs whatever
    console.log(results)  // for later if results.map ... result.status != "fulfilled" error handling

    }
    hasrun.value = true
  }
    updatelist()
    
  }, [value.value]); // fetch when pretextvalue.value changes

  function createAdditionalElements(additonalist:string[][]):JSX.Element[]{
    var jsxElements: JSX.Element[] = [];
    for (const [key, value] of additonalist) {

        for (const [key, value] of additonalist) {
          jsxElements.push(
        <>
              <div key={key} className="additional-item" style={ { marginRight: '5px' }}>
                  <span  className="additional-label">{key}:</span>
                  <span className="additional-value">{value}</span>
                </div>
        </>

          )
        }}
     return jsxElements
  }

    function createelele(prod:Product,index:number):JSX.Element {

      return<>

   <div key={`${prod.productId}-${index}`}  className="product-card">
        <div className="card-header">
          <div className="provider-name">{prod.providerName}</div>
          <div className="product-id">ID: {prod.productId}</div>
        </div>
        
        <div className="card-content">
          <div className="info-item">
            <span className="info-label">Speed:</span>
            <span className="info-value">{prod.speed}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Monthly:</span>
            <span className="info-value">{prod.monthlyCostInCent}</span>
          </div>
          <div className="info-item">
            <span className="info-label">25th Month:</span>
            <span className="info-value">{prod.monthlyCostInCentFrom25thMonth}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Discount:</span>
            <span className="info-value">{prod.discountInCent}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Duration:</span>
            <span className="info-value">{prod.contractDurationInMonths}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">{prod.connectionType}</span>
          </div>
        </div>
        
        <div className="additional-info">
          
          <div className="additional-item">
          {createAdditionalElements(prod.additionalInfo)}

          </div>
        </div>
      </div>





      </>
    }
    console.log(listofdata.value.length)
    var filteredlist :Product[] = [];
    // filtering logic 
    if(filterSignal.value.wiredOnly){

      filteredlist=  listofdata.value.filter(el => Number(el.speed) > filterSignal.value.speed && el.connectionType == "Fiber" && el.monthlyCostInCent >= filterSignal.value.minMonthlyPrice  && Number(el.contractDurationInMonths) >= filterSignal.value.minDuration );

    }else{
       filteredlist=  listofdata.value.filter(el => Number(el.speed) > filterSignal.value.speed  && el.monthlyCostInCent >= filterSignal.value.minMonthlyPrice  && Number(el.contractDurationInMonths) >= filterSignal.value.minDuration );

    }
    if(sortSignal.value.sortBy != ""){
        filteredlist.sort((a, b) => {
          if (sortSignal.value.sortDirection === "asc") {
            return Number(a[sortSignal.value.sortBy as keyof Product]) - Number(b[sortSignal.value.sortBy as keyof Product]) 
          }else{
            return Number(b[sortSignal.value.sortBy as keyof Product]) - Number(a[sortSignal.value.sortBy as keyof Product]) 

          }
        })

    }


    const listofelements: JSX.Element[] = filteredlist.slice(1).map((prod: Product ,index: number) => {  // for some reason the first element was always null this is temporerel solution
      return createelele(prod,index)})
 
    return(
        <>
    <div class="container-fluid py-4">
        <div class="row g-3 align-items-center bg-white rounded shadow-sm p-4 mb-4">
            <div class="col-lg-3 col-md-6">
                <label class="form-label text-muted fw-semibold small mb-2">
                    <i class="fas fa-tachometer-alt text-primary me-1"></i>
                    Min Speed (Mbps)
                </label>
                <div class="input-group input-group-sm">
                    <span class="input-group-text bg-primary text-white border-0">
                        <i class="fas fa-rocket"></i>
                    </span>
                    <input 
                        type="number" 
                        class="form-control border-0 shadow-sm" 
                        placeholder="Speed"
                        min="0"
                        onInput={(event) => {
                            const target = event.target as HTMLInputElement;
                            filterSignal.value ={
                                ...filterSignal.value,
                                speed: parseInt(target.value) || 0
                            }
                            
                        }}
                    ></input>
                </div>
            </div>

            <div class="col-lg-2 col-md-6">
                <label class="form-label text-muted fw-semibold small mb-2">
                    <i class="fas fa-ethernet text-success me-1"></i>
                    Wired Only
                </label>
                <div class="form-check form-switch d-flex justify-content-center">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        id="wiredSwitch"
                        onInput={(event) => {
                            const target = event.target as HTMLInputElement;
                            filterSignal.value = {
                                ...filterSignal.value,
                                wiredOnly: target.checked
                            }
                        }}
                    ></input>
                    <label class="form-check-label text-muted small ms-2" for="wiredSwitch">
                        Required
                    </label>
                </div>
            </div>

            <div class="col-lg-2 col-md-6">
                <label class="form-label text-muted fw-semibold small mb-2">
                    <i class="fas fa-dollar-sign text-warning me-1"></i>
                    Min Monthly Price
                </label>
                <div class="input-group input-group-sm">
                    <span class="input-group-text bg-warning text-dark border-0">
                        $
                    </span>
                    <input 
                        type="number" 
                        class="form-control border-0 shadow-sm" 
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        onInput={(event) => {
                            const target = event.target as HTMLInputElement;
                            filterSignal.value = {
                                ...filterSignal.value,
                                minMonthlyPrice: parseFloat(target.value) || 0
                            }
                        }}
                    ></input>
                </div>
            </div>

            <div class="col-lg-2 col-md-6">
                <label class="form-label text-muted fw-semibold small mb-2">
                    <i class="fas fa-clock text-info me-1"></i>
                    Min Duration
                </label>
                <input 
                    type="number" 
                    class="form-control form-control-sm border-0 shadow-sm" 
                    placeholder="Months"
                    min="1"
                    onInput={(event) => {
                        const target = event.target as HTMLInputElement;
                        filterSignal.value = {
                            ...filterSignal.value,
                            minDuration: parseInt(target.value) || 0}
                    }}
                ></input>

                
            </div>

          
          {//    the sorting inputs are here  }
}
          <div class="col-lg-2 col-md-6">
                <label class="form-label text-muted fw-semibold small mb-2">
                    <i class="fas fa-sort text-secondary me-1"></i>
                    Sort By
                </label>
                <select 
                    class="form-select form-select-sm bg-secondary text-white border-0 rounded-1"
                    onInput={(event) => {

                        const target = event.target as HTMLSelectElement;
                        sortSignal.value ={ ...sortSignal.value,
                            sortBy: target.value  }
                        ;}}
                >
                    <option value="">Choose...</option>
                    <option value="speed">Speed</option>
                    <option value="monthlyCostInCent">Monthly Price</option>
                    <option value="discountInCent">Discount</option>
                </select>

                                <label class="form-label text-muted fw-semibold small mb-2">
                    <i class="fas fa-arrows-alt-v text-secondary me-1"></i>
                    Order
                </label>
                <div class="bg-secondary rounded-1 p-2 d-flex align-items-center justify-content-between">
                    <span class="small text-white fw-semibold">Asc</span>
                    <div class="form-check form-switch mb-0">
                        <input 
                            class="form-check-input " 
                            type="checkbox" 
                            id="sortDirection"
                            onInput={(event) => {
                            const target = event.target as HTMLInputElement;
                            sortSignal.value = {...sortSignal.value,
                                sortDirection: target.checked ? "desc" : "asc"
                            }}}
                        ></input>
                    </div>
                    <span class="small text-white fw-semibold">Desc</span>
                </div>
            </div>

            <div class="col-lg-2 col-md-6">

            </div>










        </div>
   
</div>
{filterSignal.value.speed } 
{filterSignal.value.wiredOnly ? "Wired Only" : "DSL"}
{filterSignal.value.minMonthlyPrice > 0 ? `Min Monthly Price: $${filterSignal.value.minMonthlyPrice}` : "No Min Monthly Price"}

 <div className="products-container">
    <div className="products-grid">
      {listofelements}
    </div>
    
    
  </div>

     
    </> 
  )    

  }