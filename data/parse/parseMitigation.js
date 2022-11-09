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

  // eslint-disable-next-line no-irregular-whitespace
  // Prevents '﻿name' from appearing in mitigation equipment JSON
  // This is because the starting character in the CSV file is this, thus need to remove it first
  // https://apps.timwhitlock.info/unicode/inspect?s=%EF%BB%BF
  // https://en.wikipedia.org/wiki/Zero-width_space
  equipmentNames[0] = equipmentNames[0].replaceAll("\uFEFF", "");

  // Return object
  const rObj = {};

  // Create the return object from the second element, as first element is the inner object key
  // The key for rObj is always col - 1, because col starts from 1 but we want equipmentID to start from 0,
  // which the other data file, mitigations.json expects mitigation_equipment ID's to be 0 indexed.
  for (let col = 1, len = equipmentNames.length - 1; col < len; col++)
    rObj[col - 1] = {
      [equipmentNames[0]]: equipmentNames[col],
      [mitigatingLimitations[0]]: mitigatingLimitations[col],
      [operatingPressures[0]]: operatingPressures[col],
      [workingTemperatures[0]]: workingTemperatures[col],
      [flammables[0]]: flammables[col],
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
 * Process the parsed mitigation CSV array into data file format
 * @param {Array<Array<String>>} csv Call this parse function with the parsed CSV string array, `parse(Papa.parse(csvString).data)`
 * @returns {{ mitigationEquipment, mitigation, chemical }} Data file contents for mitigationEquipment, mitigation, chemical
 */
function parseMitigation(csv) {
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
                    // @todo Need this to be string instead of number to match the key type
                    id: equipmentID,
                    status: getMitigationStatus(mitigationStatus),
                  },
                }
              : acc,
          {}
        );

    // @todo Make sure chemical IDs line up correctly, now it does not
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
}

module.exports.parse = parseMitigation;
