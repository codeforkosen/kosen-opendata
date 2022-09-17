import { CSV } from "https://js.sabae.cc/CSV.js";
import { writeData } from "https://js.sabae.cc/writeData.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const data = CSV.toJSON(await CSV.fetch("./kosen_campus0.csv"));

const scid = CSV.toJSON(await CSV.fetch("./220523-mxt-mxt_chousa01-1000011635_8.csv"));
const list = [];
for (const d of data) {
  const name = d.name.indexOf(" ") >= 0 ? d.name.substring(0, d.name.indexOf(" ")) : d.name;
  const id = scid.find(s => s.学校名 == name)?.学校コード;
  //const d2 = { id };
  //Object.assign(d2, d);
  d.scode = id;
  list.push(d);
}
await writeData("kosen_campus", list);

//const sc = ArrayUtil.toUnique(data.map(d => d.shortname.indexOf("（") >= 0 ? d.shortname.substring(0, d.shortname.indexOf("（")) : d.shortname));
const sc = ArrayUtil.toUnique(list.map(d => d.scode));
console.log(sc, sc.length); // 58校
