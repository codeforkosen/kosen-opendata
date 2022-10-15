import { CSV } from "https://js.sabae.cc/CSV.js";
import { fix0 } from "https://js.sabae.cc/fix0.js";

const fn = "../data/procon/procon2022.csv";
const data = await CSV.fetchJSON(fn);
data.forEach(d => {
  if (d.type == "課題部門") {
    d.poster = "https://codeforkosen.github.io/kosen-opendata/data/procon/procon2022/procon33-theme/" + fix0(3 + parseInt(d.num), 4) + ".png";
  } else if (d.type == "自由部門") {
    d.poster = "https://codeforkosen.github.io/kosen-opendata/data/procon/procon2022/procon33-free/" + fix0(3 + parseInt(d.num), 4) + ".png";
  }
});
console.log(data);
await Deno.writeTextFile(fn, CSV.stringify(data));
