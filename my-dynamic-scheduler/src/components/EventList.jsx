import React from "react";
import event_api from "../api/event_api.js";
import ReactTable from "react-table-6"; // Legacy Component, current version (react-table-7) was much more difficult to work with in crunch
import styled from "styled-components";

import 'react-table-6/react-table.css'; // Legacy Component, Default css that comes with react-table-6

//Used to create stylized div to act as a button for deletion, unecessary but looks good
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class EventDelete extends React.Component {
    //Delete button render and event
    eventDelete = event => {
        event.preventDefault();

        if (
            window.confirm(
                `Do you want to delete the task ${this.props.title} permanently?`
            )
        ) {
            event_api.deleteEvent(this.props.id);
            window.location.reload();
        }
    }

    render() {
        return <Delete onClick={this.eventDelete}>Delete Event</Delete>
    }
}

class EventList extends React.Component {
    //Lists all of the events for a given user
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('username'),
            events: [],
            columns: [],
            eventLoading: false
        }
    }

    componentDidMount = async () => {
        this.setState({eventLoading: true});

        try {
            await event_api.getEvents(this.state.user).then(res => {
                this.setState({
                    events: res.data.data,
                    eventLoading: false
                });
            });
        } catch {
            this.setState({eventLoading:false});
            console.log("No events");
        }

    }

    render () {
        const { events, eventLoading } = this.state;
        //Define columns for table: Title, Date, Time, Duration and function cell for deletion
        const columns = [
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true
            },
            {
                Header: 'Date',
                accessor: 'date',
                filterable: true
            },
            {
                Header: 'Time',
                accessor: 'time',
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
                            <EventDelete id={props.original._id} title={props.original.title} />
                        </span>
                    );

                }
            }
        ]
        //Logic to only show table was info is loading from db
        let showTable = true;
        if (!events.length) {
            showTable = false;
        }

        //ReactTable takes data, column format, loading and optional options
        return (
            <div className="EventList">
                <h1>Events</h1>
                {showTable && (
                    <ReactTable
                        data={events}
                        columns={columns}
                        loading={eventLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </div>
        );

    }
}

export default EventList;