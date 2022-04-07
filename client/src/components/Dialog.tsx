import React, { Suspense, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Drawer } from 'antd'
import Loader from './Loader'
import dialogStore from '../store/dialog/dialog.store'

const Dialog: React.FC = () => {
  const { type, title, props, onClose, closeDialog } = dialogStore

  const selectedDialog = useMemo(() => (
    type
      ? React.lazy(() => import(`./dialogs/${type}Dialog`))
      : null
  ), [type])

  const handleClose = () => {
    closeDialog()
    onClose?.()
  }

  return (
    <Drawer
      title={title}
      visible={Boolean(type)}
      width="33vw"
      onClose={handleClose}
    >
      <Suspense fallback={<Loader />}>
        {selectedDialog && React.createElement(selectedDialog, props)}
      </Suspense>
    </Drawer>
  )
}

export default observer(Dialog)