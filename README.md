# Employee_Review_System

The Employee Review System is a web application designed to facilitate performance reviews and feedback management within an organization. It provides functionalities for both administrators and employees to manage performance reviews, submit feedback, and perform other related tasks.

Features
Admin View:

    1. Add/Remove/Update/View Employees: Admins can add, remove, update, and view employee profiles.
    2. Add/Update/View Performance Reviews: Admins can create, modify, and view performance reviews for employees.
    3. Assign Employees to Reviews: Admins can assign employees to participate in another employee's performance review.
Employee View:

   1. List of Performance Reviews Requiring Feedback: Employees can view a list of performance reviews that require their feedback.
   2. Submit Feedback: Employees can submit feedback for performance reviews they are involved in.

Authentication:
    
    Single Login for Admin and Employee: Both admins and employees use the same login page to access the system.

Admin Privileges: Only admins have the authority to register new employees and assign admin roles.

**Setup Instructions**
    To set up the Employee Review System on your local machine, follow these steps:

1. Clone Repository: Clone this repository to your local machine
2. Install Dependencies : npm i
3. Set Environment Variables: Create a .env file in the root directory and configure environment variables such as database connection string, session secret and port.
4. Start the Server: Start the server by running the following command : node index.js
5. Access the Application: Open a web browser and navigate to http://localhost:<port> to access the Employee Review System. You should be directed to the login page where you can log in with your credentials.

My deployment: https://employee-review-system-1-ni2y.onrender.com
