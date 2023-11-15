import { CSV } from "https://js.sabae.cc/CSV.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

const fnbase = "../data/kosen_campus";
const data = await CSV.fetchJSON(fnbase + ".csv");

await Deno.writeTextFile(fnbase + ".json", JSON.stringify(data, null, 2));
await Deno.writeFile(fnbase + ".cbor", CBOR.encode(data));
