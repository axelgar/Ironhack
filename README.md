# Ironhack Client

## Description

Virtual Campus for students of Ironhack with calendar as the main feature.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Login:** As a user I can login to the platform so that I can interact with the web site
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add cohort** As an admin I can add cohorts so that I can organise the students
-  **Details cohort** As user I want to see the cohort details so that I can know who participate in the cohort
-  **List cohorts** As an admin or staff I want to see the cohorts so that I can choose on
-  **Cohort calendar** As a user I want to see the calendar so that I can know what and when are the unit
-  **Update calendar** As an admin or staff I want to update the calendar so that I can organise the unit
-  **List curriculums** As an admin or staff I want to see the curriculums so that I choose one
-  **Details curriculum** As an admin or staff I want to see the curriculum details so that I can choose one
-  **Details unit** As a user I want to see the lecture details so that I can get more information about it


## Backlog

Create users: 
- As an admin I want to add students, teachers and staff to the aweb site

Create curriculum:
- As an admin I want to creat curriculums for future courses

Edit curriculum: 
- As an admim I want to update a curriculum to fix errors and change content

Create unit: 
- As an admin or teacher I want to creat unit to an existing curriculum

Edit unit:
- As an admin or teacher I want to update unit to fix errors and change content

Delete unit:
- As an admin or teacher I want to delete unit in case the lecture gets obsolete

User profile:
- see own and other users profiles
- list the projects

Edit profile: 
- as a user I want to upload img and content to my profile
- as a user I want to change my password

Calendar:
- limit accesability for students
- edit fields
- save calendar and reuse it

Cohort overview: 
- list of all the projects
- edit fields

Search unit:
- as a user I want to search unit by category and subcategory so that I can find specific unit faster

Chat

Picture recognision (Google Vision API - Test)

Events calendar

Upload and share documents

List web dev and UX/UI news

Create surveys

Material for the unit in every cohort

Hiring page (student card)

Pictures page of the cohort

Ironhack information

Emails

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
modules - [ObjectID<Unit>] // required
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
- POST /auth/logout
  - body: (empty)
  
  
- GET /curriculum
  - validation
  - auth
- GET /curriculum/:id
  - validation
  - auth

- GET /cohort
  - validation
  - auth
- POST /cohort
  - validation
  - auth
  - body:
    - type
    - startDate
    - language
- POST /cohort/:id/edit
  - validation
  - auth
  - body:
    - teacher
    - TAs
    - students
    - nickName 
- GET /cohort/:id/details
  - validation
  - auth
- GET /cohort/:id/calendar
  - validation
  - auth
- POST /cohort/:id/calendar/edit
  - validation
  - auth
  - body:
    - unit


- GET /units/:id
  - validation
  - auth
  

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
