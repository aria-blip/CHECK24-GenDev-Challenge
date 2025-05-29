  import { Handlers } from "$fresh/server.ts";
import { getRandomInt } from "../../islands/apicallmethod.tsx";

export const handler: Handlers = {

 async GET(req) {

      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      
      if (!id) {
        return new Response(JSON.stringify({ error: "ID required" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      const kv = await Deno.openKv();
      const result = await kv.get(["shared", id]);
      console.log(result.value)
      return new Response(JSON.stringify({ data: result.value }), {
        headers: { "Content-Type": "application/json" },
      });
    

}
}