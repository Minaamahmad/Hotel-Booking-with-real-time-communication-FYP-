# Project Documentation

**Project Title**: Prime Booking (Hotel Booking with Real-time Communication)
**Team Name and Number**: [Your Team Name and Number]
**Team Members**: [Your Team Members]

**Version:** 1.0
**Date:** 05/02/2026

## Table of Contents

- [Chapter 1 Introduction](#chapter-1-introduction)
- [Chapter 2 Software Requirements Specification](#chapter-2-software-requirements-specification)
- [Chapter 3 System Design and Architecture](#chapter-3-system-design-and-architecture)
- [Chapter 4 Implementation and Testing](#chapter-4-implementation-and-testing)

---

## Chapter 1 Introduction

### 1.1 Purpose
The purpose of this document is to provide a complete Software Requirements Specification (SRS) for the Prime Booking platform. The intended audience includes the project supervisors at The Islamia University of Bahawalpur, potential developers for future iterations, and stakeholders interested in the system's functional capabilities.

### 1.2 Scope
- **Product Name**: Prime Booking.
- **Objectives**: To streamline the hotel reservation process by providing a centralized platform for owners and customers.
- **What it does**: Facilitates hotel listings, real-time room availability checks, role-based management, and instant messaging.
- **What it does not do**: It does not process physical keys or handle on-site check-in logistics.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification.
- **MERN**: MongoDB, Express.js, React.js, Node.js.
- **Socket.io**: A library enabling real-time, bidirectional communication between web clients and servers.
- **JWT**: JSON Web Token used for secure authorization.

### 1.4 References
The following documents and standards are referenced throughout this SRS:
1. IEEE 830-1998: IEEE Recommended Practice for Software Requirements Specifications.
2. RFC 7519: JSON Web Token (JWT) Standard, Auth0 Organization, 2015.
3. MERN Stack Documentation: MongoDB, Express, React, and Node.js official technical guides, 2024.
4. Auth0 / Google OAuth API Documentation: Integration guides for OAuth 2.0 and OpenID Connect.

### 1.5 Overview
This SRS is organized to provide clarity for both stakeholders and developers:
- **Chapter 1 (Introduction)**: Provides the high-level context, project scope, and external interfaces.
- **Chapter 2 (Requirements)**: Detailed functional and non-functional requirements. Customers should focus on Section 2.2 and 2.3 to verify desired features.
- **Chapter 3 (System Design)**: Architectural breakdown and data dictionary intended for Developers.
- **Chapter 4 (Implementation)**: Evidence of the built system, including screen images and test results.

### 1.6 Product Perspective
Prime Booking is an independent, self-contained multi-vendor hotel management and reservation system. While it functions as a standalone platform, it exists within a larger ecosystem of cloud-based services that provide the necessary infrastructure for identity and data persistence.
In the current marketplace, Prime Booking is similar to platforms like Booking.com or Airbnb in its multi-vendor approach, allowing different hotel managers to list their own properties. However, it differs by focusing on a streamlined, real-time communication channel between managers and customers via integrated WebSockets, reducing the friction often found in traditional email-based booking confirmation systems.

#### 1.6.1 System Interfaces
The software must interact with the following external systems to fulfill its requirements:
- **Auth0 / Google Identity Platform**: The system interfaces with Google OAuth to handle secure user authentication. The software uses the OpenID Connect protocol to verify user identities and retrieve role-based access tokens.
- **MongoDB Atlas**: The application interfaces with this cloud-hosted database for all persistent storage. Communication is established through the Mongoose Object Data Modeling (ODM) library.

#### 1.6.2 Interfaces
The system interacts with users through a responsive Web Graphic User Interface (GUI):
- **User Interface**: The GUI is built using React.js 19+ and Vite to provide a dynamic, single-page application experience.
- **Optimization**: To optimize the experience for the general student and traveler population, the interface utilizes a mobile-first design approach to ensure usability across various screen sizes.

#### 1.6.3 Hardware Interfaces
The system has no hardware interface requirements, as it is a web-based application that does not directly control physical devices.

#### 1.6.4 Software Interfaces
The following software products are required for the system to operate:
- **Node.js (v18.0+)**: The runtime environment for the backend server.
- **Mongoose ODM**: Used for schema-based modeling of application data and communication with MongoDB.
- **Express.js**: The web framework used to provide the RESTful API.
- **React.js**: Front-end framework for rendering the UI component tree.

#### 1.6.5 Communications Interfaces
The system manages communication through two primary protocols:
- **HTTPS/REST**: Used for all standard request-response cycles between the client and the API.
- **WebSockets (Socket.io)**: A custom real-time protocol implementation used to facilitate instantaneous messaging between hotel managers and customers.

#### 1.6.6 Memory Constraints
To ensure compatibility with the target market's hardware, the design footprint of the frontend bundle should not exceed 256MB of browser memory during active use.

#### 1.6.7 Operations
- **Interactive Operations**: The system is designed for 24/7 interactive operation to accommodate global users.
- **Backup and Recovery**: Data processing functions include daily automated backups managed by the cloud database provider to ensure recovery with minimal data loss in case of server failure.

#### 1.6.8 Site Adaptation Requirements
The application is designed to be environment-agnostic; however, it requires the population of specific environment variables (API keys and Database connection strings in `.env`) prior to deployment to adapt the software to a particular hosting installation.

### 1.7 Product Functions
Prime Booking provides three primary functional pillars:
1. **User Management**: Secure registration and role-based login (Admin, Manager/Owner, Customer/Guest).
2. **Property Management**: Interface for Owners to list hotels, manage room availability, and update pricing.
3. **Communication & Booking**: A real-time chat system for inquiries and a structured booking workflow for guests.

### 1.8 User Characteristics
The system targets three distinct user groups:
1. **Guests/Customers**: General public with basic internet proficiency; requires a simple, intuitive UI.
2. **Hotel Owners/Managers**: Business users requiring efficient data entry tools and real-time notification support.
3. **Admins**: Technical users or site moderators who oversee platform integrity and user disputes.

### 1.9 Constraints
1. **Security**: Must use JWT for secure session handling.
2. **Language**: The entire application shall be developed using JavaScript to ensure stack consistency across the MERN stack.
3. **Regulatory**: The system must comply with basic data privacy standards regarding user contact information.

### 1.10 Assumptions and Dependencies
- **Connectivity**: It is assumed users have a stable internet connection to access the cloud-hosted database.
- **External APIs**: The system depends on the 100% availability of Google OAuth for user authentication and MongoDB Atlas for database operations.

### 1.11 Apportioning of Requirements
- **Version 1.0 (Current)**: Core booking, multi-vendor support, room management, and real-time chat.
- **Future Versions**: Integration of a third-party payment gateway (e.g., Stripe) and automated email confirmation receipts.

---

## Chapter 2 Software Requirements Specification

### 2.1 Specific Requirements

#### 2.1.1 Authentication & Authorization
1. The system shall provide a "Login with Google" button on the landing page that initiates an OAuth 2.0 flow.
2. Upon successful authentication, the system shall assign a JSON Web Token (JWT) to the user session containing the user's unique identifier and role (Guest, Owner, or Admin).

#### 2.1.2 Property and Room Management
1. The system shall allow a Hotel Owner to create a new hotel listing by providing a name, physical address, description, and at least one high-resolution image.
2. The system shall enable Owners to add rooms to a hotel listing, specifying the Room Type (e.g., Single, Double, Suite, Deluxe), Price per Night, and total stock.
3. The system shall provide a functional capability that removes a room listing or hotel.

#### 2.1.3 Booking and Search Functionality
1. The system shall provide a search bar that filters hotel listings based on inputs like location.
2. The system shall prevent a customer from booking a room if the selected date range overlaps with an existing stock depletion for that specific room ID in the database.
3. The system shall generate a unique Booking ID and store the transaction details, including user ID, room ID, total price, and date range (Check-in/Check-out), upon completion of a reservation.

#### 2.1.4 Real-Time Communication
1. The system shall initialize a Socket.io connection when a user opens the "Chat" interface on a specific hotel listing page.
2. The system shall deliver messages between the Guest and the Hotel Owner in real-time, with a latency of less than 1 second under normal network conditions.
3. The system shall store chat history in the MongoDB "Messages" collection, identifying each message by sender ID, receiver ID, hotel ID, booking ID, and content.

#### 2.1.5 Administrative Controls
1. The system should allow an Administrator to view a list of all registered users and their current activity status.
2. The system should provide an Admin interface to "Flag" or "Deactivate" an Owner Account.

### 2.2 External Interfaces
- **Login Credentials (Input)**: Google account details provided via OAuth 2.0. Source: External User. Format: JSON token containing email, name. Timing: Required at system entry.
- **Hotel Metadata (Input)**: Details for a new property listing. Source: Hotel Owner. Fields: hotelName (String), address (String), images (Array of URLs).
- **Booking Confirmation (Output)**: Success response displayed after a reservation. Destination: User UI (Screen). Format: React Toast notification or Modal.

### 2.3 Functions
The system shall perform validity checks on all inputs via Mongoose schemas.
The system shall enforce role-based access control (Guest vs. Owner) before fulfilling API requests.
The system shall encrypt passwords (if used) using Bcrypt and verify JWT signatures for every protected route.

### 2.4 Performance Requirements
- 95% of the transactions (booking creation, message sending) shall be processed in less than 1 second.
- The system should efficiently serve images using optimized formats or lazy loading in the React frontend.
- The UI should remain responsive (60fps) during data fetching operations.

### 2.5 Logical Database Requirements
The database relies on MongoDB. Information is structured into collections: Users, Hotels, Rooms, Bookings, and Messages. The system requires relational integrity enforced through Mongoose `ObjectId` references. 
- *Data Retention*: User data and booking history must be retained indefinitely unless manually deleted by an Admin.
- *Data Entities*: Outlined further in the Data Dictionary (Chapter 3).

### 2.6 Design Constraints
#### 2.6.1 Standards Compliance
- **Data Naming**: Code must follow camelCase for variables and PascalCase for React components and models.
- **RESTful API**: Endpoints must adhere to standard REST verbs (GET, POST, PUT, DELETE) and resource-based URL structures (`/v1/hotels`, `/v1/bookings`).

### 2.7 Software System Attributes
#### 2.7.1 Reliability
The system must not lose confirmed booking data under any standard operational failure. Mongoose validation ensures no malformed data is written.

#### 2.7.2 Availability
The system shall allow users to restart the application after failure with minimal loss of state by leveraging JWT stored securely in cookies or local storage. The backend API is stateless.

#### 2.7.3 Security
The system protects against unauthorized access by requiring JWT verification for all user actions beyond browsing. Hotel and room modification routes are strictly restricted to users with the "Owner" role. 

#### 2.7.4 Maintainability
The application architecture is cleanly separated between `client` (React) and `server` (Express), allowing independent scaling and maintenance. The modular component structure in React facilitates easy updates.

#### 2.7.5 Portability
The application uses Node.js and React, making it OS-agnostic. It can be easily ported to any host machine capable of running Node.js (e.g., Heroku, Vercel, AWS).

---

## Chapter 3 System Design and Architecture

### 3.1 Architectural Design
Prime Booking follows a standard **Client-Server Architecture** utilizing the **MERN Stack**. 
- **Presentation Layer (Frontend)**: Developed in React.js. It handles the UI, routing (React Router), state management, and real-time socket connections.
- **Application Layer (Backend API)**: Developed in Node.js and Express.js. It handles business logic, JWT authentication, and serves REST API endpoints.
- **Data Layer**: MongoDB, accessed via Mongoose ODM, acts as the persistent data store.
- **Real-time Engine**: Socket.io facilitates bidirectional communication for the chat feature.

### 3.2 Decomposition Description
The system is decomposed into:
- **Frontend Subsystems**:
  - `Pages`: Container components like `Home`, `HotelDetails`, `OwnerDashboard`.
  - `Components`: Reusable UI elements (`Navbar`, `HotelCard`, `RoomCard`).
  - `Context/Hooks`: Manages global state (`AuthContext`).
  - `Services`: Handles API calls via Axios.
- **Backend Subsystems**:
  - `Controllers`: Functions that handle request logic (`hotelController`, `bookingController`).
  - `Routes`: Express router definitions.
  - `Models`: Mongoose schema definitions.
  - `Middleware`: Authentication and validation intercepts.

### 3.3 Design Rationale
The MERN stack was chosen because it allows for a unified JavaScript ecosystem, reducing context switching for developers. React provides a highly responsive SPA (Single Page Application) experience, which is crucial for modern web applications. MongoDB's document-based nature perfectly fits the hierarchical data of Hotels -> Rooms.

### 3.4 Data Description
Data is stored as BSON documents in MongoDB. Relationships are maintained using ObjectIds (e.g., a `Room` document references its parent `Hotel` document via `hotel_id`). This allows for efficient querying through `populate()` methods.

### 3.5 Data Dictionary

**1. User (`Users.js`)**
- `_id`: ObjectId
- `name`: String (Required)
- `email`: String (Required)
- `role`: String (Enum: "Guest", "Owner", "Admin", null)
- `provider`: String (Enum: "google", "facebook")
- `provider_id`: String (Unique)
- `avatar`: String
- `timestamps`: createdAt, updatedAt

**2. Hotel (`Hotels.js`)**
- `_id`: ObjectId
- `owner_id`: ObjectId (Ref: User)
- `name`: String (Required)
- `description`: String
- `location`: String (Required)
- `images`: Array of Strings
- `amenities`: Array of Strings
- `popularity`: Number
- `timestamps`: createdAt, updatedAt

**3. Room (`Rooms.js`)**
- `_id`: ObjectId
- `hotel_id`: ObjectId (Ref: Hotel)
- `type`: String (Enum: "Single", "Double", "Suite", "Deluxe")
- `price_per_night`: Number
- `total_stock`: Number
- `images`: Array of Strings
- `timestamps`: createdAt, updatedAt

**4. Booking (`Bookings.js`)**
- `_id`: ObjectId
- `user_id`: ObjectId (Ref: User)
- `room_id`: ObjectId (Ref: Room)
- `hotel_id`: ObjectId (Ref: Hotel)
- `check_in`: Date
- `check_out`: Date
- `status`: String (Enum: "Pending", "Confirmed", "CheckedIn", "CheckedOut", "Cancelled")
- `total_price`: Number
- `timestamps`: createdAt, updatedAt

**5. Message (`Messages.js`)**
- `_id`: ObjectId
- `sender_id`: ObjectId (Ref: User)
- `receiver_id`: ObjectId (Ref: User)
- `hotel_id`: ObjectId (Ref: Hotel)
- `booking_id`: ObjectId (Ref: Booking)
- `content`: String
- `timestamps`: createdAt, updatedAt

### 3.6 COMPONENT DESIGN
Each backend function follows a procedural model: 
1. **Validate Input**: Check required fields in `req.body` or `req.params`.
2. **Authorize**: Verify JWT and check user roles via middleware.
3. **Database Query**: Execute Mongoose operations (`find`, `create`, `findByIdAndUpdate`).
4. **Format Output**: Return JSON response with appropriate HTTP status code (200, 201, 400, 404, 500).

---

## Chapter 4 Implementation and Testing

### 4.1 Code Modules
The application is strictly modular:
- **React Components**: Each UI piece (e.g., `RoomCard.jsx`) is isolated, receiving data via `props`.
- **Express Routes**: Segmented by domain (`/routes/hotels.js`, `/routes/bookings.js`).
- **Styles**: Component-specific CSS ensures no global style leakage.

### 4.2 Database Connectivity
Database connectivity is managed centrally in the backend. The Node.js server establishes a connection to MongoDB Atlas upon startup using `mongoose.connect(process.env.MONGO_URI)`. 

### 4.3 Overview of User Interface
The UI is built with a mobile-first philosophy. 
- **Guest View**: The home page features a search bar and a grid of available hotels. Selecting a hotel navigates to a details page showing available rooms. Users can select dates, view the calculated total price, and confirm a booking.
- **Owner View**: Owners have access to a Dashboard where they can view total bookings, add new hotel listings via a form, and manage the room inventory of their properties.

### 4.4 Screen Images
*(Insert screenshots of your application here. Recommended views: Home Page, Hotel Details Page, Owner Dashboard, Chat Interface)*

### 4.5 Screen Objects and Actions (Guest Perspective)
This section details the interactive elements available to guests across the platform:

- **Navbar Links & Profile Menu**: Dynamic navigation to toggle between "Home", "My Bookings", and "Login/Logout" depending on the user's authentication state.
- **Search Bar (Home Page)**: Captures location or hotel name input, dynamically filtering the displayed hotel properties. Features a "Clear" button to reset results.
- **Hotel Cards (Home Page)**: Clickable elements that route the user to the detailed view of a specific property (`/hotel/:id`).
- **Date Pickers (Hotel Details Page)**: Calendar inputs allowing guests to select Check-in and Check-out dates. They dynamically calculate the total number of nights and disable past dates.
- **Room Selection Cards (Hotel Details Page)**: Selectable cards to pick a specific room type from the available inventory. Selection is disabled if the room's stock is unavailable.
- **"Reserve now" Button (Hotel Details Page)**: Calculates the total price based on selected dates and room, initiates the booking API request, and redirects the user to "My Bookings" upon success.
- **Booking Status Filters (My Bookings Page)**: Interactive tabs (All, Pending, Confirmed) to filter the display of the guest's past and upcoming reservations.
- **"Cancel Stay" Button (My Bookings Page)**: Initiates a cancellation request for a specific booking. Includes a confirmation prompt window to prevent accidental cancellations.
- **"Chat Owner" Button (My Bookings Page)**: Navigates the guest to the real-time chat interface initialized with the relevant booking and owner context.
- **Message Input & Send Button (Chat Interface)**: Captures text from the guest and emits a `sendMessage` event via Socket.io to deliver the message instantly to the hotel owner.

### 4.6 Test Cases
1. **User Authentication Test**:
   - *Action*: Click 'Login with Google'.
   - *Expected Result*: User is redirected to OAuth, upon success, redirected back to Home with a valid JWT.
2. **Create Hotel Test (Owner)**:
   - *Action*: Fill out the 'Add Hotel' form with valid data and submit.
   - *Expected Result*: Hotel is added to the database and appears in the Owner's property list.
3. **Room Booking Test (Guest)**:
   - *Action*: Select a date range and click 'Book Room' on a valid hotel.
   - *Expected Result*: A new booking record is created with "Pending" status, and the user is notified of success.
4. **Role Authorization Test**:
   - *Action*: Guest attempts to navigate to `/owner-dashboard`.
   - *Expected Result*: The application redirects the user to the Home page or displays an Unauthorized error.
