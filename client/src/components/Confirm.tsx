import React from 'react'
import { Popconfirm, Tooltip, Button, PopconfirmProps, ButtonProps } from 'antd'
import useBoolean from '../hooks/useBoolean'
import { TooltipPropsWithTitle } from 'antd/lib/tooltip'

interface ConfirmProps {
  popconfirmProps: PopconfirmProps
  tooltipProps: TooltipPropsWithTitle
  buttonProps: ButtonProps
  onConfirm: () => void
}

const Confirm: React.FC<ConfirmProps> = ({
  popconfirmProps,
  tooltipProps,
  buttonProps,
  onConfirm
}) => {
  const {
    value: popconfirmVisible,
    setValue: setPopconfirmVisible,
    setFalse: closePopconfirm
  } = useBoolean()

  const {
    value: tooltipVisible,
    setValue: setTooltipVisible,
    setFalse: closeTooltip
  } = useBoolean()

  const handleConfirm = () => {
    onConfirm()
    closePopconfirm()
  }

  return (
    <Popconfirm
      visible={popconfirmVisible}
      okText="Да"
      cancelText="Нет"
      onCancel={closePopconfirm}
      onVisibleChange={setPopconfirmVisible}
      onConfirm={handleConfirm}
      {...popconfirmProps}
    >
      <Tooltip
        visible={tooltipVisible && !popconfirmVisible}
        onVisibleChange={setTooltipVisible}
        {...tooltipProps}
      >
        <Button onClick={closeTooltip} {...buttonProps} />
      </Tooltip>
    </Popconfirm>
  )
}

export default Confirm