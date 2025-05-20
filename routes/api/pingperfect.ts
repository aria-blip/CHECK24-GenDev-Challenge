import { Handlers } from "$fresh/server.ts";
import { decodeHex, encodeHex } from "jsr:@std/encoding/hex";


export const handler: Handlers = {
  async POST(req) {
   

   
    const body = await req.json();
    const { value } = body;
    var [street, houseNumber, city, plz,wantsfiber] = value;
    console.log(wantsfiber)
    console.log(street, houseNumber, city, plz);
    const wantsFiber= wantsfiber == "true" ? true : false; // convert to boolean
   
    console.log(wantsFiber)
    // add a button to form ::: later to do
    // onstruct the request body according to the OpenAPI schema
    const requestBody = {
      street,
      houseNumber,
      city,
      plz,
    wantsFiber

    };

   
    street="friedrichstraße"
    houseNumber="114"
    city="köln"
    plz="51145"
    

    const timestamp = Math.floor(Date.now() /1000);
    var stringrequestBody = JSON.stringify(requestBody);

    var finalstring=timestamp+":"+stringrequestBody  // does the reienfolge even matter? 



    // denos own implementation (:  
    const secret = "DBC3D3F076618DD28FDD46C310A85025";
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
    "raw", // The format of the key
    keyData, // The key data
    { // Algorithm details
        name: "HMAC",
        hash: { name: "SHA-256" },
    },
    false, // Whether the key is extractable
    ["sign", "verify"], // Key usages: Sign and Verify
    );

const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(finalstring));

    console.log(encodeHex(signature))
    console.log(finalstring)
    console.log(timestamp)
    







    const response = await fetch("https://pingperfect.gendev7.check24.fun/internet/angebote/data", {
      method: "POST",
      headers: {
"Content-Type": "application/json",
        "X-Signature": encodeHex(signature),
        "X-Timestamp":timestamp.toString(),
        "X-Client-Id":"5F0EB19A"
      },
      body:JSON.stringify(requestBody)
        });

      const resultt = await response.json();

    return new Response(JSON.stringify(resultt), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", //  CORS policy. gave issuse
      },
    });
  }

}