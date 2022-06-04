export type DialogType =
  'CreateAgreement'
  | 'UpdateAgreement'
  | 'CreateUser'
  | 'UpdateUser'
  | 'CreateSkziUnit'
  | 'UpdateSkziUnit'
  | 'CreateOrg'
  | 'UpdateOrg'
  | 'CreateAct'
  | 'UpdateAct'

export interface OpenDialogParams {
  type: DialogType
  title?: string
  props?: any
}