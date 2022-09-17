import { CSV } from "https://js.sabae.cc/CSV.js";
import { GeocodingJP } from "https://code4fukui.github.io/GeocodingJP/GeocodingJP.js";
import { writeData } from "https://js.sabae.cc/writeData.js";

const data = CSV.toJSON(await CSV.fetch("../data/kosen_campus.csv"));
for (const d of data) {
  const adr = d.name;
  console.log(adr);
  try {
    const ll = await GeocodingJP.decode(adr);
    d.lat = ll.lat;
    d.lng = ll.lng;
  } catch (e) {
    console.log(adr, e);
  }
}
await writeData("kosen-campus", data);
