import { makeAutoObservable } from 'mobx'
import { DialogType, OpenDialogParams } from './dialog.types'

class DialogStore {
  type: DialogType | null = null
  title?: string = undefined
  props?: any = undefined

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setType(value: DialogType | null) {
    this.type = value
  }

  setTitle(value?: string) {
    this.title = value
  }

  setProps(value?: any) {
    this.props = value
  }

  openDialog(params: OpenDialogParams) {
    this.setType(params.type)
    this.setTitle(params.title)
    this.setProps(params.props)
  }

  closeDialog() {
    this.setType(null)
    this.setTitle(undefined)
    this.setProps(undefined)
  }
}

export default new DialogStore()