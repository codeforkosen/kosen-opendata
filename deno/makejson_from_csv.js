import { CSV } from "https://js.sabae.cc/CSV.js";
import { writeData } from "https://js.sabae.cc/writeData.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const list = CSV.toJSON(await CSV.fetch("../data/kosen_campus.csv"));

const sc = ArrayUtil.toUnique(list.map(d => d.scode));
console.log(sc, sc.length); // 58校
const campus = ArrayUtil.toUnique(list.map(d => d.shortname2));
console.log(campus, campus.length); // 64キャンパス
console.log(list.length); // 64データ

await writeData("../data/kosen_campus", list);
