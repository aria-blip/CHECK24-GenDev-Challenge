import { Product } from "./product.ts";

export async function fetchWebWunderOffers(value: string[]):Promise<Product[]> {
    const res = await fetch("/api/webwunder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value}),
      });
      const xmlText = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
      const productElements = xmlDoc.getElementsByTagName("ns2:products");
      var resultsinproducts:Array<Product> = [];
      for (let i = 0; i < productElements.length; i++) {
        const productElement = productElements[i];
        const get = (tag: string) => productElement.getElementsByTagName(tag)[0]?.textContent ?? "";
    
        resultsinproducts.push({
          productId: get("ns2:productId"),
          providerName: get("ns2:providerName"),
          speed: get("ns2:speed"),
          monthlyCostInCent: Number(get("ns2:monthlyCostInCent")) / 100,
          monthlyCostInCentFrom25thMonth: Number(get("ns2:monthlyCostInCentFrom25thMonth")) / 100,
          discountInCent: Number(get("ns2:discountInCent")) / 100,
          contractDurationInMonths: get("ns2:contractDurationInMonths"),
          connectionType: get("ns2:connectionType"),
        });
      }
      console.log(resultsinproducts)
      console.log("resultsinproducts")

      return resultsinproducts;
    
}

export async function fetchBytemeOffers(value: string[]):Promise<Product[]> {
    const res = await fetch("/api/byteme", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      
      });


      return await []


}