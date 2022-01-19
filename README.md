# MyCalendar

This is a Calendar application in which users can keep appointments with their company’s partners.

## Project Architecture

The project is divided into 2 sub-projects: Frontend & Backend.

The frontend is a **Reactjs** project representing the application’s client side. The backend is a **Node.js** project representing the application’s server side. Both of them are syntactically handled using the **TypeScript** language. We used **GraphQL** to establish http request-response between the client and the server.

## Database Design

We made a **relational database** schema, but the data is stored on a cloud **non-relational** database (i.e., SGBD): MongoDB Atlas. Data is available online, so no need to create dummy data, nor to establish local connection with an SGBD.

The database’s schema contains 8 tables:

- **Company**: representing a company.
- **User**: representing a user that works for a company.
- **Partner**: a partner to a company.
- **TimeSlot**: representing a timeslot with a start date (i.e., an hour).
- **Partnership**: a relational table representing the relation between Partner and Company tables.
- **Room**: holding all available rooms. Note that every room is allocated to 1 and only one company.
- **Appointment**: an appointment represents the couple TimeSlot x Room; in other words, to make an appointment, we need a time (i.e., timeslot) with a place (i.e., room).
- **Reservation**: a relational table representing the ternary relation between User, Partner and Company tables. It represents a reservation created by a user, to meet a partner at the specific time and in the specific room (i.e., an appointment).

you will ask yourself the following question:

> Appointment table should not be merged into the Reservation table ? Wasn't it simpler to have one table, Reservation, holding it across from the User & the partner, the room & the timeslot ?

The reason is that not all appointments can be available, for example, we can imagine that, for some reasons, a reservation at “12:30 PM” at the room “ROOM_1” is not allowed! That’s why we need to dissociate the two tables.

## Current Futures

The current version of the application (1.0.0) gives the ability to:

1. Visualize current users, and their company coworkers, reservations.
2. Add new reservations
3. Delete reservations.

## Unit Tests

On the server side, we made some unit tests using jest. We showed how to test unit functions by mocking their dependented functions.

## Install & Run the Application

Before diving into the steps that help run locally the application, please note that:

1. There are **two** package.json folders, one for the frontend project, another one for the entire application (in the future, it will be good to merge both folders).
2. Backend should be built. The script **build-server** can handle this, it is located in the main package.json file.
3. Backend is hosted on port **5000**; Frontend is hosted on port **3000**.
4. Client and server are linked together using **concurrently**.

The following are steps and command line to get the development environment set and running:

1. Fork the project.
2. Initialize a git project into your project.
3. Install dependencies:
   - In the root of your project, run:
   ```
    npm install
   ```
   - In the frontend project, run:
   ```
    npm install
   ```
4. Build backend: run the build-server script:
   ```
   npm run build-server
   ```
5. Launch the application using the script **dev**. This script will start both server & client:
   ```
   npm run dev
   ```

## How to Use the Application

After launching the application, a **first user interface** (i.e., _UI_) will be shown containing the _compagnies_ existing into the database. You should _select your’s_.

Once a company is selected, a **2nd UI** will be shown containing the selected company’s _users_. You should _select one_ of them. You should then _enter the password_ (**ask us to send you the dev password**).

If your login request is accepted, a **3rd UI** will be shown containing your calendar. Right there where you will be able to _manage_ your reservations and to see your coworkers' reservations:

1. Your reservations are in Red cases, your coworkers reservations are in green cases.

2. To **create a new reservation**, you should click on an _available_ appointment (i.e., the couple TimeSlot x Room), then _select your partner_ and hit the _Create_ button.

3. To **delete a reservation**, you should first be **the owner** of the reservation, if so, hit on the reservation and then click the _Delete_ button.

Unfortunately, the modify reservation feature is not yet done, BUT, be smart :wink: by deleting the reservation that you need to modify it, and then recreate it with the hoped modification.
