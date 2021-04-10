# Project Report

Author: Rebecca Knezy, Derek Marshall, Joanne Bui

Date: April 10, 2021

## P2.1 Client Side Component & UI

![Login Page](images/login.png){width=600px}
 
![Signup Page](images/signup.png){width=600px}

![Home Page](images/home.png){width=600px}

![Calendar with Task and Event Forms Filled](images/calendar.png){width=600px}

![Edit Calendar](images/edit_calendar.png){width=600px}

![Schedule Generator](images/schedule_generated.png){width=600px}

![Option to Log Out](images/logout.png){width=600px}



## P2.2 Server side CGI components

![Processes Event Form](images/add_event_component.png){width=600px}

![Processes Task Form](images/add_task_component.png){width=600px}

![Creates Calendar](images/calendar_component.png){width=600px}

![Processes changes to Event List](images/event_list_component.png){width=600px}

![Processes changes to Task List](images/tasklist_component.png){width=600px}

![Generates Schedule](images/schedule_generator_component.png){width=600px}

![Processes Login Form](images/login_component.png){width=600px}

![Processes Signup Form](images/signup_component.png){width=600px}



## P2.3 Database Tier Design, Data, Usage
![Mongodb mydynamicscheduler Database](images/mongodb.png){width=600px}

### Collections in mydynamicscheduler

![Users Layout](images/db_users.png){width=600px}

To save accounts when users make an account through the sign up page.

![Events Layout](images/db_events.png){width=600px}

To save events when users add an event through the form in "Calendar" page. 

![Tasks Layout](images/db_tasks.png){width=600px}

To save events when users add a task through the form in "Calendar" page.

Accessed when creating the monthly calendars. If there is an event or task, it will be shown in the corresponding cell on the calendar. The schedule generator also retrieves tasks from the collection for certain days.



## P2.4 New Features and Tools
When signing up, we use the SHA-1 hash function to encrypt passwords before saving them into the database. 

For logins, the user and password have to be authenticated before the user is granted access. When the information does not match what is in the users collection, a message will appear. 

![Incorrect Login](images/login_fail.png){width=600px}

In the Calendar page, users can add a task or event by filling out the form.

When editing tasks and events, the chosen one will be retrieved from events/tasks collection and removed from the database.

![Task existing in Collection Before Deletion](images/task_before_delete.png){width=600px}

![Delete Task](images/delete_task.png){width=600px}

![Task Deleted From Collection](images/task_gone.png){width=600px}

Scheduling algorithm retrieves tasks from the database for the day and sorts them according to difficulty and duration.

![Schedule Generated](images/schedule_generated.png){width=600px}



## P2.5 Problem Solving Algorithms
During Signup, authentication is needed to make sure there will not be any accounts with the same username

![Signup Authentication](images/signup_authentication.png){width=600px}

Login Authentication that was discussed in the section above.

![Login Authentication](images/login_auth.png){width=600px}

Scheduling algorithm to organize users' tasks for the day. Refer to ScheduleGenerator.jsx. The algorithm will take in what time the user wants to start and stop doing work. 



## P2.6 Robustness and Efficiency
We used Mongoose and Axios to access our database easily and make changes efficiently.

![Event_api.js](images/event_api.png){width=600px}

The user can check the "Remember Me" box so their account details will be saved for the day and they will not have to sign in repeatedly.

 

**References**

1. [HBF, CP476 Assignment 5](a5.html)
2. Add your references used in developing your solutions. 
