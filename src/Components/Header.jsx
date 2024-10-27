import NavButtons from "./NavButtons";
import NavBar from "./NavBar";
import React, {useEffect, useState,useMemo} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PopupModal from "./PopupModal";
export default function Header() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    // Function to check screen width and update state
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    // Set up event listeners for resize and component load
    useEffect(() => {
        checkScreenSize(); // Initial check on load
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>

            <div className={"w-100"}>


                {/*<PopupModal show={show}  />*/}

                <PopupModal/>
            {/*    <Modal show={show} onHide={handleClose} centered>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Important</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>Please Rotate your phone for better view</Modal.Body>*/}
            {/*</Modal>*/}



                <NavButtons/>
                <NavBar/>
            </div>
        </>
    )
}