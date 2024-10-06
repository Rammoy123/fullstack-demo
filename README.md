# Blog app

## About The Project
The objective of this project is to build a blogging platform where users can view and comment on other users' blogs, as well as manage (create, update, and delete) their own blogs.

###  Getting Started
 #### Prerequisite:
  * Node(v20.12.2) installed 
### Installation:
 * cloning the repo
 * Downloading the dependencies- npm install
 * run dev server- npm run start (backend)
 * run dev server- npm run start (frontend - Only implemented the basic folder structure and initiation with the sign in page)

### Technical choices
Since this project involves significant user interaction, API calls, and large-scale data manipulation, a Single Page Application (SPA) is the best choice. React is particularly well-suited for this due to its strengths in handling the mentioned criteria, including global state management with tools like Redux and Flux, efficient component state management, and dynamic page loading (using features like lazy and Suspense).

Regarding the blogging data, it involves handling large amounts of unstructured data, such as text and media, along with multiple read and write operations. Mongoose is ideal for this scenario due to its capability to manage such data effectively, which is why MongoDB was chosen as the database.


For the backend, Node.js was chosen because of its event-driven, non-blocking, and asynchronous nature, which allows it to handle high-concurrency operations efficiently. This makes it an excellent choice for applications with frequent read/write operations, such as a blogging platform. Node’s ability to handle I/O operations asynchronously ensures that the application remains responsive even under heavy load.

### Challenges
Firstly i build a roadmap of the total project scope. The roadmap includes about the design aspect of the frontend, features and needed API'S accordingly. Since the scope includes sign up, sign in, list of blog shown and managing, performing crud, i choose to build the backend first.  when i came almost at the end of the backend development, i found that i was facing mongodb schema related issue. The way i was instantiating and importing to use it was creating problem leading constantly discarding request from the sign up middleware. Since, it took almost above 1.5hr, i could not start the frontend dev too. 


