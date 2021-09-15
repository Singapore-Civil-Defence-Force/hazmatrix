const { readFileSync, writeFileSync } = require("fs");

const csvString = readFileSync("./test.csv", "utf8");

const parser = require("./index");

const { mitigation, chemical } = parser(csvString);

writeFileSync("./test.json", JSON.stringify(mitigation));
writeFileSync("./ctest.json", JSON.stringify(chemical));
