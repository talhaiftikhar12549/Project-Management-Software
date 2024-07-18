// import React from "react"
// import {useSelector, useDispatch} from 'react-redux'
// import {decrement, increment} from '../store/counterslice'
// import {useState} from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import {useForm} from "react-hook-form"
// import Form from "react-bootstrap/Form";
//
// export default function MainBoard() {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: {errors},
//     } = useForm()
//
//     // console.log(watch("example"))
//
//     const taskData = useSelector((state) => state.counter.task)
//     const dispatch = useDispatch()
//     const [show, setShow] = useState(false);
//     const [currentTask, setCurrentTask] = useState(null);
//     const handleClose = () => setShow(false);
//     // const EditModal = () => setShow(true);
//     const handleShow = (task) => {
//         setCurrentTask(task);
//         setShow(true);
//     };
//
//     const [eshow, seteShow] = useState(false);
//
//     const ehandleClose = () => seteShow(false);
//     const ehandleShow = () => seteShow(true);
//     const editSubmit = (data) => {
//         console.log(data)
//
//         seteShow(false)
//     }
//     // const editmodal=()=>(ehandleShow)
//
//
//     //handleClose
//
//     function shoeeditmodal() {
//         setShow(false)
//         seteShow(true)
//     }
//
//     function bgColor(priority) {
//         switch (priority) {
//             case 'Urgent':
//                 return '#ffe2e4';
//             case 'High':
//                 return '#ffdbbb';
//             case 'Low':
//                 return '#d3fff0';
//             default:
//                 return 'white';
//         }
//     }
//
//
//     return (
//         <>
//             <div className="text-center ">
//                 <div className={"row"}>
//                     <div className="col py-2">
//                         {taskData.map((task) => (
//
//                             <div className="border py-1 my-1" key={task.id} onClick={() => handleShow(task)}
//                                  style={{backgroundColor: bgColor(task.priority)}}>
//                                 <div className="d-flex">
//                                     <div style={{width: '80%'}}>
//                                         <p style={{margin: '0px', textAlign: 'left'}}>{task.name}</p>
//                                         <p style={{margin: '0px', textAlign: 'left'}}>Priority: {task.priority}</p>
//                                     </div>
//                                     <div style={{
//                                         width: '20%',
//                                         paddingRight: '4px',
//                                         textAlign: 'left'
//                                     }}>{task.timeSpent}h
//                                     </div>
//                                 </div>
//                                 <div className="font-weight-normal" style={{
//                                     borderTop: '1px solid darkgrey',
//                                     textAlign: 'left'
//                                 }}>{task.assignee}</div>
//
//                             </div>
//
//
//                         ))}
//                     </div>
//
//                     <div className="col py-2 ">
//                         meow
//                     </div>
//
//                     <div className="col py-2 ">
//                         meow
//                     </div>
//                     <div className="col py-2 ">
//                         meow
//                     </div>
//                     <div className="col py-2 ">
//                         meow
//                     </div>
//                     <div className="col py-2 ">
//                         meow
//                     </div>
//                     <div className="col py-2 ">
//                         meow
//                     </div>
//                 </div>
//                 {/*Show Modal Start*/}
//                 {currentTask && (
//                     <>
//                         <Modal show={show} onHide={handleClose}>
//                             <Modal.Header closeButton>
//                                 <Modal.Title>Task Details</Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>
//                                 <h6>Name:</h6> {currentTask.name}
//                                 <h6>Description:</h6> {currentTask.description}
//                                 <h6>Due Date:</h6> {currentTask.dueDate}
//                                 <h6>Assignee:</h6>{currentTask.assignee}
//                                 <h6>Status:</h6> {currentTask.status}
//                                 <h6>Time Spent:</h6> {currentTask.timeSpent}
//                                 <h6>Priority:</h6> {currentTask.priority}
//                             </Modal.Body>
//                             <Modal.Footer>
//                                 <Button variant="secondary" onClick={handleClose}>
//                                     Close
//                                 </Button>
//                                 <Button variant="primary" onClick={shoeeditmodal}>
//                                     Edit
//                                 </Button>
//                             </Modal.Footer>
//                         </Modal>
//
//                         {/**/}
//                         <Modal show={eshow} onHide={ehandleClose}>
//                             <Modal.Header closeButton>
//                                 <Modal.Title>Edit Task</Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>
//                                 <Form onSubmit={handleSubmit(editSubmit)}>
//
//
//                                     <Form.Group>
//                                         <Form.Label>Name</Form.Label>
//                                         <Form.Control
//                                             defaultValue={currentTask.name}
//                                             {...register("editName", {required: true})}
//                                             placeholder="Name"
//                                         />
//                                         {errors.editName && <span>This field is required</span>}
//                                     </Form.Group>
//
//
//                                     <Form.Group>
//                                         <Form.Label>Description</Form.Label>
//                                         <Form.Control
//                                             defaultValue={currentTask.description}
//                                             {...register("editDescription", {required: true})}
//                                             placeholder="Description"
//                                         />
//                                         {errors.editDescription && <span>This field is required</span>}
//                                     </Form.Group>
//
//
//                                     <Form.Group>
//                                         <Form.Label>Due Date</Form.Label>
//                                         <Form.Control
//                                             defaultValue={currentTask?.dueDate}
//                                             {...register("editDueData", {required: true})}
//                                             placeholder="Due Date"
//                                         />
//                                         {errors.editDescription && <span>This field is required</span>}
//                                     </Form.Group>
//
//
//                                     <Form.Group>
//                                         <Form.Label>Assignee</Form.Label>
//                                         <Form.Control
//                                             defaultValue={currentTask?.assignee}
//                                             {...register("editAssignee", {required: true})}
//                                             placeholder="Assignee"
//                                         />
//                                         {errors.editDescription && <span>This field is required</span>}
//                                     </Form.Group>
//
//
//                                     <Form.Group>
//                                         <Form.Label>Status</Form.Label>
//                                         <Form.Control
//                                             defaultValue={currentTask?.status}
//                                             {...register("editStatus", {required: true})}
//                                             placeholder="Status"
//                                         />
//                                         {errors.editDescription && <span>This field is required</span>}
//                                     </Form.Group>
//
//
//                                     <Form.Group>
//                                         <Form.Label>Time Spent</Form.Label>
//                                         <Form.Control
//                                             defaultValue={currentTask?.timeSpent}
//                                             {...register("editTimeSpent", {required: true})}
//                                             placeholder="TimeSpent"
//                                         />
//                                         {errors.editDescription && <span>This field is required</span>}
//                                     </Form.Group>
//
//
//                                     <Form.Group>
//                                         <Form.Label>Priority</Form.Label>
//                                         <Form.Control
//                                             defaultValue={currentTask?.priority}
//                                             {...register("editPriority", {required: true})}
//                                             placeholder="Priority"
//                                         /><br/>
//                                         {errors.editDescription && <span>This field is required</span>}
//                                     </Form.Group>
//
//
//                                     <Modal.Footer>
//                                         <Button variant="secondary" onClick={ehandleClose}>
//                                             Close
//                                         </Button>
//                                         <Button variant="primary" type="submit">
//                                             Save Changes
//                                         </Button>
//                                     </Modal.Footer>
//                                 </Form>
//                             </Modal.Body>
//                         </Modal>
//
//                     </>
//
//
//
//
//
//
//
//
//                 )}
//                 {/*Show Modal Ends*/}
//
//                 {/*    Edit Modal Start*/}
//                 {/*<Modal show={eshow} onHide={ehandleClose}>*/}
//                 {/*    <Modal.Header closeButton>*/}
//                 {/*        <Modal.Title>Edit Task</Modal.Title>*/}
//                 {/*    </Modal.Header>*/}
//                 {/*    <Modal.Body>*/}
//                 {/*        <form onSubmit={handleSubmit(editSubmit)}>*/}
//                 {/*            /!* register your input into the hook by invoking the "register" function *!/*/}
//                 {/*            <input defaultValue="test" {...register("example")} />*/}
//
//                 {/*            /!* include validation with required or other standard HTML validation rules *!/*/}
//                 {/*            <input {...register("exampleRequired", { required: true })} />*/}
//                 {/*            /!* errors will return when field validation fails  *!/*/}
//                 {/*            {errors.exampleRequired && <span>This field is required</span>}*/}
//
//                 {/*            <Form.Control*/}
//                 {/*                {...register("editName", {required: true})}*/}
//                 {/*                placeholder={"Name"}*/}
//                 {/*            />*/}
//                 {/*            <br/>*/}
//                 {/*            <Form.Control*/}
//                 {/*                {...register("EditDescription", {required: true})}*/}
//                 {/*                placeholder={"Description"}*/}
//                 {/*            />*/}
//                 {/*            {errors.exampleRequired && <span>This field is required</span>}*/}
//                 {/*            <br/>*/}
//
//
//                 {/*        </form>*/}
//                 {/*    </Modal.Body>*/}
//                 {/*    <Modal.Footer>*/}
//                 {/*        <Button variant="secondary" onClick={ehandleClose}>*/}
//                 {/*            Close*/}
//                 {/*        </Button>*/}
//                 {/*        <Button variant="primary" onClick={editSubmit}>*/}
//                 {/*            Save Changes*/}
//                 {/*        </Button>*/}
//                 {/*    </Modal.Footer>*/}
//                 {/*</Modal>*/}
//
//
//
//                 {/*    Edit Modal End*/}
//
//             </div>
//         </>
//     )
// }




