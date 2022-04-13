export type DialogType =
  'CreateAgreement'
  | 'UpdateAgreement'
  | 'UpdateUser'
  | 'CreateSkziUnit'
  | 'UpdateSkziUnit'
  | 'CreateOrg'
  | 'UpdateOrg'

export interface OpenDialogParams {
  type: DialogType
  title?: string
  props?: any
}