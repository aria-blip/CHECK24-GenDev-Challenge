import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json(); // contains addressess
    const { value } = body;
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
        "X-Api-Key": "54846DFD9C29D20ACBF9975E770155A7CAA52C6BBC2728294FF961C8F1E9A2D633A8B91A0B04517C24CAB87999120A9558CD748335627DD982DA02D97038E0E0",
      },
      body: soapBody,
    });

    const xml = await response.text();
    console.log(xml);
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*", //  CORS policy. gave issuse
      },
    });
  },
};