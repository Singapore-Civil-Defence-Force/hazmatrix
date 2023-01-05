/**
 * @module AllEquipments
 *
 * This module exports a single Equipment array that combines both mitigation
 * and detection equipment objects into a single array for SearchEquipment to work
 * across both equipment types.
 */

import _all_mitigation_equipments from "../../data/mitigation_equipments.json";
import _all_detection_equipments from "../../data/detection_equipments.json";

type MitigationEquipment = {
  type?: "m";

  id: string;
  name: string;
  "Mitigating limitation": string;
  "Operating pressure": string;
  "Working Temperature": string;
  "Can be used in flammable environment?": string;
};

type DetectionEquipment = {
  type?: "d";

  id: string;
  name: string;
  "operating temperature": string;
  "flammable environment": string;
  keys: Array<string>;
};

type Equipment = MitigationEquipment | DetectionEquipment;

const equipment: Array<Equipment> = [];

const all_mitigation_equipments: Array<MitigationEquipment> = Object.values(
  _all_mitigation_equipments
);

const all_detection_equipments: Array<DetectionEquipment> = Object.values(
  _all_detection_equipments
);

for (const e of all_mitigation_equipments) {
  e.type = "m";
  equipment.push(e);
}

for (const e of all_detection_equipments) {
  e.type = "d";
  equipment.push(e);
}

// Functional way to do it but less efficient
// equipment
//   .concat(
//     <Array<MitigationEquipment>>(
//       Object.values(_all_mitigation_equipments).map(
//         (e: any) => ((e.type = "m"), e)
//       )
//     )
//   )
//   .concat(
//     <Array<DetectionEquipment>>(
//       Object.values(_all_detection_equipments).map(
//         (e: any) => ((e.type = "d"), e)
//       )
//     )
//   );

export default equipment;
