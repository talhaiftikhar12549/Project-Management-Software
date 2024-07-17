import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../store/counterslice'
export default function MainBoard() {
    const taskData = useSelector((state) => state.counter.task)
    const dispatch = useDispatch()

    return (
        <>
            <div className="text-center fw-semibold">
                {/*<div className="row " style="max-width: 100%;">*/}
                <div className={"row"}>
                    <div className="col py-2 ">
                        {taskData.map((state)=>{
                           return(
                               <div className={"border py-1 my-1"} key={state.id}>
                                   <p>{state.name}</p>
                                   <p>{state.priority}</p>
                                   <p>{state.assignee}</p>
                                   <p>{state.dueDate}</p>
                                   <p></p>
                               </div>
                           )
                        })}
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
            </div>
        </>
    )
}