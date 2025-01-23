# User Management Dashboard

## Objective

A simple web application that allows users to view, add, edit, and delete user details from a mock backend API.

## Features

- Display a list of users with details such as ID, First Name, Last Name, Email, and Department.
- Add new users.
- Edit existing users.
- Delete users.
- Pagination for navigating through user lists.
- Client-side validation for user input.
- Responsive design.

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:


git clone https://github.com/Satwik-avs/user-management-dashboard.git

2. Navigate to the project directory:
cd user-management-dashboard

3.Install the dependencies:
npm install

4.Start the development server:
npm start

Open your browser and navigate to http://localhost:3000 to see the application in action.

Project Structure
src/
|-- components/
|   |-- UserList.js
|   |-- UserForm.js
|-- services/
|   |-- userService.js
|-- App.js
|-- index.js
|-- App.css

HOME PAGE 
![Home](https://github.com/Satwik-avs/user-management-dashboard/blob/074991b7fb42c92084250e0434399d827c8fdff6/home.png)

ADD FORM
![add-form](https://github.com/Satwik-avs/user-management-dashboard/blob/074991b7fb42c92084250e0434399d827c8fdff6/add.png)

EDIT FORM
![edit-form](https://github.com/Satwik-avs/user-management-dashboard/blob/074991b7fb42c92084250e0434399d827c8fdff6/edit.png)

Challenges Faced
1. Handling the components especically the user data. It is for me the first i have taken the third party and included the app so it is a new learning through this project 
2. I want the tables and forms to be aligned but the css has killed me for some time.
