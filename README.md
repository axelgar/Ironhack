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
- /users - list of users
- /user/create/:id - create form
- /user/settings - update form
- /user/edit - update form
- /chat - list messages
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
- Profile Page (user only)
- Profile Settings Page (user only)
- Profile Edit Page (user only)
- Chat Page (user only)
- 404 Page (public)

## Components

- cohort-calendar component
  - Input: cohort: any
- add-unit component
  - Inpunt: cohort: any
- arrow back component
- cohort-calendar-view component
  - Input: cohort: any
- cohort-drive component
  - Input: cohort: any
- cohort-overview component
  - Input: cohort: any
- loading component
- module-one-units component
- module-two-units component
- module-three-units component
  
## IO


## Services

- Auth Service
  - auth.login(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
  
- Curriculum Service
  - curriculum.list()
  - curriculum.getOne(id)
  
- Cohort Service
  - cohort.list()
  - cohort.addImage(cohort)
  - cohort.getCohort(id)
  - cohort.create(data)
  - cohort.delete (data)
  - cohort.shiftUnit (sourceDay, targetDay, id)

- Chat Service 
  - chat.joinRoom(data)
  - chat.newUserJoined()
  - userLeftRoom()
  - sendMessage(data)
  - newMessageRecived()
  - saveMessage(data)
  - getMessage()
  
- Unit Service
  - unit.list()
  - unit.getUnit(id)
  - unit.edit(unit)
  - unit.transfer(unit)
  - unit.unitCreate(unit)
  - unit.deleteUnit(id)
  
- User Service
  - user.find()
  - user.findProfile(id)
  - user.userCreate(user)
  - user.delete(data)
  - changePassword(data)
  - addProject(data)
  - deleteProject(id)


# Server

## Models

User model

```
role - String // required & enum ['admin', 'staff', 'student']
email - String // required & unique
password - String // required
firstName - String
lastName - String
description - String
profilePic - String // default
projects - [
  title - String
  presLink - String
  deployLink - String
  module - String // enum['M1', 'M2', 'M3']
]
linkedin - String
github - String
cohort - ObjectId<Cohort>
```

Curriculum model

```
units - [ObjectID<Unit>]
type - String // required & enum ['webdev', 'ux-ui']
```

Unit model

```
mandatory - Boolean // required
category - String // required & enum ['lessons', 'rituals', 'practice-&-reviews', 'break']
sub-category - String // required & enum ['lecture', 'research', 'code-along', 'demo', 'practice', 'review', 'de', 'stand-up', , 'kick-off', 'activity', 'P.P.', 'D.E.']
title - String // required
links - Array [] 
learningObjectives - String // required & enum ['1', '2', '3']
links - Array
learningObjectives - String // enum []
duration - Number // required
description - String
day - ObjectId<Unit>
position - Number
```

Calendar model

```
class-master - ObjectID<User> // ref:'User'
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
TAs - [ObjectID<User>] 
students - [ObjectID<User>] 
title - String //
type - String // required & enum ['webdev', 'ux-ui']
location - String // required enum['bcn', ...]
startDate - Date // required
days - ObjectId<Day>
adaptiveCurriculum - ObjectId<Unit>
parkingLot - [Unit.schema]
language - String // required & enum ['en', 'es']
nickName - String 
image: []
```

Day model

```
date - Date // required
unit - [Unit.schema]
```
Message model

```
message - String // required
room - String // required
user - [User.schema]
picture - String
```


## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/login
  - email validation (404) 
  - bycrypt validation (404)
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
  
- POST /cohort/create
  - validation requeired fields (422 Unprocessable Entity)
  - auth (401) admin / staff
  - body:
    - type
    - location
    - language
    - startDate
    - teacher
     (200) status code 
    
- GET /cohort/:id
  - validation validId
  - auth (401) user / not ano
   (200) status code 
     
 - POST /cohort/:id/drive
  - validation validId
  - auth (401) admin / staff
  (200) status code 
  
- DELETE /cohort/delete/:id
  - validation validId
  - auth (401) admin / staff
  (200) status code 
  
- GET /units
  - auth (401) user / not ano
   (200) status code
   
- GET /units/:id
  - validation
  - auth (401) user / not ano
   (200) status code
   
- PUT /units/transfer/:id
  - auth (401) user / not ano
  - validation validId
  (200) status code
  
- PUT /units/:id
  - auth (401) user / not ano
  - validation validId
  (200) status code
  
- POST /units/unit-create

-GET /chat
  - auth (401) user / not ano
  (200) status code
  
-POST /chat/create-message
  - auth (401) user / not ano
    - body:
      - room
      - message
      - user
      - picture 
  (200) status code

## Links

### Trello/Kanban

Physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/axelgar/Ironhack-client/)
[Server repository Link](https://github.com/axelgar/Ironhack-server)

[Deploy Link](https://ironcampus.herokuapp.com)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/13E2TllxYrJ4FxTDN4Rbi7GmIN0rmTHuCFUZdKCLylf8/edit?usp=sharing)
