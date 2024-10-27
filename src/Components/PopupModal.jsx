import React from "react"
import Modal from "react-bootstrap/Modal";
import {useSelector, useDispatch} from 'react-redux'
import {MessageModal} from '../store/counterslice'
import Button from 'react-bootstrap/Button';

function PopupModal() {

    const popup = useSelector((state) => state.counter.PopupModalMessage)
    const dispatch = useDispatch()
    const handleClose = () => dispatch(MessageModal(false));
    return (
        <>
            <Modal show={popup} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Important</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please Rotate your phone for better view</Modal.Body>
            </Modal>
        </>
    )

}

export default PopupModal