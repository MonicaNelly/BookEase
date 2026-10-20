# BookEase – Service Booking and Management System

## 1. Project Overview

**BookEase** is a web-based Service Booking and Management System designed to make booking services easier and more organised.

The system is being developed to allow customers to explore available services, submit booking requests, and manage their bookings. Administrators will eventually be able to manage services, customers, and bookings through the system.

This project is being developed as a full-stack application to practise and demonstrate frontend development, backend API development, database design, and software development skills.

**Project status:** In Development

## 2. Project Objectives

The main objectives of BookEase are to:

- Provide a simple and user-friendly service booking experience.
- Display available services and their starting prices.
- Allow customers to submit booking information.
- Develop a backend API using C# and ASP.NET Core.
- Integrate a database to store services, customers, and bookings.
- Implement booking management and administration features.
- Practise full-stack development, testing, and version control.

## 3. Technologies Used

### Frontend

- **HTML5** – Structures the website pages and booking form.
- **CSS3** – Styles the website, service cards, navigation, and booking form.
- **JavaScript** – Adds client-side interactivity and form submission behaviour.

### Backend

- **C#** – The programming language used for the backend.
- **ASP.NET Core Web API** – The framework being used to build API endpoints.
- **.NET SDK 10.0.401** – Installed development SDK used to create the API project.

### Database

- **SQL Server** – Planned database technology for storing application data.

### Development Tools

- Visual Studio Code
- Git and GitHub
- Web browser
- .NET CLI
- Postman – Planned for API testing as the backend develops.

## 4. Current Features

The following features have been implemented in the initial frontend:

- Home page with a navigation menu.
- Hero section introducing BookEase.
- Services section on the home page.
- About BookEase section.
- Contact section.
- Separate services page.
- Service cards for Hair Services, Beauty Services, Cleaning Services, and IT Support.
- Display of starting prices for services.
- Booking links on service cards.
- Booking form containing customer details, service selection, date, time, and a message field.
- Required-field validation using HTML form attributes.
- Basic JavaScript form submission handling.
- Success alert after submitting the form, followed by a form reset.
- Responsive CSS styling for smaller screens.
- Navigation links between the website pages.

**Important:** The current booking form uses client-side JavaScript. Bookings are not yet stored in a database, and the frontend has not yet been connected to a working BookEase API.

## 5. Frontend Design

The website uses a simple, clean design with:

- A dark header and footer.
- A light background.
- Service cards with rounded corners and subtle shadows.
- Buttons with hover effects.
- Form fields with focus styling.
- A responsive layout for smaller screens.

The CSS is maintained in a shared `style.css` file used by the frontend pages.

## 6. Backend Development

The backend project was created using the .NET command-line interface.

```bash
cd backend
dotnet new webapi -n BookEase.API
cd BookEase.API
```

The project was created successfully, and the installed .NET SDK version was confirmed as `10.0.401`.

### Current Backend Setup

The generated `Program.cs` file currently contains the default ASP.NET Core Web API template, including:

- Application configuration using `WebApplication.CreateBuilder(args)`.
- OpenAPI service registration.
- Application construction using `builder.Build()`.
- HTTPS redirection.
- A sample `GET /weatherforecast` endpoint.
- The `app.Run()` instruction that starts the application.
- A `WeatherForecast` record used by the sample endpoint.

The weather forecast endpoint is still template code and will be replaced as development progresses.

### Planned Backend Features

- Service API endpoints.
- Booking API endpoints.
- Request validation.
- Database integration.
- Customer registration and login.
- Authentication and authorisation.
- Booking status management.
- Administrative operations.

## 7. Planned Database Design

The planned database will include the following main entities:

### Users

Stores customer and administrator information, including user identifiers, names, email addresses, and securely managed authentication information.

### Services

Stores service identifiers, service names, descriptions, prices, and availability information.

### Bookings

Stores booking identifiers, customer references, service references, booking dates and times, additional messages, and booking statuses.

Relationships, constraints, and database tables will be finalised during database development.

## 8. Planned System Features

The following features are planned but have not yet been fully implemented:

- Customer registration and login.
- Role-based access for customers and administrators.
- Viewing and searching services.
- Creating and managing bookings.
- Viewing booking history.
- Updating booking statuses.
- Administrative dashboard.
- Managing services and customers.
- Database persistence.
- Frontend integration with the backend API.
- Automated and manual testing.

## 9. Project Structure

The intended project structure is:

```text
BookEase/
├── frontend/
│   ├── index.html
│   ├── services.html
│   ├── booking.html
│   ├── style.css
│   └── script.js
├── backend/
│   └── BookEase.API/
│       ├── Program.cs
│       ├── BookEase.API.csproj
│       ├── appsettings.json
│       └── Properties/
├── database/
├── documentation/
└── README.md
```

Additional files and folders may be generated by .NET as development continues.

## 10. Running the Current Frontend

1. Open the `frontend` folder.
2. Open `index.html` in a web browser, or use a local development server.
3. Navigate to the Services page.
4. Open the booking form using a booking button.

The frontend currently demonstrates the website layout and basic form interaction. It is not yet connected to a persistent database.

## 11. Running the Backend

Open a terminal in the `backend/BookEase.API` directory and run:

```bash
dotnet restore
dotnet run
```

The first command restores the project's dependencies. The second starts the ASP.NET Core application.

The current backend still contains the default weather forecast endpoint. Follow the application output for the local URL and HTTPS development certificate instructions.

## 12. Development Roadmap

1. Complete and refine the frontend pages.
2. Learn and configure the ASP.NET Core Web API.
3. Replace the default weather forecast example with BookEase endpoints.
4. Design the database and create the required tables.
5. Connect the API to SQL Server.
6. Implement service and booking operations.
7. Connect the frontend to the API.
8. Add authentication and role-based access.
9. Test the application and validate booking workflows.
10. Improve documentation and prepare the project for deployment.

## 13. Learning Outcomes

Through this project, I am developing practical skills in:

- HTML, CSS, and JavaScript.
- C# programming.
- ASP.NET Core Web API development.
- REST API concepts and HTTP methods.
- Database design and SQL.
- Frontend and backend integration.
- Form validation and application logic.
- Debugging and problem-solving.
- Git and GitHub version control.
- Building a full-stack application incrementally.

## 14. Project Author

**Monica  Ndlovu**

GitHub: [MonicaNelly](https://github.com/MonicaNelly)

---

BookEase is an ongoing learning and portfolio project. Features described as planned or in development will be updated as implementation progresses.
