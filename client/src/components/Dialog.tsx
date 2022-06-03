import React, { LazyExoticComponent, Suspense } from 'react'
import { observer } from 'mobx-react-lite'
import { Drawer } from 'antd'
import Loader from './Loader'
import dialogStore from '../store/dialog/dialog.store'
import { DialogType } from '../store/dialog/dialog.types'

const dialogsMap: Record<DialogType, LazyExoticComponent<React.FC<any>>> = {
  CreateAgreement: React.lazy(() => import('./dialogs/CreateAgreementDialog')),
  UpdateAgreement: React.lazy(() => import('./dialogs/UpdateAgreementDialog')),
  UpdateUser: React.lazy(() => import('./dialogs/UpdateUserDialog')),
  CreateSkziUnit: React.lazy(() => import('./dialogs/CreateSkziUnitDialog')),
  UpdateSkziUnit: React.lazy(() => import('./dialogs/UpdateSkziUnitDialog')),
  CreateOrg: React.lazy(() => import('./dialogs/CreateOrgDialog')),
  UpdateOrg: React.lazy(() => import('./dialogs/UpdateOrgDialog')),
  CreateAct: React.lazy(() => import('./dialogs/CreateActDialog')),
  UpdateAct: React.lazy(() => import('./dialogs/UpdateActDialog')),
}

const Dialog: React.FC = () => {
  const { type, title, props, closeDialog } = dialogStore

  return (
    <Drawer
      title={title}
      visible={Boolean(type)}
      width="33vw"
      onClose={closeDialog}
    >
      <Suspense fallback={<Loader />}>
        {type && React.createElement(dialogsMap[type], props)}
      </Suspense>
    </Drawer>
  )
}

export default observer(Dialog)