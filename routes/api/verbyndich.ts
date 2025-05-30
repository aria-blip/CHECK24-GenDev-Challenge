import { Handlers } from "$fresh/server.ts";
import { decodeHex, encodeHex } from "jsr:@std/encoding/hex";
import { Product } from "../../islands/product.ts";
import { CHAR_0 } from "$std/path/_common/constants.ts";
export const handler: Handlers = {
  async POST(req) {
   

   
    const body = await req.json();
    const { value } = body;
    var [street, houseNumber, city, plz,wired,pagenum] = value;
    
    var productlis:Product[]=[]

    var pagecount=0
    var notlast=true
    //while(notlast){
                
              const response = await fetch("https://verbyndich.gendev7.check24.fun/check24/data?apiKey=1CDDEFDD3F763309CB8EC24E2BA2819EF302A67E827A401CC9D7ADAE4E618834&page="+pagenum.toString(), {
                method: "POST",
                headers: {
          "Content-Type": "text/plain" ,

                },
                body:`${street};${houseNumber};${city};${plz}`,
                  });


            if (!response.ok) {
              const text = await response.text();
              console.error("Error response:", response.status, text);
              return new Response(JSON.stringify(

                {
                  last:false,
                  product: new Product()
                }
              ), {
                status: 500,
                headers: { "Content-Type": "application/json" },
              });
            }
            
                const resultt = await response.json();

          // price
            console.log("resultt:   ",resultt.description)
          const priceStart = resultt.description.indexOf("Für nur ") + "Für nur ".length;
          const priceEnd = resultt.description.indexOf("€ im Monat", priceStart);
          const monthlyPrice =  resultt.description.substring(priceStart, priceEnd).trim() ;


          const speedStart =resultt.description.indexOf("mit einer Geschwindigkeit von ") + "mit einer Geschwindigkeit von ".length;
          const speedEnd = resultt.description.indexOf(" Mbit/s", speedStart);
          const speed = resultt.description.substring(speedStart, speedEnd).trim();

          const durationStart = resultt.description.indexOf("Mindestvertragslaufzeit ") + "Mindestvertragslaufzeit ".length;
          const durationEnd = resultt.description.indexOf(" Monate", durationStart);
          const contractDuration = resultt.description.substring(durationStart, durationEnd).trim();

          const capStart = resultt.description.indexOf("Ab ") + "Ab ".length;
          const capEnd = resultt.description.indexOf("GB pro Monat", capStart);
          const dataCap = resultt.description.substring(capStart, capEnd).trim();
          

          var discount:any
          var seconddiscount:any=null
          if(resultt.description.includes("%")){ // the api can give it in percentage or in euro
          const discountStart = resultt.description.indexOf("einen Rabatt von ") + "einen Rabatt von ".length;
          const discountEnd = resultt.description.indexOf("%", discountStart);
           discount = resultt.description.substring(discountStart, discountEnd).trim();
          }else{
          var seconddiscount:any=null
const discountMatch = resultt.description.match(/Rabatt von\s+(\d+)\s*€/i);
        seconddiscount = discountMatch ? parseInt(discountMatch[1], 10) : null;


          }
 
          const maxDiscountStart = resultt.description.indexOf("Der maximale Rabatt beträgt ") + "Der maximale Rabatt beträgt ".length;
          const maxDiscountEnd = resultt.description.indexOf("€", maxDiscountStart);
          const maxDiscount = resultt.description.substring(maxDiscountStart, maxDiscountEnd).trim();

          const finalPriceStart = resultt.description.lastIndexOf("monatliche Preis ") + "monatliche Preis ".length;
          const finalPriceEnd = resultt.description.indexOf("€", finalPriceStart);
          const finalMonthlyPrice = resultt.description.substring(finalPriceStart, finalPriceEnd).trim();

          const orderMinimumMatch = resultt.description.match(/Mindestbestellwert beträgt\s+(\d+)\s*€/i);
          const orderMinimum = orderMinimumMatch ? parseInt(orderMinimumMatch[1], 10) : null;

          console.log("Mindestbestellwert:", orderMinimum);

          console.log("maxDiscount: ", maxDiscount)
          console.log("finalMonthlyPrice: ", finalMonthlyPrice)

          console.log("_______________________________________")

          var Connectiontype =""
          if(resultt.description.includes("DSL")){
            Connectiontype = "DSL"
          }else if(resultt.description.includes("Fiber")){
              Connectiontype = "Fiber"
          }else if(resultt.description.includes("Cable")){
            Connectiontype = "Cable"
            
          }else{
            Connectiontype = "Unknown"}

  //  }
  
    const tvChannelMatch = resultt.description.match(/enthalten\s+([\w+]+)/);
    const tvChannel = tvChannelMatch ? tvChannelMatch[1] : null;

    const ageLimitMatch = resultt.description.match(/unter\s+(\d+)\s+Jahren/);
    const ageLimit = ageLimitMatch ? parseInt(ageLimitMatch[1], 10) : null;

    var additionalInfolist:string[][] = []

    if( tvChannel!== null){
      additionalInfolist.push(["TV Channel", tvChannel]);
    } 
    if(ageLimit !== null){
      additionalInfolist.push(["Age Limit", ageLimit.toString()]);
    }
    if(dataCap.length <  5 && dataCap !=("Di") ){
      additionalInfolist.push(["Data Cap", dataCap]);
    }
    if(maxDiscount.length < 5){
      additionalInfolist.push(["Max Discount", maxDiscount]);
    }
    if(orderMinimum !== null){
      additionalInfolist.push(["Order Minimum", orderMinimum.toString()+"€"]);
    }

    return new Response(JSON.stringify({
      
    last:resultt.last,
     product : new Product(
                resultt.product,
                resultt.product,
                speed,
                parseInt(monthlyPrice),
                parseInt(finalMonthlyPrice),
              seconddiscount == null ? (parseInt(discount) / 100) * parseInt(monthlyPrice) : seconddiscount/100,
                contractDuration,
                Connectiontype,
                
                additionalInfolist
                
              )}), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", //  CORS policy. gave issuse 11 ist euro 
      },
    });

  
}}


