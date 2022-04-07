export type DialogType =
  'CreateAgreement'
  | 'UpdateAgreement'
  | 'UpdateUser'

export interface OpenDialogParams {
  type: DialogType
  title?: string
  props?: any
  onClose?: () => void
}