const { readFileSync, writeFileSync } = require("fs");

/**
 * Utility function to read the file synchronously and parse it with papaparse
 */
const getFile = (fileName) =>
  require("papaparse").parse(readFileSync(fileName, "utf8")).data;

/**
 * Utility function to stringify the object and save it into the file synchronously.
 * This function will auto add relative path and the JSON file extension to save in /data/*.
 */
const saveToDataFile = (data, dataFileName) =>
  writeFileSync(`../data/${dataFileName}.json`, JSON.stringify(data));

/*
  Expected sample input from CLI:

  @todo let user specify where to find raw data
  By default expects a folder /raw/** with all the csv data at repo root

  node .\cli.js all
  node .\cli.js detection
  node .\cli.js mitigation
*/
{
  // Switch base on the CLI option entered
  switch (process.argv[2]) {
    case "all":
      console.log("Parsing all datasets");
      // Call both as 2 seperate functions one after the other
      return;

    case "detection":
      const detectionFileName = process.argv[3]
        ? process.argv[3]
        : "../raw/detection.csv";

      console.log(`Parsing 'detection' dataset from '${detectionFileName}'`);

      const { detectionEquipment, detection } =
        require("./parseDetection").parse(getFile(detectionFileName, "utf8"));

      saveToDataFile(detectionEquipment, "detection_equipments");
      saveToDataFile(detection, "detection");

      return;

    case "mitigation":
      const mitigationFileName = process.argv[3]
        ? process.argv[3]
        : "../raw/mitigation.csv";

      console.log(`Parsing 'mitigation' dataset from '${mitigationFileName}'`);

      const { mitigationEquipment, mitigation, chemical } =
        require("./parseMitigation").parse(getFile(mitigationFileName, "utf8"));

      saveToDataFile(mitigationEquipment, "mitigation_equipments");
      saveToDataFile(mitigation, "mitigation");
      saveToDataFile(chemical, "chemicals");

      return;

    default:
      console.log("Invalid option selected!");
  }

  console.log("Parsing complete");
}
