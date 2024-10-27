import React, { memo,useEffect} from "react"
import Modal from "react-bootstrap/Modal";
import {useSelector, useDispatch} from 'react-redux'
import {MessageModal} from '../store/counterslice'

function PopupModal() {

    const popup = useSelector((state) => state.counter.PopupModalMessage)
    const dispatch = useDispatch()
    const handleClose = () => dispatch(MessageModal(false));
    //
    // useEffect(
    //     ()=>{}
    // )
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            dispatch(MessageModal(true));
            console.log(window.innerWidth)
        } else {
            dispatch(MessageModal(false));
        }
    };

    useEffect(() => {
        checkScreenSize(); // Initial check on load
        // window.addEventListener('resize', checkScreenSize);
        // return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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

export default memo(PopupModal)