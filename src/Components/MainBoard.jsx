import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {editData} from '../store/counterslice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useForm} from "react-hook-form";
import Form from "react-bootstrap/Form";
import {DragDropContext} from 'react-beautiful-dnd';

export default function MainBoard() {
    const today = new Date().toISOString().split('T')[0];
    //drag and drop start
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    //drag and drop ends
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const taskData = useSelector((state) => state.counter.task);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [eshow, seteShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (task) => {
        setCurrentTask(task);
        setShow(true);
    };

    const ehandleClose = () => seteShow(false);
    const ehandleShow = () => {
        if (currentTask) {
            setValue("id", currentTask.id)
            setValue("name", currentTask.name);
            setValue("description", currentTask.description);
            setValue("dueDate", currentTask.dueDate);
            setValue("assignee", currentTask.assignee);
            setValue("status", currentTask.status);
            setValue("timeSpent", currentTask.timeSpent);
            setValue("priority", currentTask.priority);
        }
        seteShow(true);
    };

    const editSubmit = (data) => {
        console.log(data);
        seteShow(false);
        dispatch(editData(data))
    };

    const showEditModal = () => {
        setShow(false);
        ehandleShow();
    };

    function bgColor(priority) {
        switch (priority) {
            case 'Urgent':
                return '#ffe2e4';
            case 'High':
                return '#ffdbbb';
            case 'Low':
                return '#d3fff0';
            default:
                return 'white';
        }
    }

    return (
        <>
            <div className="text-center">
                <div className="row">
                    <div className="col py-2">
                        {taskData.map((task) => (
                            <div draggable="true" className="border py-1 my-1" key={task.id}
                                 onClick={() => handleShow(task)}
                                 style={{backgroundColor: bgColor(task.priority)}}>
                                <div className="d-flex">
                                    <div style={{width: '80%'}}>
                                        <p style={{margin: '0px', textAlign: 'left'}}>{task.name}</p>
                                        <p style={{margin: '0px', textAlign: 'left'}}>Priority: {task.priority}</p>
                                    </div>
                                    <div style={{width: '20%', paddingRight: '4px', textAlign: 'left'}}>
                                        {task.timeSpent}h
                                    </div>
                                </div>
                                <div className="font-weight-normal"
                                     style={{borderTop: '1px solid darkgrey', textAlign: 'left'}}>
                                    {task.assignee}
                                </div>
                            </div>
                        ))}
                    </div>


                    <div id="div2" className="col py-2 h-100 ">
                        meow
                    </div>

                    <div className="col py-2 ">
                        meow
                    </div>
                    <div className="col py-2 ">
                        meow
                    </div>
                    <div className="col py-2 ">
                        meow
                    </div>
                    <div className="col py-2 ">
                        meow
                    </div>
                    <div className="col py-2 ">
                        meow
                    </div>


                </div>

                {/* Show Modal Start */}
                {currentTask && (
                    <>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Task Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h6>Name:</h6> {currentTask.name}
                                <h6>Description:</h6> {currentTask.description}
                                <h6>Due Date:</h6> {currentTask.dueDate}
                                <h6>Assignee:</h6> {currentTask.assignee}
                                <h6>Status:</h6> {currentTask.status}
                                <h6>Time Spent:</h6> {currentTask.timeSpent}
                                <h6>Priority:</h6> {currentTask.priority}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={showEditModal}>
                                    Edit
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Edit Modal Start */}
                        <Modal show={eshow} onHide={ehandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Task</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmit(editSubmit)}>
                                    <Form.Group style={{display: "none"}}>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control
                                            {...register("id", {required: true,})}
                                            placeholder="ID"
                                        />
                                        {errors.editName && <span>This field is required</span>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            {...register("name", {required: true})}
                                            placeholder="Name"
                                        />
                                        {errors.editName && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            {...register("description", {required: true})}
                                            placeholder="Description"
                                        />
                                        {errors.editDescription && <span>This field is required</span>}
                                    </Form.Group>

                                    {/*<Form.Group>*/}
                                    {/*    <Form.Label>Due Date</Form.Label>*/}
                                    {/*    <Form.Control*/}
                                    {/*        type="date"*/}
                                    {/*        {...register("dueDate", {required: true})}*/}
                                    {/*        placeholder="Due Date"*/}
                                    {/*    />*/}
                                    {/*    {errors.editDueDate && <span>This field is required</span>}*/}
                                    {/*</Form.Group>*/}


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




                                    <Form.Group>
                                        <Form.Label>Assignee</Form.Label>
                                        <Form.Control
                                            {...register("assignee", {required: true})}
                                            placeholder="Assignee"
                                        />
                                        {errors.editAssignee && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group style={{display: "none"}}>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            {...register("status", {required: true})}
                                            placeholder="Status"
                                        />
                                        {errors.editStatus && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Time Spent</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register("timeSpent", {required: true})}
                                            placeholder="Time Spent"
                                        />
                                        {errors.editTimeSpent && <span>This field is required</span>}
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Priority</Form.Label>
                                        <select
                                            {...register("priority", {required: true})}
                                            style={{padding: '5px 50px', borderRadius: '5px', width: '100%'}}
                                        >
                                            <option disabled value="">Select your Priority</option>
                                            <option value="Low">Low</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                        {errors.priority && <span>This field is required</span>}
                                    </Form.Group>


                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={ehandleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        {/* Edit Modal End */}
                    </>
                )}
                {/* Show Modal Ends */}
            </div>
        </>
    );
}








