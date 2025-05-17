import { Handlers } from "$fresh/server.ts";
import { decodeHex, encodeHex } from "jsr:@std/encoding/hex";

const signatureSecret = "YOUR_SECRET_KEY_HERE";
const clientId = "YOUR_CLIENT_ID_HERE";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();

    const { street, houseNumber, city, plz } = body;
    const wantsFiber=false // add a button to form ::: later to do
    // onstruct the request body according to the OpenAPI schema
    const requestBody = {
      street,
      houseNumber,
      city,
      plz,
    wantsFiber

    };

    const timestamp = Math.floor(Date.now() / 1000);
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

const signature = await crypto.subtle.sign("HMAC", key,new Uint8Array());

    console.log(encodeHex(signature))








    const response = await fetch("https://pingperfect.gendev7.check24.fun/internet/angebote/data", {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "X-Api-Key": "54846DFD9C29D20ACBF9975E770155A7CAA52C6BBC2728294FF961C8F1E9A2D633A8B91A0B04517C24CAB87999120A9558CD748335627DD982DA02D97038E0E0",
      },
      body: soapBody,
    });


  }

}