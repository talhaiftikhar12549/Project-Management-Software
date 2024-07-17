import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import {useState, useRef} from 'react';
import { useForm } from "react-hook-form";
export default function NavButtons() {
    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {console.log(data); reset()};

    // console.log(watch("example")); // watch input value by passing the name of it

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
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("Name" , { required: true })} />
                        <br/><br/>
                        <input {...register("Password", { required: true })} />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <br/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*Add Task Modal End*/}

        </>

    );
}
