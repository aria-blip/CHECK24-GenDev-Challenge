import { Product } from "./product.ts";

export async function fetchWebWunderOffers(value: string[]):Promise<Product[]> {
    const res = await fetch("/api/webwunder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value}),
      });
      const xmlText = await res.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
      const productElements = xmlDoc.getElementsByTagName("ns2:products");
      var resultsinproducts:Array<Product> = [];
      for (let i = 0; i < productElements.length; i++) {
        const productElement = productElements[i];
        const get = (tag: string) => productElement.getElementsByTagName(tag)[0]?.textContent ?? "";
    
        resultsinproducts.push({
          productId: get("ns2:productId"),
          providerName: get("ns2:providerName"),
          speed: get("ns2:speed"),
          monthlyCostInCent: Number(get("ns2:monthlyCostInCent")) / 100,
          monthlyCostInCentFrom25thMonth: Number(get("ns2:monthlyCostInCentFrom25thMonth")) / 100,
          discountInCent: Number(get("ns2:discountInCent")) / 100,
          contractDurationInMonths: get("ns2:contractDurationInMonths"),
          connectionType: get("ns2:connectionType"),
          additionalInfo:[]
        });
      }
      console.log(resultsinproducts)
      console.log("resultsinproducts")

      return resultsinproducts;
    
}

// THIS METHOD WAS WRITTEN BY AI , I DID NOT WRITE THIS . --- for me try to learn "/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g" after deathline
function parseCsvToProducts(csv: string): Product[] {
  const lines = csv.trim().split("\n");
  const seenProductIds = new Set<string>();
  const products: Product[] = [];

  for (const line of lines) {
    const values = Array.from(
      line.matchAll(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
    ).map((match) => match[0].replace(/^"|"$/g, ""));

    const [
      productId,
      providerName,
      speed,
      monthlyCostInCent,
      afterTwoYearsMonthlyCost,
      durationInMonths,
      connectionType,
      installationService,
      tv,
      limitFrom,
      maxAge,
      voucherType,
      voucherValue,
    ] = values;

    // Skip duplicates
    if (seenProductIds.has(productId)) continue;
    seenProductIds.add(productId);
    console.log("productId", line, productId, providerName, speed, monthlyCostInCent, afterTwoYearsMonthlyCost, durationInMonths, connectionType, installationService, tv, limitFrom, maxAge, voucherType, voucherValue)
    products.push({
      productId,
      providerName,
      speed,
      monthlyCostInCent: Number(monthlyCostInCent) / 100,
      monthlyCostInCentFrom25thMonth: Number(afterTwoYearsMonthlyCost) / 100,
      discountInCent: Number(line.slice(-5)) / 100,
      contractDurationInMonths: (durationInMonths),
      connectionType,
      additionalInfo: [
        ["installationService", installationService],
        ["tv", tv],
        ["limitFrom", limitFrom],
        ["maxAge", maxAge],
        ["voucherType", voucherType],
      ]
    });
  }
  products.filter((prod) => prod.providerName); // pls work i knownt know why therere is a undefined in my fnal list ):
  return products;

}


export async function fetchBytemeOffers(value: string[]):Promise<Product[]> {  // i had to make this a POST method so that i can use body to send date
    const res = await fetch("/api/byteme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value}),

      });

      const xmlText = await res.text();
      var products:Product[] = parseCsvToProducts(xmlText)
      console.log(products)   // to do list for tommorow : filter out duplicates ? => maybe use the id or safe all the ids in a list and check if the id is not on the list => change it in parseCsvToProducts()
      return await products


}


export async function fetchPingPerfectOffers(value: string[]):Promise<Product[]> {  // i had to make this a POST method so that i can use body to send date
    
  const res = await fetch("/api/pingperfect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value}),

      });

      const jsonobj = await res.json();
      var products:Product[] = []
      for(var i of jsonobj){
        products.push(
          new Product( 
            i.providerName,
            i.providerName,
            i.productInfo.speed.toString(),
            i.pricingDetails.monthlyCostInCent,
            i.pricingDetails.monthlyCostInCent,
            0,
            i.productInfo.contractDurationInMonths.toString(),
            i.productInfo.connectionType,
            [
              ["installationService", i.pricingDetails.installationService],
              ["tv", i.productInfo.tv],
              ["limitFrom", i.productInfo.limitFrom],
              ["maxAge", i.productInfo.maxAge],	
            ]
          )
        )
      }      
      

      return await products;

}
export interface VerbyndichResponse {
  product:Product
  lastPage:boolean
}
export async function fetchVerbynDichOffers(value: string[]):Promise<VerbyndichResponse> { 
  
    const res = await fetch("/api/verbyndich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value}),

      });
  
    console.log(res)
    var result =await res.json()

    return {
      product:result.product ,
      lastPage:result.last
    }; // this is a test to see if the data is coming in correctly it we are also passng is lastPage to the client so that it knows if it should stop or send another request 
}


export async function fetchServuSpeed(value: string[]):Promise<Product[]> {



    const res = await fetch("/api/servusspeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value}),

      });
  
    var result =await res.json()
    console.log("resul is" +result.list)
    return result.list

}






// here are the compresson and decompresson method used in Resultpoage to stringify the product list for shorter url

// returns a stringed[][] from products this will be passed to the LZstring
export function stringFromProductArray(products:Product[]):string[][]{
  let listofdata_stringlist:string[][]=[]
    for (let i of products) {
      if(i.monthlyCostInCentFrom25thMonth==null){
        i.monthlyCostInCentFrom25thMonth=0
      }
      listofdata_stringlist.push([
        i.productId,
        i.providerName,
        i.speed,
        i.monthlyCostInCent.toString(),
        i.monthlyCostInCentFrom25thMonth.toString(),
        i.discountInCent.toString(),
        i.contractDurationInMonths,
        i.connectionType,
        JSON.stringify(i.additionalInfo)
      ])
    }
    return listofdata_stringlist;
}

export function productStringFromString(stringlist:string[][]):Product[]{
    const products: Product[] = [];
  for (let row of stringlist) {
    const product = new Product(
      row[0], 
      row[1], 
      row[2], 
      parseInt(row[3]),
      parseInt(row[4]),
      parseInt(row[5]),
      row[6],
      row[7],
      JSON.parse(row[8]) 
    );
    products.push(product);
  }
  return products;
}


export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function removeDups<T>(array: T[]): T[] {
    return [...new Set(array)];
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
