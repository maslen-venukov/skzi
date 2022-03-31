import { Type } from '../../interfaces/Type'

export interface AgreementTypesState {
  isLoading: boolean
  types: Type[]
}

export interface GetAgreementTypesResponse {
  types: Type[]
}