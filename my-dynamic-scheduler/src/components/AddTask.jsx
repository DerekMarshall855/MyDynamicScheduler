import React from 'react';
import Popup from 'reactjs-popup';

class AddTask extends React.Component {

    render() {
        return (
            <Popup trigger={<button>Add Task</button>}>
                <div>
                    <h1>Add Task Code Here</h1>
                </div>
            </Popup>
        );
    }
}
export default AddTask