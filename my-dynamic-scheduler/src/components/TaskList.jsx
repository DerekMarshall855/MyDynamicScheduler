import React from "react";
import task_api from "../api/task_api.js";
import ReactTable from "react-table-6";
import styled from "styled-components";

import 'react-table-6/react-table.css';

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`


class TaskDelete extends React.Component {
    taskDelete = event => {
        event.preventDefault();

        if (
            window.confirm(
                `Do you want to delete the task ${this.props.title} permanently?`
            )
        ) {
            task_api.deleteTask(this.props.id);
            window.location.reload();
        }
    }

    render() {
        return <Delete onClick={this.taskDelete}>Delete Task</Delete>
    }
}

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('username'),
            tasks: [],
            columns: [],
            taskLoading: false
        }
    }

    componentDidMount = async () => {
        this.setState({taskLoading: true});

        try {
            await task_api.getTasks(this.state.user).then(res => {
                this.setState({
                    tasks: res.data.data,
                    taskLoading: false
                });
            });
        } catch {
            this.setState({
                taskLoading:false,
                tasks: [{"_id":"","title":"","due_date":"","difficulty":"","duration":""}],
            });
            console.log("No tasks");
        }

    }

    render () {
        const { tasks, taskLoading } = this.state;

        const columns = [
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true
            },
            {
                Header: 'Due Date',
                accessor: 'due_date',
                filterable: true
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
                filterable: true
            },
            {
                Header: 'Duration',
                accessor: 'duration',
                filterable: true
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <TaskDelete id={props.original._id} title={props.original.title} />
                        </span>
                    );
                }
            }
        ]
        let showTable = true;
        if (!tasks.length) {
            showTable = false;
        }

        return (
            <div>
                <h1>Tasks</h1>
                {showTable && (
                    <ReactTable
                        data={tasks}
                        columns={columns}
                        loading={taskLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </div>
        );

    }
}

export default TaskList;