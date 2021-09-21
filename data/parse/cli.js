const { readFileSync, writeFileSync } = require("fs");
const Papa = require("papaparse");

const csvString = readFileSync("./test.csv", "utf8");

const parser = require("./index");

const { mitigationEquipment, mitigation, chemical } = parser(
  Papa.parse(csvString).data
);

writeFileSync(
  "./mitigation_equipments.json",
  JSON.stringify(mitigationEquipment)
);
writeFileSync("./mitigation.json", JSON.stringify(mitigation));
writeFileSync("./chemicals.json", JSON.stringify(chemical));
