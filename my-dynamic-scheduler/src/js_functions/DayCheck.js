/*
    Checks to see if there are events/tasks on a day and returns them as a string of titles
    ---------------------
    params:
        events - list of event json objects
        tasks - list of task json objects
        day - date object for day
    ---------------------
    returns:
        result = string of titles formatted as: title /n title /n ...
*/
const dayCheck = (events, tasks, day) => {
    let result = "";

    for (var i = 0; i < events.length; i++) {
        if (events[i].date.localeCompare(day) === 0) {
            
            result += events[i].title + " | ";

        }
    }

    for (var x = 0; x < tasks.length; x++) {
        if (tasks[x].due_date.localeCompare(day) === 0) {
            
            result += tasks[x].title + " | ";
        }
    }



    return result.slice(0, -3);
}

export default dayCheck;