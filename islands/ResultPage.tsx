import { useEffect, useRef } from "preact/hooks";
import { useSignal ,Signal} from "@preact/signals";
import {fetchBytemeOffers,fetchWebWunderOffers,fetchPingPerfectOffers,fetchVerbynDichOffers,fetchServuSpeed} from "./apicallmethod.tsx" // this is the function that will be used to fetch the data from the api
import { Product } from "./product.ts";
import list from "npm:postcss@8.4.35/lib/list";
import { jsx, JSX } from "preact/jsx-runtime";
import {listofdata,shownotificatiponbox} from "./state.ts" // this is used to share states across different file
import { VerbyndichResponse } from "./apicallmethod.tsx";
import { stringFromProductArray,productStringFromString ,getRandomInt,removeDups,delay,createAdditionalElements} from "./apicallmethod.tsx";
// boilerplate

var pagenum:number = 0
var filteredlist :Product[] = []; 


// this is the function that will be run for each new reqquest for the verbyncdich api after one request in the .then thil will be run it gets the lasts request data witht the verbyndresonse this also icludes if  this is teh last request if it it is it stops this function is inside the  useeffect in the allsettled 
function verbynddichtemplate(data:VerbyndichResponse){
          console.log("idnv "+ data.lastPage)

        if(data.lastPage == false){
                      var _listofdata:Product[] = listofdata.value
          
          _listofdata.push(data.product)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          pagenum ++
          listofdata.value = _listofdata
          filteredlist=_listofdata // if the user would click the share button without fileting before then filteredlist would be [] to avod this we have to fill it also 

         }
}
// function for the share buttton that will be displayed once 5 elements are in fitlered lsit
async function shareButtonClicked(url:string){
  
    const urlroot = new URL(url).origin;

    const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredlist),

      });
  
    var link_id =await res.json()
    shownotificatiponbox.value=true
    await navigator.clipboard.writeText(urlroot+"?id="+link_id);

    await delay(2000);
    shownotificatiponbox.value=false

}









// these are the values passed from index.tsx that are also shared to other islands to make sharing data apossible
interface Props {

    value: Signal<string[]>;
    url:string
    twoselected:Signal<Product[]>   // we get this from index this same instance will also be shared to comparisonbox so if we change it here (a user chosses two boxes) it will get notified on comparisonBox.tsx
    
  }

export default  function ResultPage({value,url,twoselected}:Props) {

const sharebuttonelement=<> <> <button class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; background-color: #003366; border-color: #003366;" onClick={async(event)=>{await shareButtonClicked(url)}}>
                            <img src="/linkshareicon.png"></img>
</button></>   </>
  // here i define the signals these will be used to store and update data if there is user interaction

  var showsharebutton = useSignal( <></> ) // at first the button is invisivle then when the user clicks on search the button will become visible TODO:check if atleast one of the api has returned then activate teh share button
  var hasrun=useSignal( false) // used to skip the first automaticly run useEffect when value.value gets inizilized



  // this is the trigger to show the share button i chose to not wait untill all the api finish because that could take a long time ,this way the user can share it anytimee 
  if(listofdata.value.length>=5){
    showsharebutton.value=sharebuttonelement
  }

  // this will run once the webpage is started and only run once it checks wether the link has an id parameter if it does it gets the shared products and displays it 
  useEffect(()=>{
      async function main() {

  if(new URL(url).searchParams.get("id")){
        const res = await fetch("/api/getShareData?id="+new URL(url).searchParams.get("id"), {
            method: "GET",
            headers: { "Content-Type": "application/json" },

          });  
          var result=await res.json()
          listofdata.value=await result.data
          filteredlist=await result.data
  }
      }
      main()
  },[])


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
    // resetting the list this will be refreshed whenever the user clickes on the search button in Inputfield.tsx
    listofdata.value = []
     pagenum = 0
    async function updatelist() {

    // when value.balue inizilizes it will run even if tehere was no valid "value change" this skips teh first itteration
    if (!hasrun.value) {
      hasrun.value = true;
      return;
    }

  //  if(hasrun.value == true){
    const results = await Promise.allSettled([

fetchVerbynDichOffers( [...value.value,pagenum.toString()] ).then((data)=>
        {    
         
          console.log("data.lastPage",data.lastPage)
          data.lastPage=false
          data.lastPage = false 
          if(data.lastPage == false ){
            console.log("hihihi")
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(data.product)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost
          pagenum++
          listofdata.value = _listofdata
          filteredlist=_listofdata // if the user would click the share button without fileting before then filteredlist would be [] to avod this we have to fill it also 

          console.log("listofdata.value",listofdata.value)
          
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
});  } }
    ),
fetchWebWunderOffers(value.value ).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          listofdata.value = _listofdata
          filteredlist=_listofdata // if the user would click the share button without fileting before then filteredlist would be [] to avod this we have to fill it also 

        }
    ),
fetchBytemeOffers(value.value).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost
          listofdata.value = _listofdata
            filteredlist=_listofdata // if the user would click the share button without fileting before then filteredlist would be [] to avod this we have to fill it also 

        }
    ),  
