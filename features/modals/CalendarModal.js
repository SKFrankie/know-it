import React from 'react'
import Modal from "../../ui/Modal";

const CalendarModal = ({isOpen=false, onClose, ...props}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      test
    </Modal>
  )
}

export default CalendarModal
