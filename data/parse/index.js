const Papa = require("papaparse");


// Parse the Meta Data into mitigation equipment JSON
function mitigationEquipmentJSON(metaData) {
  // Extract out the rows individually, hardcoding all the rows now as they most probably will not change
  const [
    equipmentNames,
    mitigatingLimitations,
    operatingPressures,
    workingTemperatures,
    flammables,
  ] =
    // Remove the second and third column for every row because they are empty, refer to the excel file where they are just merged
    metaData.map((row) => [row[0], ...row.slice(3)]);

  // Return object
  const rObj = {};
  // Create the return object from the second element, as first element is the inner object key
  for (const [row, equipmentName] of equipmentNames.slice(1).entries())
    rObj[row] = {
      [equipmentNames[0]]: equipmentName,
      [mitigatingLimitations[0]]: mitigatingLimitations[row],
      [operatingPressures[0]]: operatingPressures[row],
      [workingTemperatures[0]]: workingTemperatures[row],
      [flammables[0]]: flammables[row],
    };

  return rObj;
}

/*
  Returns
  1, if Compatible
  0, if Last Resort

  Array<String>, if Conditionally compatible, the string will be processed into an array of String conditions
*/
function getMitigationStatus(mitigationStatus) {
  switch (mitigationStatus) {
    case "Compatible":
      return 1;
    case "Last Resort":
      return 0;

    default:
      if (mitigationStatus.includes("Conditionally"))
        // Trim leading spaces after replacement and split. See output of split to understand
        return mitigationStatus
          .replace(/Conditionally |\[|\]|"|"/gi, "")
          .split(",")
          .map((condition) => condition.trim());

      throw new Error(
        `Invalid mitigation status '${mitigationStatus}' found in CSV`
      );
  }
}

/**
 * Process the parsed CSV array into data file format
 * @param {Array<Array<String>>} csv Call this parse function with the parsed CSV string array, `parse(Papa.parse(csvString).data)`
 * @returns {{ mitigationEquipment, mitigation, chemical }} Data file contents for mitigationEquipment, mitigation, chemical
 */
module.exports = function parse(csv) {
  // The number of rows before the start of the first acid, where the first few rows are used for equipment data
  const numOfRowsBeforeAcid = 5;

  // Parse Meta Data into mitigation equipment JSON
  const mitigationEquipment = mitigationEquipmentJSON(
    csv.slice(0, numOfRowsBeforeAcid)
  );

  const mitigation = {};
  const chemical = {};

  /*
    Chemical ID is based on row number of the CSV (starting from the first chemical)
    Equipment ID is based on the element's index
  */

  for (const [chemicalID, row] of csv.slice(numOfRowsBeforeAcid).entries()) {
    mitigation[chemicalID] =
      // Slice array to keep the mapping between a chemical and the equipments
      row
        .slice(3)
        // Create a mapping object of equipment ID and its mitigation status if any (not null)
        .reduce(
          (acc, mitigationStatus, equipmentID) =>
            mitigationStatus
              ? {
                  ...acc,
                  // Assuming that equipmentID is 0 indexed
                  [equipmentID]: {
                    id: equipmentID,
                    status: getMitigationStatus(mitigationStatus),
                  },
                }
              : acc,
          {}
        );

    // Slice array to keep the Chemical's data
    const [chemicalName, formula, unNumbers] = row.slice(0, 3);
    chemical[chemicalID] = {
      id: chemicalID,
      name: chemicalName,

      // Defaults to undefined so that it will not be stringified, because an empty string will still be stringified
      formula: formula || undefined,

      un: unNumbers
        ? // Only process the string if IT IS NOT ('' / null / undefined)
          unNumbers
            // Remove all spaces so that no spaces will be left when parsing into number
            .replace(" ", "")
            // Allow multiple un numbers separated by commas
            .split(",")
            // Parse all strings into numbers
            .map((unNumberString) => parseInt(unNumberString))
        : // Else use undefined so that it will not be stringified, because an empty string will still be stringified
          undefined,
    };
  }

  return { mitigationEquipment, mitigation, chemical };

  // Basically what is the most compact format i can store my data in, and also how to ensure that the data structure is the most efficient after parsed?
  // maybe instead of  [equipmentID]: mitigationStatus  the value is stored as either 0 (for compatible), 1 (for last resort), String (for conditonally compatible, this one just put the whole string in?)
};