fetchPingPerfectOffers(value.value).then((data)=>
        {    
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost

          listofdata.value = _listofdata
          filteredlist=_listofdata // if the user would click the share button without fileting before then filteredlist would be [] to avod this we have to fill it also 

        }
    ),
fetchServuSpeed(value.value).then((data)=>
{
          var _listofdata:Product[] = listofdata.value
          _listofdata.push(...data)
          _listofdata = removeDups<Product>(_listofdata)
          _listofdata = _listofdata.filter((prod) => prod.productId != ""); // remove products with 0 cost
          
          _listofdata.forEach((product) => {
            product.monthlyCostInCent =Math.round( product.monthlyCostInCent/100);
            product.monthlyCostInCentFrom25thMonth=product.monthlyCostInCent
          });

          listofdata.value = _listofdata
          filteredlist=_listofdata // if the user would click the share button without fileting before then filteredlist would be [] to avod this we have to fill it also 

}  )


    ])
    
     // this is cool because it dosent care if one has an error or not it just runs whatever
    console.log(results)  // for later if results.map ... result.status != "fulfilled" error handling
   // }
  }
    updatelist()
    


  }, [value.value]); // fetch when pretextvalue.value changes also when we get a valid adress this will be run i need useEffect because it us


  // this is the layout for ta single product this will be added to thelistofelemts below 
    function createelele(prod:Product,index:number):JSX.Element {

    return<>

        <div key={`${prod.productId}-${index}`}  onClick={(event)=>{

        if(twoselected.value[0].productId=="-1"){
          twoselected.value=[filteredlist[index+1],new Product("-1")]
          event.currentTarget.style.backgroundColor = 'lightblue'; 
          console.log("sett")
        }else{
          console.log("second set")
              event.currentTarget.style.backgroundColor = 'lightblue'; 

          twoselected.value=[twoselected.value[0],filteredlist[index+1]]
        }
        const el = event.currentTarget;

        requestAnimationFrame(() => {
          setTimeout(() => {
            el.style.backgroundColor = 'white';
          }, 2000);
        });
        }} className="product-card">
              <div className="card-header">
                <div className="provider-name">{prod.providerName}</div>
                <div className="product-id">ID:{index} {prod.productId}</div>
              </div>
              
              <div className="card-content">
                <div className="info-item">
                  <span className="info-label">Speed:</span>
                  <span className="info-value">{prod.speed} Mbps</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Monthly:</span>
                  <span className="info-value">{prod.monthlyCostInCent} €</span>
                </div>
                <div className="info-item">
                  <span className="info-label">25th Month:</span>
                  <span className="info-value">{prod.monthlyCostInCentFrom25thMonth} €</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Discount:</span>
                  <span className="info-value">{prod.discountInCent} €</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{prod.contractDurationInMonths} mo</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Type:</span>
                  <span className="info-value">{prod.connectionType}</span>
                </div>
              </div>
              
<div className="additional-info">
  <div className="additional-grid">
    {createAdditionalElements(prod.additionalInfo)}
  </div>
</div>
            </div>




            </>
    }
    console.log(listofdata.value.length)
    var listofwiredstrings=["Fiber","FIBER","Cable","CABLE"]
    // filtering logic 
    
    if(filterSignal.value.wiredOnly){

      filteredlist=  listofdata.value.filter(el => Number(el.speed) > filterSignal.value.speed && listofwiredstrings.includes(el.connectionType)   && el.monthlyCostInCent >= filterSignal.value.minMonthlyPrice  && Number(el.contractDurationInMonths) >= filterSignal.value.minDuration );

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
    // listofelemetns is a list is the frontend implementation ofour filteredlist it created divs this will be returned in the return at the end to the index.tsx
    const listofelements: JSX.Element[] = filteredlist.slice(1).map((prod: Product ,index: number) => {  // for some reason the first element was always null this is temporerel solution
      return createelele(prod,index)})
 


      // this is the returning page 
    return(
        <>
        {/* this is the filtering and soring section it looks messy it would have been smarter adding a island just for this TODO for later */}
    <div class="container-fluid py-4">
        <div class="row g-3 align-items-center bg-white rounded shadow-sm p-1 mb-3">
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
                        €
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

            <div class="col-lg-1 col-md-6">
                {showsharebutton.value}

            </div>









        </div>
   
</div>
{filterSignal.value.speed } 
{filterSignal.value.wiredOnly ? "Wired Only" : "DSL"}
{filterSignal.value.minMonthlyPrice > 0 ? `Min Monthly Price: $${filterSignal.value.minMonthlyPrice}` : "No Min Monthly Price"}

 <div className="products-container">
    <div className="products-grid">
      {/* all the items are here  */}
      {listofelements}
    </div>
    
    
  </div>

     { shownotificatiponbox.value? <>
        <div className="fixed inset-0 flex items-start justify-center pointer-events-none">
          <div className="bg-blue-500 text-white px-6 py-4 rounded shadow-lg">
            Link copied!
          </div>
        </div></>:<></>
}



    </> 
  )    

  }