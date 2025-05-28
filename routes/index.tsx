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
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold text-light " >Welcome to Fresh</h1>
        <p class="my-4 text-light ">
          Try updating this message in the {url.href}
          <code class="mx-2 text-light ">./routes/index.tsx</code> file, and refresh.
        </p>

        <Inputfield value={theoriginalvalue} />

        
        <ResultPage value={theoriginalvalue} url={url.href} />
      </div>
    </div>
  );
}
