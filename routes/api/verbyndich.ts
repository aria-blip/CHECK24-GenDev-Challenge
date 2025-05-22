import { Handlers } from "$fresh/server.ts";
import { decodeHex, encodeHex } from "jsr:@std/encoding/hex";
import { Product } from "../../islands/product.ts";
export const handler: Handlers = {
  async POST(req) {
   

   
    const body = await req.json();
    const { value } = body;
    var [street, houseNumber, city, plz,pagenum] = value;
    console.log(street, houseNumber, city, plz)
    
    var productlis:Product[]=[]

    var pagecount=0
    var notlast=true
    while(notlast){
                
              const response = await fetch("https://verbyndich.gendev7.check24.fun/check24/data?apiKey=1CDDEFDD3F763309CB8EC24E2BA2819EF302A67E827A401CC9D7ADAE4E618834&page="+pagecount.toString(), {
                method: "POST",
                headers: {
          "Content-Type": "text/plain" ,

                },
                body:`${street};${houseNumber};${city};${plz}`,
                  });


                const resultt = await response.json();
              var description=resultt.description.split(" ")

          // price
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

          const discountStart = resultt.description.indexOf("einen Rabatt von ") + "einen Rabatt von ".length;
          const discountEnd = resultt.description.indexOf("%", discountStart);
          const discount = resultt.description.substring(discountStart, discountEnd).trim();

          const maxDiscountStart = resultt.description.indexOf("Der maximale Rabatt beträgt ") + "Der maximale Rabatt beträgt ".length;
          const maxDiscountEnd = resultt.description.indexOf("€", maxDiscountStart);
          const maxDiscount = resultt.description.substring(maxDiscountStart, maxDiscountEnd).trim();

          const finalPriceStart = resultt.description.lastIndexOf("monatliche Preis ") + "monatliche Preis ".length;
          const finalPriceEnd = resultt.description.indexOf("€", finalPriceStart);
          const finalMonthlyPrice = resultt.description.substring(finalPriceStart, finalPriceEnd).trim();

              
              if(resultt.valid==true){
     
          productlis.push(new Product(
                resultt.product,
                resultt.product,
                speed,
                parseInt(monthlyPrice),
                parseInt(finalMonthlyPrice),
                parseInt(discount),
                contractDuration,
                "DSL",
                [
                  ["Data Cap", dataCap],
                  ["Max Discount", maxDiscount],
                ]
              ))

              console.log("mon" + monthlyPrice)
              if(resultt.last==true){
                console.log("last")
                notlast=false
              }
              if(pagecount>100){  // to prevent infinite loop
                notlast=false
              }
              pagecount++

}

    }
    return new Response(JSON.stringify(productlis), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", //  CORS policy. gave issuse 11 ist euro 
      },
    });

  
}}


