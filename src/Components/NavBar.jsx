import {useSelector, useDispatch} from 'react-redux'

export default function NavBar() {

    const task = useSelector((state) => state.counter.taskInColumn)
    return (
        <>
            <div className="text-center bg-body-tertiary fw-semibold">
                {/*<div className="row " style="max-width: 100%;">*/}
                <div className={"row"}>
                    <div className="col py-2 border">
                        Backlog
                        { task.backlog }
                    </div>
                    <div className="col py-2 border">
                        Open
                        { task.open }
                    </div>
                    <div className="col py-2 border">
                        New
                        { task.new }
                    </div>
                    <div className="col py-2 border">
                        In Progress
                        { task.inProgress }
                    </div>
                    <div className="col py-2 border">
                        Feedback Needed
                        { task.feedBackNeeded }
                    </div>
                    <div className="col py-2 border">
                        Ready for Testing
                        { task.readyForTesting }
                    </div>
                    <div className="col py-2 border">
                        QA in Progress
                        {task.qaInProgress }
                    </div>
                </div>
            </div>
        </>
    )
}