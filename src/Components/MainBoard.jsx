import React from "react"
import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from '../store/counterslice'
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MainBoard() {
    const taskData = useSelector((state) => state.counter.task)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const handleClose = () => setShow(false);
    const EditModal = () => setShow(true);
    const handleShow = (task) => {
        setCurrentTask(task);
        setShow(true);
    };
    return (
        <>
            <div className="text-center fw-semibold">
                <div className={"row"}>
                    <div className="col py-2">
                        {taskData.map((task) => (
                            <div className="border py-1 my-1" key={task.id} onClick={() => handleShow(task)}>
                                <p>{task.name}</p>
                                <p>{task.priority}</p>
                                <p>{task.assignee}</p>
                                <p>{task.dueDate}</p>
                            </div>
                        ))}
                    </div>

                    <div className="col py-2 ">
                    </div>

                    <div className="col py-2 ">

                    </div>
                    <div className="col py-2 ">

                    </div>
                    <div className="col py-2 ">

                    </div>
                    <div className="col py-2 ">

                    </div>
                    <div className="col py-2 ">

                    </div>
                </div>
                {currentTask && (
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{currentTask.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Description:</h6> {currentTask.description}
                            <h6>Due Date:</h6> {currentTask.dueDate}
                            <h6>Assignee:</h6>{currentTask.assignee}
                            <h6>Status:</h6> {currentTask.status}
                            <h6>Time Spent:</h6> {currentTask.timeSpent}
                            <h6>Priority:</h6> {currentTask.priority}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={EditModal}>
                                Edit
                            </Button>
                        </Modal.Footer>
                    </Modal>


                //    edit modal
                    
                )}

            </div>
        </>
    )
}