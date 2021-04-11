# Project Report

Author: Rebecca Knezy, Derek Marshall, Joanne Bui

Date: April 10, 2021

[Github Link](https://github.com/DerekMarshall855/MyDynamicScheduler)

## P2.1 Client Side Component & UI

![Login Page](images/login.png){width=600px}
 
![Signup Page](images/signup.png){width=600px}

![Home Page](images/home.png){width=600px}

![Calendar with Task and Event Forms Filled](images/calendar.png){width=600px}

![Edit Calendar](images/edit_calendar.png){width=600px}

![Schedule Generator](images/schedule_generated.png){width=600px}

![Option to Log Out](images/logout.png){width=600px}



## P2.2 Server side CGI components

![DB Connection Server Side](images/db_connect.png){width=75%}

![Serverside main/Index](images/server_index.png){width=75%}

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

Additionally if the user does not have this db or collections created already,
mongodb creates them automatically. Mongoose Schema (shown later) defines the exact
layout for data in each collection

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

![Delete tasks and events from the calendar](images/delete_task_event.gif)

![Task existing in Collection Before Deletion](images/task_before_delete.png){width=600px}

![Delete Task](images/delete_task.png){width=600px}

![Task Deleted From Collection](images/task_gone.png){width=600px}

Scheduling algorithm retrieves tasks from the database for the day and sorts them according to due date and difficulty.

![Schedule Generated](images/schedule_generated.png){width=600px}

![Add tasks and events/Gen schedule](images/add_gen_schedule.gif)



## P2.5 Problem Solving Algorithms
During Signup, authentication is needed to make sure there will not be any accounts with the same username

![Signup Authentication](images/signup_authentication.png){width=600px}

Login Authentication that was discussed in the section above.

![Login Authentication](images/login_auth.png){width=600px}

Scheduling algorithm to organize users' tasks for the day. The algorithm will take in what time the user wants to start and stop doing work.

![Schedule Generator File](my-dynamic-scheduler/src/components/SchedulerGenerator)

![Public Router](images/public_router)
![Private Router](images/private_router)
![Main Router](images/router)

Authentication ensures that if the user is not logged in they cannot access private routes (calendar, edit, logout, home, generate schedule) and if they are logged in they
can no longer access public routes (login, signup). We use RouteRedirect to redirect the user.

![Signup/Login, redirect user based on authorization status](images/security_signup_login.gif)

We created a day checker helper function to tell if a day had any events/tasks

![Day Checker](images/day_checker.png){width=75%}

We used Mongoose and Axios to access our database easily and make changes efficiently. Below are images of the libraries in use (user example).
![User Schema](images/user_schema.png){width=75%}
![User Router](images/user_router.png){width=75%}
![User Controller](images/user_controller.png){width=75%}
![User Axios](images/user_axios.png){width=75%}


## P2.6 Robustness and Efficiency

Our code has been thoroughly tested and allows for quick functionality with no known errors.

As seen in the above gifs the site is efficient, quickly updating the users information, rerouting and generating the schedule.

Task, event and schedule information are also specific to a users account.

We use a simple login controller util function to keep track of the users current state in local storage

![Login Controller](images/login_controller.png){width=75%}