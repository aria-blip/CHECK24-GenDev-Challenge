import { useSignal } from "@preact/signals";
import Inputfield from "../islands/Inputfield.tsx";
import ResultPage from "../islands/ResultPage.tsx";
import { PageProps } from "$fresh/server.ts";
import ComparisonBox from "../islands/ComparisonBox.tsx";
import { Product } from "../islands/product.ts";

export default function Home({ url }: PageProps) {
  // here i define the signals that i share between two Islands
  const theoriginalvalue = useSignal(["","","",""]);
  const twoselected=useSignal([new Product("-1"),new Product("-1")]) // this is teh signal for two selected ones that the user can choose and then compare they are both at first -1 so that i can check if the value==-1 and then i know which one to override

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

        <ResultPage value={theoriginalvalue} twoselected={twoselected} url={url.href} />#

        <ComparisonBox twoselected={twoselected}   />ss
      </div>
    </div>
  );
}
