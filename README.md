# Ironhack Client

## Description

Virtual Campus for students of Ironhack with calendar as the main feature.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Login:** As a user I can login to the platform so that I can interact with the web site
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add cohort** As an admin I can add cohorts so that I can organise the students
-  **Overview cohort** As user I want to see the cohort details so that I can know who participate in the cohort
-  **List cohorts** As an admin or staff I want to see the cohorts so that I can choose on
-  **Cohort calendar** As a user I want to see the calendar so that I can know what and when are the unit
-  **Update calendar** As an admin or staff I want to update the calendar so that I can organise the unit
-  **List curriculums** As an admin or staff I want to see the curriculums so that I choose one
-  **Details curriculum** As an admin or staff I want to see the curriculum details so that I can choose one
-  **Details unit** As a user I want to see the lecture details so that I can get more information about it
-  **Create users** As an admin or staff I want to add students, teachers and staff to the aweb site
-  **Create unit** As an admin or staff I want to creat unit to an existing cohort so that I can personalize it
-  **User profile** As a user I want to see other users profile so that I can see their details
-  **Edit profile** As a user I want to edit my profile so that I can update my password and my details
-  **Draggable calendar** As an admin or staff I want to organise the calendar so that it is updated with the real one
-  **Cohort overview** As a user I want to see the cohort details so that I can know who is participating
-  **Search units** As an admin or staff I want to search units so that I can find one faster
-  **Send emails** As an admin or staff I want to send and email to the created user so that he/she knows the password
-  **Upload** As a user I want to upload pictures to the specific cohort so that I can shear some material
-  **Send messages** As a user I want to send messages to the rest of the users so that I can comunicate wiht them in real time


## Backlog

Create curriculum:
- As an admin I want to creat curriculums for future courses

Edit curriculum: 
- As an admim I want to update a curriculum to fix errors and change content

Edit unit:
- As an admin or teacher I want to update unit to fix errors and change content

Delete unit:
- As an admin or teacher I want to delete unit in case the lecture gets obsolete

Calendar:
- save calendar and reuse it

Cohort overview: 
- edit fields

Picture recognision (Google Vision API - Test)

Events calendar

List web dev and UX/UI news

Create surveys

Material for the unit in every cohort

Hiring page (student card)

Pictures page of the cohort

Ironhack information

# Client

## Routes

- /login - login form
- /curriculums - curriculums list
- /curriculums/:id - curriculum detail
- /units/:id - unit detail
- /cohorts - cohorts list
- /cohorts/create - create form
- /cohorts/:id/calendar - cohort calendar
- /cohorts/:id/details - cohort details
- 404

## Pages

- Log in Page (anon only)
- Curriculums List Page (admin/staff only)
- Curriculum Detail Page (admin/staff only)
- Unit Detail Page (user only)
- Cohort Create (admin/staff? only)
- Cohorts List Page (admin/staff only)
- Cohort Calendar Page (user only)
- Cohort Detail Page (user only)
- 404 Page (public)

## Components

- Unit Card component
  - Input: unit: any
- Calendar component
  - Input: calendar: any

## IO


## Services

- Auth Service
  - auth.login(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
  
- Curriculum Service
  - curriculum.list()
  - curriculum.detail(id)
  
- Cohort Service
  - cohort.list()
  - cohort.detail(id)
  - cohort.create(data)
  
- Calendar Service ?? Dragula
  - calendar.dragstart()
  - calendar.moved()
  - calendar.dragend()
  - calendar.canceled()
  - calendar.callback()


# Server

## Models

User model

```
role - String // required & enum ['admin', 'staff', 'student']
email - String // required & unique
password - String // required
```

Curriculum model

```
units - [ObjectID<Unit>] // required
type - String // required & enum ['webdev', 'ux-ui']
```

Unit model

```
mandatory - Boolean // required
category - String // required & enum ['lessons', 'rituals', 'practice-&-reviews']
sub-category - String // required & enum ['lecture', 'research', 'code-along', 'demo', 'practice', 'review', 'de', 'stand-up', 'kick-off', 'activity', 'pp']
title - String // required
links - Array [] 
learningObjectives - String // required & ??
duration - Number // required
```

Calendar model

```
class-master - ObjectID<User> // required
title - String // required 
week - Number // required & enum ['1', '2', '3', '4', '5', '6', '7', '8', '9']
module - String // required & enum ['1', '2', '3']
days - Array [ObjectID<Unit>] 
startDate - Date // required
parkingLot - Array [ObjectID<Unit>]
adaptiveCurriculum - Array [ObjectID<Unit>]
cohort - ObjectID<Cohort> // required
```

Cohort model

```
teacher - ObjectID<User> 
TAs - [ObjectID<User>..] 
students - [ObjectID<User>..] 
title - String //
type - String // required & enum ['webdev', 'ux-ui']
startDate - Date // required
language - String // required & enum ['en', 'es']
nickName - String 
```


## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/login
  - body:
    - email
    - password
   (200) status code 
   
- POST /auth/logout
  - body: (empty)
  (204) status code 
  
- GET /curriculum
  - validation (404)
  - auth (401) admin / staff
  (200) status code 
  
- GET /curriculum/:id
  - validation (404) validId, exists?
  - auth (401) admin / staff

- GET /cohort
  - validation
  - auth (401) admin
  
- POST /cohort
  - validation requeired fields (422 Unprocessable Entity)
  - auth (401) admin / staff
  - body:
    - type
    - startDate
    - language
     (200) status code 
    
- POST /cohort/:id/edit
  - validation, valid inputs 422 Unprocessable Entity
  - auth (401) admin / staff
  - body:
    - teacher
    - TAs
    - students
    - nickName 
     (200) status code 
    
- GET /cohort/:id/details
  - validation validId
  - auth (401) user / not ano
   (200) status code 
  
- GET /cohort/:id/calendar
  - validation validId
  - auth (401) user / not ano
   (200) status code 
  
- POST /cohort/:id/calendar/edit
  - validation validId
  - auth (401) admin / staff
  - body:
    - unit
     (200) status code 
    


- GET /units/:id
  - validation
  - auth (401) user / not ano
   (200) status code 
  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/axelgar/Ironhack-client/)
[Server repository Link](https://github.com/axelgar/Ironhack-server)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
