import Chart from "https://code4sabae.github.io/kafumon/lib/Chart.mjs";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const main = async (parent) => {
  const url = "https://codeforkosen.github.io/kosen-opendata/data/mext/kosen-deps.csv";
  const json = CSV.toJSON(await CSV.fetch(url));
  //console.log(json);

  const year = ArrayUtil.toUnique(json.map(d => d.year)).sort();
  console.log(year);
  const names = ArrayUtil.toUnique(json.map(d => d.department)).filter(d => d != "計");
  console.log(names, names.length);
  const deps = [];

  const unit = "学級";
  const base = "計";
  for (const name of names) {
    const dep = [];
    deps.push(dep);
    for (const y of year) {
      const hit = json.find(d => d.year == y && d.department == name && d.unit == unit && d.base == base);
      dep.push(hit ? hit.count : 0);
    }
  }
  const datasets = deps.map((data, idx) => {
    const borderColor = `hsl(${idx * 10},80%,80%)`;
    const hidden = document.location.hash.indexOf("hidden") >= 0;
    return { type: "line", label: names[idx], data, fill: false, lineTension: 0, yAxisID: "yr", borderColor, hidden };
  });
  const config = {
    data: {
      labels: year,
      datasets,
    },
    options: {
      title: { display: true, text: "高専の学級数変遷" },
      scales: {
        xAxes: [{ scaleLabel: { display: false, labelString: "年度" } }],
        yAxes: [
          { id: "yr", position: "right", scaleLabel: { display: true, labelString: "学級数" }, ticks: { beginAtZero: true } },
        ],
      },
      legend: { display: true }
    }
  };

  parent.style.display = "block";
  parent.style.marginBottom = ".5em";

  const chart = document.createElement("canvas");
  chart.width = 600;
  chart.height = 500;
  new Chart.Chart(chart, config);
  parent.appendChild(chart);

  const atts = {};
  for (const a of parent.attributes) {
    atts[a.nodeName] = a.value;
  }
  if (true) { // atts["view-src"] && atts["view-src"]) {
    const div = document.createElement("div");
    div.style.textAlign = "center";
    div.style.fontSize = "80%";
    div.innerHTML = `データ出典：<a href=https://www.mext.go.jp/a_menu/koutou/ichiran/kousen_r02.html>令和2年度高等専門学校一覧：文部科学省</a> → <a href=https://github.com/codeforkosen/kosen-opendata/tree/main/data/mext>CSV on GitHub</a>)`;
    parent.appendChild(div);
  }
};

class MextKosenDeps extends HTMLElement {
  constructor () {
    super();
    main(this);
  }
}

customElements.define("mext-kosen-deps", MextKosenDeps);
