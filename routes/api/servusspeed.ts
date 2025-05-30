import { Handlers } from "$fresh/server.ts";
import { decodeHex, encodeHex } from "jsr:@std/encoding/hex";
import { Product } from "../../islands/product.ts";
import { fromString, toString } from "jsr:@cross/base64";
export const handler: Handlers = {
  async POST(req) {
   
    var listofproducts:Product[]=[]
   
    const body = await req.json();
    const { value } = body;
    var [street, houseNumber, city, plz,wired,pagenum] = value;

    
       var address= { address :  {
  strasse: street,
  hausnummer: houseNumber,
  postleitzahl: plz,
  stadt: city,
  land: "DE"
        }}
      
      const username = "user_FFF30F1F8D8E";
const password = "8639751FE266";
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
     
      const response = await fetch("https://servus-speed.gendev7.check24.fun/api/external/available-products", {
        method: "POST",
        headers: {
                "Authorization": authHeader,
      "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
          });
    
          const resultt = await response.json().then(async (data) =>  {
                for (const i of data.availableProducts) {
          console.log("i",i)

      const responsee = await fetch("https://servus-speed.gendev7.check24.fun/api/external/product-details/"+i, {
        method: "POST",
        headers: {
                "Authorization": authHeader,
      "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
          });
          
const product = await responsee.json();
const productDetails = product.servusSpeedProduct;
console.log("productDetails",productDetails)
listofproducts.push(
  new Product(
    productDetails.providerName,
    productDetails.providerName,
    productDetails.productInfo.speed.toString(),
    productDetails.pricingDetails.monthlyCostInCent.toString(),
    0,
    productDetails.discount/1000,
    productDetails.productInfo.contractDurationInMonths.toString(),
    productDetails.productInfo.connectionType,
    [
      ["installationService", productDetails.pricingDetails.installationService],
      ["tv", productDetails.productInfo.tv],
      ["limitFrom", productDetails.productInfo.limitFrom],
      ["maxAge", productDetails.productInfo.maxAge],
    ]

  )
);

      }})
    console.log("response",resultt)

    return new Response(JSON.stringify({ list:  listofproducts}), {
      headers: {}})
}

}