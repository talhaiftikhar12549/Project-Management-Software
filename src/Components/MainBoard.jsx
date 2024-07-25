import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editData } from '../store/counterslice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

export default function MainBoard() {
    const today = new Date().toISOString().split('T')[0];

    const [dropIndicator, setDropIndicator] = useState(null);
    const dispatch = useDispatch();

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('text/plain', taskId.toString());
    };

    const handleDragEnd = (e) => {
        e.dataTransfer.clearData();
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        dispatch(editData({ id: taskId, status })); // Dispatch action to update task status
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const taskData = useSelector((state) => state.counter.task);

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
            setValue("id", currentTask.id);
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
        seteShow(false);
        dispatch(editData(data));
    };

    const showEditModal = () => {
        setShow(false);
        ehandleShow();
    };

    const renderTasks = (status) => {
        return taskData.filter(task => task.status === status).map((task) => (
            <div draggable="true" className="border py-1 my-1" key={task.id}
                 onClick={() => handleShow(task)}
                 onDragStart={(e) => handleDragStart(e, task.id)}
                 onDragEnd={handleDragEnd}
                 style={{ backgroundColor: bgColor(task.priority) }}>
                <div className="d-flex">
                    <div style={{ width: '80%' }}>
                        <p style={{ margin: '0px', textAlign: 'left' }}>
                            {task.name.length > 20 ? `${task.name.substring(0, 20)}...` : task.name}
                        </p>
                        <p style={{ margin: '0px', textAlign: 'left' }}>Priority: {task.priority}</p>
                    </div>
                    <div style={{ width: '20%', paddingRight: '4px', textAlign: 'left' }}>
                        {task.timeSpent}h
                    </div>
                </div>
                <div className="font-weight-normal" style={{ borderTop: '1px solid darkgrey', textAlign: 'left' }}>

                    <p>
                        {task.assignee.length>12 ? `${task.assignee.substring(0, 12)}...` : task.assignee}
                    </p>
                </div>
            </div>
        ));
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
                <div className="row" style={{ height: '100vh', overflowY: 'auto' }}>
                    <div className="col py-2 d-flex flex-column" style={{ height: '100%' }} onDrop={(e) => handleDrop(e, "Back log")} onDragOver={handleDragOver}>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        {renderTasks("Back log")}
                    </div>
                    <div className="col py-2 d-flex flex-column" style={{ height: '100%' }} onDrop={(e) => handleDrop(e, "Open")} onDragOver={handleDragOver}>
                        {renderTasks("Open")}
                    </div>
                    <div className="col py-2 d-flex flex-column" style={{ height: '100%' }} onDrop={(e) => handleDrop(e, "New")} onDragOver={handleDragOver}>
                        {renderTasks("New")}
                    </div>
                    <div className="col py-2 d-flex flex-column" style={{ height: '100%' }} onDrop={(e) => handleDrop(e, "In Progress")} onDragOver={handleDragOver}>
                        {renderTasks("In Progress")}
                    </div>
                    <div className="col py-2 d-flex flex-column" style={{ height: '100%' }} onDrop={(e) => handleDrop(e, "FeedBack Needed")} onDragOver={handleDragOver}>
                        {renderTasks("FeedBack Needed")}
                    </div>
                    <div className="col py-2 d-flex flex-column" style={{ height: '100%' }} onDrop={(e) => handleDrop(e, "Ready For Testing")} onDragOver={handleDragOver}>
                        {renderTasks("Ready For Testing")}
                    </div>
                    <div className="col py-2 d-flex flex-column" style={{ height: '100%' }} onDrop={(e) => handleDrop(e, "QA In Progress")} onDragOver={handleDragOver}>
                        {renderTasks("QA In Progress")}
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
                                    <Form.Group style={{ display: "none" }}>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control
                                            {...register("id", { required: true })}
                                            placeholder="ID"
                                        />
                                        {errors.editName && <span>This field is required</span>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            {...register("name", { required: true })}
                                            placeholder="Name"
                                        />
                                        {errors.editName && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            {...register("description", { required: true })}
                                            placeholder="Description"
                                        />
                                        {errors.editDescription && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            {...register("dueDate", { required: true })}
                                            placeholder="Due Date"
                                            min={today} // Set the minimum date to today's date
                                        />
                                        {errors.dueDate && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Assignee</Form.Label>
                                        <Form.Control
                                            {...register("assignee", { required: true })}
                                            placeholder="Assignee"
                                        />
                                        {errors.editAssignee && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group style={{ display: "none" }}>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            {...register("status", { required: true })}
                                            placeholder="Status"
                                        />
                                        {errors.editStatus && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Time Spent</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register("timeSpent", {
                                                required: "Time spent is required",
                                                min: {
                                                    value: 0.1,
                                                    message: "Time spent cannot be less than 0.1"
                                                },
                                                max: {
                                                    value: 999,
                                                    message: "Time spent cannot be more than 999"
                                                },
                                                validate: {
                                                    // Validate that the number has at most one decimal place
                                                    decimalPlaces: (value) => {
                                                        if (value && !/^\d{1,3}(\.\d{1})?$/.test(value)) {
                                                            return "Time spent must be a number with at most one decimal place";
                                                        }
                                                        return true;
                                                    }
                                                }
                                            })}
                                            placeholder="Time Spent on Task in Hours"
                                            min="0" // Set the minimum value to 0
                                            max="999" // Set the maximum value to 999
                                            step="0.1" // Allow numbers with one decimal place
                                        />
                                        {errors.timeSpent && <span>{errors.timeSpent.message}</span>}
                                    </Form.Group>


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
