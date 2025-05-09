export async function fetchWebWunderOffers(value: string[], apiKey: string) {
    const res = await fetch("/api/webwunder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: value, apiKey: "xxx" }),
      });
      const xmlText = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
      const productElements = xmlDoc.getElementsByTagName("ns2:products");
    
      const offers = Array.from(productElements).map((product) => {
        const get = (tag: string) => product.getElementsByTagName(tag)[0]?.textContent ?? "";
    
        return {
          id: get("ns2:productId"),
          name: get("ns2:providerName"),
          speed: get("ns2:speed"),
          price: Number(get("ns2:monthlyCostInCent")) / 100,
          priceAfter24: Number(get("ns2:monthlyCostInCentFrom25thMonth")) / 100,
          discount: Number(get("ns2:discountInCent")) / 100,
          contractMonths: get("ns2:contractDurationInMonths"),
          connectionType: get("ns2:connectionType"),
        };
      });
    
      console.log( offers);
}