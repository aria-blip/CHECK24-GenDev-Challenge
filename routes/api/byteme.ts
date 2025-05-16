import { Handlers } from "$fresh/server.ts";


export const handler: Handlers = {
  async POST(req) {
    const body = await req.json(); // contains addressess
    const { value } = body;
    const [street, houseNumber, city, plz] = value;

const queryString = new URLSearchParams({
  street,
  houseNumber,
  city,
  plz,
}).toString();


    const response = await fetch("https://byteme.gendev7.check24.fun/app/api/products/data?"+queryString, {
      method: "GET",
      headers: {
        "X-Api-Key": "D09ABA2B0E6C6173E9B75A98F58C9F72",
      }    

    });

    const xml = await response.text();
    console.log("xml");
    console.log("xml")
    return new Response(xml, {
      headers: {
        "Content-Type": "text/csv",  // change to application/csv to text/xml 
        "Access-Control-Allow-Origin": "*", //  CORS policy. gave me isssuses befroe
      },
    });
  },
};