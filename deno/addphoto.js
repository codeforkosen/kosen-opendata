import { CSV } from "https://js.sabae.cc/CSV.js";
import { fix0 } from "https://js.sabae.cc/fix0.js";

const fn = "../data/procon/procon2022.csv";
const data = await CSV.fetchJSON(fn);
for (const d of data) {
  const base = "https://codeforkosen.github.io/kosen-opendata/data/procon/procon2022/procon33-photo/";
  if (d.type == "課題部門") {
    d.photo = base + "t" + fix0(parseInt(d.num), 2) + ".jpg";
  } else if (d.type == "自由部門") {
    d.photo = base + "f" + fix0(parseInt(d.num), 2) + ".jpg";
  }
  try {
    const fn = "../data/procon/procon2022/procon33-photo/" + d.photo.substring(base.length);
    console.log(fn);
    const x = await Deno.readFile(fn);
    console.log(x);
  } catch (e) {
    delete d.photo;
  }
};
console.log(data);
await Deno.writeTextFile(fn, CSV.stringify(data));
