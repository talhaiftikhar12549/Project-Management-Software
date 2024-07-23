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
    const today = new Date().toISOString().split('T')[0];

    //Download Button Start
    const {register, reset, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        console.log(data)
        dispatch(addTask(data))
        reset()
    };
    //Download Button Ends


    //Modal Show
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Modal Show


    //File Importing Button Start
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
            <div className={"bg-body-tertiary d-flex justify-content-center p-2"}><h5>Project Management Software</h5></div>
            <Navbar className="bg-body-tertiary justify-content-between px-5 w-100">
                <div>
                    <Button type="submit" onClick={handleShow}>Add Tasks</Button>
                </div>
                <div>
                    <Row>
                        <Col xs="auto">
                            <button className={"btn btn-primary"} onClick={triggerFileInput}>
                                Import Tasks
                            </button>
                            <input type={"file"} ref={fileInputRef} onChange={handleFileUpload}
                                   style={{display: "none",}}/>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" onClick={() => dispatch(downloadJson())}>Export Tasks</Button>
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
                            {...register("name", {required: true})}
                            placeholder={"Task Name"}
                        />
                        <br/>
                        <Form.Control
                            {...register("description", {required: true})}
                            placeholder={"Task Description"}
                        />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <br/>
                        <Form.Control
                            {...register("assignee", {required: true})}
                            placeholder={"Task Assignee"}
                        />
                        <br/>
                        <Form.Group>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                {...register("dueDate", {required: true})}
                                placeholder="Due Date"
                                min={today} // Set the minimum date to today's date
                            />
                            {errors.dueDate && <span>This field is required</span>}
                        </Form.Group>
                        <br/>
                        {/*<Form.Control*/}
                        {/*    type="number"*/}
                        {/*    {...register("timeSpent", {required: true})}*/}
                        {/*    placeholder={"Time Spent on Task in Hours"}*/}
                        {/*/>*/}

                            <Form.Control
                                type="number"
                                {...register("timeSpent", {
                                    required: true,
                                    min: {
                                        value: 0,
                                        message: "Time spent cannot be less than 0"
                                    }
                                })}
                                placeholder="Time Spent on Task in Hours"
                                min="0" // Set the minimum value to 0
                            />






                        <br/>

                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <div style={{ padding: '5px 50px', borderRadius: '5px', width: '100%' }}>
                                <label style={{ marginRight: '10px' }}>
                                    <input
                                        type="radio"
                                        value="Low"
                                        {...register("priority", { required: true })}
                                    />
                                    Low
                                </label>
                                <label style={{ marginRight: '10px' }}>
                                    <input
                                        type="radio"
                                        value="High"
                                        {...register("priority", { required: true })}
                                    />
                                    High
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Urgent"
                                        {...register("priority", { required: true })}
                                    />
                                    Urgent
                                </label>
                            </div>
                            {errors.priority && <span>This field is required</span>}
                        </Form.Group>

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
