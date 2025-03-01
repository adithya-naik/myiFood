# MyiFood: A Comprehensive Food Ordering Web Application

MyiFood is a full-stack food ordering application built with modern web technologies. It allows users to browse food items, create accounts, place orders, and track their order history.

---

## 🛠️ **Technical Architecture**

### **Frontend**
- **Framework:** React 19 with Vite as the build tool
- **Styling:** Tailwind CSS for responsive design
- **State Management:** Context API for cart management
- **Routing:** React Router v7 for navigation
- **Animations:** Framer Motion and AOS (Animate On Scroll)
- **Notifications:** React Hot Toast for user feedback

### **Backend**
- **Server:** Node.js with Express
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) with bcryptjs for password hashing
- **Validation:** Express Validator for input validation

---

## 🚦 **How It Works**

### **User Flow**

#### **Browsing Food Items**
- Users land on the Home page where food items are displayed by category.
- Items are fetched from the MongoDB database via API endpoints.
- Users can search for specific items using the search functionality.

#### **User Authentication**
- New users can sign up by providing name, email, password, and location.
- Existing users can log in with their credentials.
- Authentication tokens are stored in local storage for persistent sessions.

#### **Shopping Cart**
- Users can add items to their cart, specifying size and quantity.
- The cart state is managed using Context API across the application.
- Users can modify quantities or remove items from the cart.

#### **Checkout Process**
- Users must be logged in to complete a purchase.
- Order data is sent to the backend and stored in the database.
- Confirmation notifications are displayed to the user.

#### **Order History**
- Users can view their past orders in the MyOrders section.
- Orders are fetched from the database based on the user's email.

---

## 📂 **Key Components**

- **Navbar:** Navigation component with conditional rendering based on authentication status.
- **FoodCard:** Displays individual food items with options for customization.
- **Cart:** Manages the shopping cart interface and checkout functionality.
- **Login/SignUp:** Handles user authentication with form validation.
- **Home:** Main page that displays food items categorized by type.
- **MyOrders:** Shows the user's order history.

---

## 📡 **Backend Routes**

- `POST /api/createUser`: Handles user registration with validation.
- `POST /api/loginUser`: Authenticates users and provides JWT tokens.
- `GET /api/fooditems`: Retrieves all food items from the database.
- `GET /api/foodcategory`: Fetches food categories for organization.
- `POST /api/orderData`: Processes new orders and updates the database.
- `GET /api/fetchOrders`: Retrieves order history for a specific user.

---

## 🗃️ **Data Models**

- **User:** Stores user information (name, email, password, location).
- **Orders:** Contains order data associated with user emails.
- **Food Items:** Stored globally after database connection for quick access.

---

## 🚀 **Technical Features**

- **Responsive Design:** Adapts to different screen sizes using Tailwind CSS.
- **Animations:** Smooth transitions and effects using Framer Motion and AOS.
- **Error Handling:** Comprehensive error management on both frontend and backend.
- **Security:** Password hashing with bcrypt and JWT authentication.
- **Real-time Feedback:** Toast notifications for user actions.
- **Caching:** Local storage used for authentication tokens and temporary data.

---

## ⚙️ **Development Setup**

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/myifood.git
```

2. **Navigate to the project directory:**
```bash
cd myifood
```

3. **Install dependencies for frontend and backend:**
```bash
cd frontend && npm install
cd ../backend && npm install
```

4. **Start the frontend and backend servers:**
```bash
npm run dev (for frontend)
npm start (for backend)
```

5. **Access the application:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 📄 **License**

This project is licensed under the MIT License.

---

## 📧 **Contact**
For any inquiries, please reach out at [your-email@domain.com](mailto:your-email@domain.com).

Happy Coding! 🚀
