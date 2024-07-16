import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react';

export default function NavButtons() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/*Button Bar Start*/}
            <Navbar className="bg-body-tertiary justify-content-between px-5">
                <div>
                    <Button type="submit" onClick={handleShow}>Add Task</Button>
                </div>
                <div>
                    <Row>
                        <Col xs="auto">
                            <Button type="submit">Import</Button>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Download</Button>
                        </Col>
                    </Row>
                </div>
            </Navbar>
            {/*Button Bar End*/}
            {/*Add Task Modal Start*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*Add Task Modal End*/}

        </>

    );
}
