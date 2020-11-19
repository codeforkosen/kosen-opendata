const en2ja = {
  "subjects": "科目",
  "credit": "単位",
  "grade1": "1年",
  "grade2": "2年",
  "grade3": "3年",
  "grade4": "4年",
  "grade5": "5年",
  "notes": "備考",
  "elective": "選択",
  "department": "分類",
};
const toJA = (csv) => {
  for (let i = 0; i < csv[0].length; i++) {
    const ja = en2ja[csv[0][i]];
    if (ja) {
      csv[0][i] = ja;
    }
  }
  return csv;
};

export { toJA };
