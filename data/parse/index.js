const Papa = require("papaparse");

const { readFileSync, writeFileSync } = require("fs");

const csvString = readFileSync("./test.csv", "utf8");

// This will parse out the
// 1. Chemical data (name / un number / chemical formula)
// 2. Mitigation equipments and their corresponding mitigation limits
// 3. Chemical to Mitigation Equipment mapping
const csv = Papa.parse(csvString).data;

// console.log(csv);

const mitigationObj = {};
const chemicalObj = {};

// Chemical ID is based on row number of the CSV (starting from the first chemical)
// Equipment ID is based on the element's index

for (const [chemicalID, row] of csv.entries()) {
  //   console.log(row);

  //   mitigationObj[chemicalID] =
  //     // Slice array to keep the mapping between a chemical and the equipments
  //     row
  //       .slice(3)
  //       // Create a mapping object of equipment ID and its mitigation status if any (not null)
  //       .reduce(
  //         (acc, mitigationStatus, equipmentID) =>
  //           mitigationStatus ? { ...acc, [equipmentID]: mitigationStatus } : acc,
  //         {}
  //       );

  mitigationObj[chemicalID] =
    // Slice array to keep the mapping between a chemical and the equipments
    row
      .slice(3)
      // Create a mapping object of equipment ID and its mitigation status if any (not null)
      .reduce(
        (acc, mitigationStatus, equipmentID) =>
          mitigationStatus
            ? {
                ...acc,
                [equipmentID + 1]: {
                  id: equipmentID + 1,
                  note: mitigationStatus,
                },
              }
            : acc,
        {}
      );

  // @todo MAKE sure the chemical ID's line up correctly, now it does not
  // Slice array to keep the Chemical's data
  const [chemicalName, formula, unNumbers] = row.slice(0, 3);
  chemicalObj[chemicalID] = {
    id: chemicalID,
    name: chemicalName,
    formula: formula,
    // Put undefined so that it will not be stringified, because an empty string will still be stringified
    un: unNumbers || undefined,
  };

  // Basically what is the most compact format i can store my data in, and also how to ensure that the data structure is the most efficient after parsed?
  // maybe instead of  [equipmentID]: mitigationStatus  the value is stored as either 0 (for compatible), 1 (for last resort), String (for conditonally compatible, this one just put the whole string in?)
}

// writeFileSync("./test.json", JSON.stringify(mitigationObj));
