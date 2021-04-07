import React from 'react';
import Popup from 'reactjs-popup';

class AddEvent extends React.Component {

    render() {
        return (
            <Popup trigger={<button>Add Event</button>}>
                <div>
                    <h1>Add Event Code Here</h1>
                </div>
            </Popup>
        );
    }
}
export default AddEvent