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

  node .\cli.js all
  node .\cli.js detection
  node .\cli.js mitigation
  
  @todo Maybe the parser should be a top level thing too outside of data
  then it will write data to ../parse/*.json
  
  @todo This should be index.js instead...
*/
{
  // Switch base on the CLI option entered
  switch (process.argv[2]) {
    case "all":
      // Call both as 2 seperate functions one after the other
      return;

    case "detection":
      const { detectionEquipment, detection } =
        require("./parseDetection").parse(getFile("./detection.csv", "utf8"));

      saveToDataFile(detectionEquipment, "detection_equipments");
      saveToDataFile(detection, "detection");

      return;

    case "mitigation":
      const { mitigationEquipment, mitigation, chemical } =
        // @todo THis should not be test.csv...
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
