/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AntColor } from './../../__generated__/globalTypes'

// ====================================================
// GraphQL query operation: GetAllAntsQuery
// ====================================================

export interface GetAllAntsQuery_ants {
  __typename: 'Ant'
  /**
   * The name of the ant
   */
  name: string
  /**
   * The length of the ant in millimetres
   */
  lengthMillimeters: number
  /**
   * The color of the ant
   */
  color: AntColor
  /**
   * The weigt of the ant in milligrams
   */
  weightMilligrams: number
}

export interface GetAllAntsQuery {
  /**
   * A list of competing ants
   */
  ants: GetAllAntsQuery_ants[]
}
