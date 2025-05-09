import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json(); // contains address and apiKey
    const { value, apiKey } = body;
    const [street, houseNumber, city, plz] = value;

    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:gs="http://webwunder.gendev7.check24.fun/offerservice">
        <soapenv:Header/>
        <soapenv:Body>
          <gs:legacyGetInternetOffers>
            <gs:input>
              <gs:installation>true</gs:installation>
              <gs:connectionEnum>DSL</gs:connectionEnum>
              <gs:address>
                <gs:street>${street}</gs:street>
                <gs:houseNumber>${houseNumber}</gs:houseNumber>
                <gs:city>${city}</gs:city>
                <gs:plz>${plz}</gs:plz>
                <gs:countryCode>DE</gs:countryCode>
              </gs:address>
            </gs:input>
          </gs:legacyGetInternetOffers>
        </soapenv:Body>
      </soapenv:Envelope>`.trim();

    const response = await fetch("https://webwunder.gendev7.check24.fun/endpunkte/soap/ws/getInternetOffers", {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "X-Api-Key": apiKey,
      },
      body: soapBody,
    });

    const xml = await response.text();
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*", // optional for local dev
      },
    });
  },
};