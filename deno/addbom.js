const addBOM = async (fn) => {
  const data = await Deno.readTextFile(fn);
  const data2 = CSV.addBOM(CSV.removeBOM(data));
  await Deno.writeTextFile(fn, data2);
};

await addBOM("../data/procon/procon2022.csv");
await addBOM("../data/procon/procon2022_hacku.csv");

