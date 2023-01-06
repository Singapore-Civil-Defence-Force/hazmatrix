/**
 * @module AllEquipments
 *
 * This module exports a single Equipment array that combines both mitigation
 * and detection equipment objects into a single array for SearchEquipment to work
 * across both equipment types, but the equipment object is simplified to only
 * include the things needed for fuse.js search to work.
 */

import _all_mitigation_equipments from "../../data/mitigation_equipments.json";
import _all_detection_equipments from "../../data/detection_equipments.json";

type MitigationEquipment = {
  /**
   * type is hard coded to differentiate against the other equipment type.
   * this is optional since this value is only added in later.
   */
  type?: "m";

  id: string;
  name: string;
};

type DetectionEquipment = {
  /**
   * type is hard coded to differentiate against the other equipment type.
   * this is optional since this value is only added in later.
   */
  type?: "d";

  id: string;
  name: string;
};

type Equipment = MitigationEquipment | DetectionEquipment;

const equipment: Array<Equipment> = [];

const all_mitigation_equipments: Array<MitigationEquipment> = Object.values(
  _all_mitigation_equipments
);

const all_detection_equipments: Array<DetectionEquipment> = Object.values(
  _all_detection_equipments
);

for (const e of all_mitigation_equipments)
  equipment.push({
    type: "m",
    id: e.id,
    name: e.name,
  });

for (const e of all_detection_equipments)
  equipment.push({
    type: "d",
    id: e.id,
    name: e.name,
  });

export default equipment;
