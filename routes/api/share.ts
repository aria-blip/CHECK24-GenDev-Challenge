import { Handlers } from "$fresh/server.ts";
import { getRandomInt } from "../../islands/apicallmethod.tsx";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();
    const products = body; 
    console.log("producs ",products)

    const id:string=getRandomInt(1000,9999).toString()
    console.log(id)
    console.log(id)

    const kv = await Deno.openKv(); // this error can be ignored but when in development make sure to add --unstable on deno task start
    await kv.set(["shared", id],  products    )

    return new Response(JSON.stringify(id), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", //  CORS policy. gave issuse
      },
    });
  


  },
};