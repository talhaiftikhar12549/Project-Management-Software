import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import {useSelector, useDispatch} from 'react-redux'
import {downloadJson, addTask, importFile} from '../store/counterslice'
import {useState, useRef} from 'react';
import {useForm} from "react-hook-form";

export default function NavButtons() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()


    //Download Button Start
    const {register, reset, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        // console.log(data)
        dispatch(addTask(data))
        reset()
    };
    //Download Button Ends


    //Modal Show
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Modal Show


    //File IMporting Button Start
    const fileInputRef = useRef(null);

    function triggerFileInput() {
        //fileInput.click();
        fileInputRef.current.click();
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    // Assuming the JSON structure matches your `form` structure
                    dispatch(importFile(json))
                    // this.$store.commit('setFormData', json);
                } catch (error) {
                    console.error("Invalid JSON file");
                    alert("Please Upload Json file")
                }
            };
            reader.readAsText(file);
        }
    }

    //File Importing Button ends


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
                            <button className={"btn btn-primary"} onClick={triggerFileInput}>
                                Import file
                            </button>
                            <input type={"file"} ref={fileInputRef} onChange={handleFileUpload}
                                   style={{display: "none",}}/>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" onClick={() => dispatch(downloadJson())}>Download</Button>
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
                        <Form.Control
                            {...register("Name", {required: true})}
                            placeholder={"Name"}
                        />
                        <br/>
                        <Form.Control
                            {...register("Description", {required: true})}
                            placeholder={"Description"}
                        />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <br/>
                        <Form.Control
                            {...register("Assignee", {required: true})}
                            placeholder={"Assignee"}
                        />
                        <br/>
                        <Form.Control
                            type="date"
                            {...register("Due Date", {required: true})}
                            placeholder={"Due Date"}
                        />
                        <br/>
                        <Form.Control
                            {...register("Status", {required: true})}
                            placeholder={"Status"}
                        />
                        <br/>
                        <Form.Control
                            type="number"
                            {...register("Spend Time", {required: true})}
                            placeholder={"Spend Time in Hours"}
                        />
                        <br/>
                        <Form.Control
                            {...register("Priority", {required: true})}
                            placeholder={"Priority"}
                        />
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