import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../store/counterslice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

export default function MainBoard() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
            setValue("editName", currentTask.name);
            setValue("editDescription", currentTask.description);
            setValue("editDueDate", currentTask.dueDate);
            setValue("editAssignee", currentTask.assignee);
            setValue("editStatus", currentTask.status);
            setValue("editTimeSpent", currentTask.timeSpent);
            setValue("editPriority", currentTask.priority);
        }
        seteShow(true);
    };

    const editSubmit = (data) => {
        console.log(data);
        seteShow(false);
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
                            <div className="border py-1 my-1" key={task.id} onClick={() => handleShow(task)} style={{ backgroundColor: bgColor(task.priority) }}>
                                <div className="d-flex">
                                    <div style={{ width: '80%' }}>
                                        <p style={{ margin: '0px', textAlign: 'left' }}>{task.name}</p>
                                        <p style={{ margin: '0px', textAlign: 'left' }}>Priority: {task.priority}</p>
                                    </div>
                                    <div style={{ width: '20%', paddingRight: '4px', textAlign: 'left' }}>
                                        {task.timeSpent}h
                                    </div>
                                </div>
                                <div className="font-weight-normal" style={{ borderTop: '1px solid darkgrey', textAlign: 'left' }}>
                                    {task.assignee}
                                </div>
                            </div>
                        ))}
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
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            {...register("editName", { required: true })}
                                            placeholder="Name"
                                        />
                                        {errors.editName && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            {...register("editDescription", { required: true })}
                                            placeholder="Description"
                                        />
                                        {errors.editDescription && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            {...register("editDueDate", { required: true })}
                                            placeholder="Due Date"
                                        />
                                        {errors.editDueDate && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Assignee</Form.Label>
                                        <Form.Control
                                            {...register("editAssignee", { required: true })}
                                            placeholder="Assignee"
                                        />
                                        {errors.editAssignee && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            {...register("editStatus", { required: true })}
                                            placeholder="Status"
                                        />
                                        {errors.editStatus && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Time Spent</Form.Label>
                                        <Form.Control
                                            {...register("editTimeSpent", { required: true })}
                                            placeholder="Time Spent"
                                        />
                                        {errors.editTimeSpent && <span>This field is required</span>}
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Priority</Form.Label>
                                        <Form.Control
                                            {...register("editPriority", { required: true })}
                                            placeholder="Priority"
                                        />
                                        {errors.editPriority && <span>This field is required</span>}
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
