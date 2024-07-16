import React from "react"
import Nav from 'react-bootstrap/Nav';

export default function NavBar() {
    return (
        <>
            <div className="text-center bg-body-tertiary fw-semibold" >
                {/*<div className="row " style="max-width: 100%;">*/}
                <div className={"row"}>
                    <div className="col py-2 border">
                        Backlog
                    </div>
                    <div className="col py-2 border">
                        Open
                    </div>
                    <div className="col py-2 border">
                        New
                    </div>
                    <div className="col py-2 border">
                        In Progress
                    </div>
                    <div className="col py-2 border">
                        Feedback Needed
                    </div>
                    <div className="col py-2 border">
                        Ready for Testing
                    </div>
                    <div className="col py-2 border">
                        QA in Progress
                    </div>
                </div>
            </div>
        </>
    )
}