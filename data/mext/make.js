import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { ZenkakuAlpha } from "https://code4fukui.github.io/mojikiban/ZenkakuAlpha.js";

const url = "./kosen-deps-src.csv";
const csv = await CSV.fetch(url);
const data = [];

for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (c[0] != "区分") {
        continue;
    }
    const years = c;
    const bases = csv[i + 1];
    const units = csv[i + 2];
    i += 3;
    for (;i < csv.length; i++) {
        const c2 = csv[i];
        const dep = c2[0];
        if (dep == "") {
            break;
        }
        for (let j = 1; j < c2.length; j++) {
            const cnt = c2[j];
            if (cnt.length == 0) {
                break;
            }
            const get = (array, n) => {
                for (let i = n; i >= 0; i--) {
                    if (array[i])
                        return array[i];
                }
                throw "error in get!";
            };
            const toHan = (s) => {
                s = s.replace(/元/g, "1");
                return ZenkakuAlpha.toHan(s);
            };
            const get2 = (array, n) => {
                for (let i = n; i >= 1; i--) {
                    if (array[i] && isNaN(toHan(array[i][0]))) {
                        return array[i];
                    }
                }
                return "平成";
                //return bknendo;
                //throw "error in get!";
            };

            const getYearJ = (array, n) => {
                const y = get(array, n);
                const y2 = toHan(y);
                if (!isNaN(parseInt(y2[0]))) {
                    const nen = get2(array, n).substring(0, 2);
                    //console.log(y, y2, nen);
                    return nen + y2;
                }
                return y2;
            };
            const getYear = (array, n) => {
                const nendo = getYearJ(array, n);
                //console.log(nendo)
                const day = new Day(nendo.substring(0, nendo.length - 1) + "1月1日");
                return day.year;
            };
            const year = getYear(years, j);
            const base = get(bases, j);
            const unit = get(units, j);
            const count = cnt == "－" ? 0 : parseInt(cnt);
            const department = dep;
            //console.log(depertment, year, base, unit, count);
            data.push({ department, year, base, unit, count });
        }
    }
}
//csv.map(d => console.log(d));
data.sort((a, b) => a.year - b.year);
await Deno.writeTextFile("kosen-deps.csv", CSV.stringify(data));
const dataei = data.filter(d => d.department == "電子情報工学科" && d.unit == "学科" && d.base == "計");
await Deno.writeTextFile("kosen-ei.csv", CSV.stringify(dataei));
const datasum = data.filter(d => d.department != "計" && d.unit == "学科" && d.base == "計");
await Deno.writeTextFile("kosen-deps-sum.csv", CSV.stringify(datasum));
