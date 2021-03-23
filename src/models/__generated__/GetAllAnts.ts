/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AntColor } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetAllAnts
// ====================================================

export interface GetAllAnts_ants {
  __typename: "Ant";
  /**
   * The name of the ant
   */
  name: string;
  /**
   * The length of the ant in millimetres
   */
  lengthMillimeters: number;
  /**
   * The color of the ant
   */
  color: AntColor;
  /**
   * The weigt of the ant in milligrams
   */
  weightMilligrams: number;
}

export interface GetAllAnts {
  /**
   * A list of competing ants
   */
  ants: (GetAllAnts_ants | null)[];
}
