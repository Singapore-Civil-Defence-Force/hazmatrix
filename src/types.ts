/**
 * Module for all shared TS definitions
 */

/**
 * Type of the Chemical object imported from data/chemicals.json
 *
 * Alternative using the data itself to derive the Type:
 * ```typescript
 * import type chemicals from "../data/chemicals.json";
 * type Chemicals = keyof typeof chemicals;
 * type Chemical = typeof chemicals[Keys];
 * ```
 */
export type Chemical = {
  id: string;
  name: string;
  formula?: string;
  un?: Array<number>;
};

/**
 * Type of the imported object from data/chemicals.json
 *
 * Alternative using the data itself to derive the Type:
 * ```typescript
 * import type chemicals from "../data/chemicals.json";
 * type Chemicals = keyof typeof chemicals;
 * ```
 */
export type Chemicals = { [id: string]: Chemical };
