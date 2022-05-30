import React from 'react'
import { Modal } from 'reactstrap'

import './module.css'

function ModalWrapper ({ isShow, toggleModal, title, children, ...otherProps }) {
	return <Modal isOpen={isShow} toggle={toggleModal} contentClassName="modal-wrapper" {...otherProps}>
		<div className="decoration"></div>
		<header className="title">{title}</header>
		<section className="body">
			{children}
		</section>
	</Modal>
}

export default ModalWrapper