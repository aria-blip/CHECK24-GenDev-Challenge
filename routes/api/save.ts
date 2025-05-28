import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();
    const { value } = body;
    var [id, products] = value;
    console.log("tessssssssssssssssss",id)
    await Deno.writeTextFile(`./data/${id}.json`, JSON.stringify(products));
    


    return new Response(JSON.stringify(""), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", //  CORS policy. gave issuse
      },
    });
  


  },
};