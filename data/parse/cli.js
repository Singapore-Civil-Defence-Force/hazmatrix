const { readFileSync, writeFileSync } = require("fs");

/**
 * Utility function to read the file synchronously and parse it with papaparse
 */
const getFile = (fileName) =>
  require("papaparse").parse(readFileSync(fileName, "utf8")).data;

/**
 * Utility function to stringify the object and save it into the file synchronously.
 * This function will auto add relative path and the JSON file extension.
 */
const saveToDataFile = (data, dataFileName) =>
  writeFileSync(`./${dataFileName}.json`, JSON.stringify(data));

/*
  Expected sample input from CLI:

  node .\cli.js detection
  node .\cli.js mitigation
*/
{
  // Switch base on the CLI option entered
  switch (process.argv[2]) {
    case "detection":
      const { detectionEquipment, detection } =
        require("./parseDetection").parse(getFile("./detection.csv", "utf8"));

      saveToDataFile(detectionEquipment, "detection_equipments");
      saveToDataFile(detection, "detection");

      return;

    case "mitigation":
      const { mitigationEquipment, mitigation, chemical } =
        require("./parseMitigation").parse(getFile("./test.csv", "utf8"));

      saveToDataFile(mitigationEquipment, "mitigation_equipments");
      saveToDataFile(mitigation, "mitigation");
      saveToDataFile(chemical, "chemicals");

      return;

    default:
      console.log("Invalid option selected!");
  }

  console.log("Parsing complete");
}
