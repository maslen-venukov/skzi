import { makeAutoObservable } from 'mobx'
import { DialogType, OpenDialogParams } from './dialog.types'

class DialogStore {
  type: DialogType | null = null
  title?: string = undefined
  props?: any = undefined
  onClose?: () => void = undefined

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

  setOnClose(value?: () => void) {
    this.onClose = value
  }

  openDialog(params: OpenDialogParams) {
    this.setType(params.type)
    this.setTitle(params.title)
    this.setProps(params.props)
    this.setOnClose(params.onClose)
  }

  closeDialog() {
    this.setType(null)
    this.setTitle(undefined)
    this.setProps(undefined)
    this.setOnClose(undefined)
  }
}

export default new DialogStore()