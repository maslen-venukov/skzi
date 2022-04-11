export type DialogType =
  'CreateAgreement'
  | 'UpdateAgreement'
  | 'UpdateUser'
  | 'CreateSkziUnit'
  | 'UpdateSkziUnit'

export interface OpenDialogParams {
  type: DialogType
  title?: string
  props?: any
}