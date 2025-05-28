import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Inputfield from "../islands/Inputfield.tsx";
import ResultPage from "../islands/ResultPage.tsx";
import { PageProps } from "$fresh/server.ts";

export default function Home({ url }: PageProps) {
  const theoriginalvalue = useSignal(["","","",""]);
  return (
    <div class="px-4 py-8 mx-auto bg-[#11285c]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/internet.png"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold text-light " >Internet Provider Comparison</h1>
        <p class="my-4 text-light ">
          Enter your Adress below 
          <code class="mx-2 text-light ">↓</code> and <span class="text-warning

">search</span>.
        </p>

        <Inputfield value={theoriginalvalue} />

        
        <ResultPage value={theoriginalvalue} url={url.href} />
      </div>
    </div>
  );
}
