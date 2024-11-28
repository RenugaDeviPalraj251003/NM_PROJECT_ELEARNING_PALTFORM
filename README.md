# **Online Learning Platform Using MERN**

### 🚀 **Overview**
An intuitive and scalable e-learning platform designed to deliver online education efficiently. This platform enables students, instructors, and administrators to interact seamlessly while ensuring secure transactions, responsive design, and modular architecture.

---

## 🌟 **Features**
- 📚 **Course Management**: Instructors can create, manage, and publish courses.
- 🔐 **Secure Authentication**: User accounts are secured with JWT-based authentication.
- 💳 **Payment Gateway**: Integrated Razorpay for safe and reliable payments.
- 🎯 **User Roles**:
  - **Admin**: Manages users and courses.
  - **Instructor**: Creates and monitors course progress.
  - **Student**: Enrolls in courses and accesses learning materials.
- 📊 **Dynamic Dashboard**: Personalized dashboards for each role.
- 🔄 **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- 📩 **Email Notifications**: Automated emails for payments and assignments.

---

## 🖥️ **Demo**
🌐 [https://drive.google.com/file/d/1h87O5Lr_WDomdKh2RwsJG3Yn10Nljn6O/view?usp=sharing](#)  


---

## 🛠️ **Technologies Used**

### **Frontend**
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- React Router for navigation
- Axios for API integration

### **Backend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- JWT for authentication
- Bcrypt for password hashing

### **Database**
- [MongoDB](https://www.mongodb.com/)
- Mongoose ODM for schema modeling

### **Other Integrations**
- [Razorpay](https://razorpay.com/) for payment gateway
- Nodemailer for email notifications

---

## 🏗️ **Architecture**

### **System Architecture**
Follows a client-server model:
1. **Frontend** communicates with the backend via RESTful APIs.
2. **Backend** processes requests and communicates with the database.
3. **Database** stores structured (courses, users) and dynamic (comments, logs) data.

### **Frontend Architecture**
- **Atomic Design** principles: Atoms → Molecules → Organisms → Pages.
- State management using React hooks and Context API.

### **Backend Architecture**
- Layered structure:
  - **Routes Layer**: Defines API endpoints.
  - **Controller Layer**: Contains business logic.
  - **Service Layer**: Handles complex operations.
  - **Data Layer**: Mongoose schemas and database interactions.

### **Database Architecture**
- Relational schema for structured data:
  - **Users**: Stores user details.
  - **Courses**: Metadata for courses.
  - **Enrollments**: Tracks student enrollments.
  - **Payments**: Logs transactions.
- Uses MongoDB for flexible, NoSQL storage of dynamic content.

---

