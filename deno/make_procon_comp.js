const imgcrop = "https://code4fukui.github.io/imgcrop/imgcrop.js";
const rect1 = "103,106,990,714";
const rect2 = "103,826,990,714";
for (let i = 77; i <= 106; i++) {
  const fn = "../data/procon/procon2023/" + (i < 100 ? "00" + i : "0" + i) + ".jpg";
  const p = Deno.run({ cmd: ["deno", "run", "-A", imgcrop, fn, rect1, rect2]});
  await p.status();
}
for (let i = 77; i <= 106; i++) {
  const base = "https://codeforkosen.github.io/kosen-opendata/data/procon/procon2023/" + (i < 100 ? "00" + i : "0" + i);
  console.log(base + "_1.jpg");
  console.log(base + "_2.jpg");
}
