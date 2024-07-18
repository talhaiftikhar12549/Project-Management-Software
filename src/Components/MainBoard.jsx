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
    // const EditModal = () => setShow(true);
    const handleShow = (task) => {
        setCurrentTask(task);
        setShow(true);
    };


    //
    const [eshow, seteShow] = useState(false);

    const ehandleClose = () => seteShow(false);
    const ehandleShow = () => seteShow(true);

   // const editmodal=()=>(ehandleShow)
        //handleClose

function shoeeditmodal()
{
    setShow(false)
    seteShow(true)
}



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
                            <Button variant="primary" onClick={shoeeditmodal}>
                                Edit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                )}


                {/*    Edit Modal Start*/}
                <Modal show={eshow} onHide={ehandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ehandleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={ehandleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*    Edit Modal End*/}

            </div>
        </>
    )
}