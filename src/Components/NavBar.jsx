import {useSelector, useDispatch} from 'react-redux'

export default function NavBar() {

    const task = useSelector((state) => state.counter.taskInColumn)
    return (
        <>
            <div className="text-center bg-body-tertiary fw-semibold">
                {/*<div className="row " style="max-width: 100%;">*/}
                <div className={"row"}>
                    <div className="col py-2 border">
                        Backlog &nbsp;
                        { task.backlog }
                    </div>
                    <div className="col py-2 border">
                        Open &nbsp;
                        { task.open }
                    </div>
                    <div className="col py-2 border">
                        New &nbsp;
                        { task.new }
                    </div>
                    <div className="col py-2 border">
                        In Progress &nbsp;
                        { task.inProgress }
                    </div>
                    <div className="col py-2 border">
                        Feedback Needed &nbsp;
                        { task.feedBackNeeded }
                    </div>
                    <div className="col py-2 border">
                        Ready for Testing &nbsp;
                        { task.readyForTesting }
                    </div>
                    <div className="col py-2 border">
                        QA in Progress &nbsp;
                        {task.qaInProgress }
                    </div>
                </div>
            </div>
        </>
    )
}