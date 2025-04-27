---

# 👟 Kicks - E-commerce Shoe Store

Kicks is a sleek and modern **e-commerce website** designed for showcasing and selling shoes. The site offers a user-friendly experience with categorized collections, customer reviews, and special promotions to keep visitors engaged.

## ✨ Features

- **🛍 Product Showcase**: Display new and popular shoe models with detailed descriptions and pricing.
- **🗂 Categorized Browsing**: Users can explore various shoe categories like Lifestyle and Basketball Shoes.
- **🌟 Customer Reviews**: Featured reviews provide social proof and enhance trust.
- **📬 Newsletter Signup**: Visitors can join the KicksPlus Club for discounts and updates.
- **📱 Responsive Design**: Optimized for both desktop and mobile viewing.

## 🛠️ Technologies Used

- **⚛️ React**: For building a dynamic and interactive user interface.
- **💨 Tailwind CSS**: For styling, providing a flexible and responsive layout.
- **🐘 PHP**: Backend scripting to handle server-side logic.
- **🌐 Laravel**: PHP framework used for routing, database management, and handling back-end processes.
- **💾 MySQL**: Database management for storing product information, user data, and orders.
---
## 🎥 Project Demo

- **🛒 Client-side Demo**: [Watch here](https://streamable.com/8abldw)  
  Explore the user experience: browse products, view product details, add items to the cart, and complete the checkout process.

- **🛠️ Admin-side Demo**: [Watch here](https://streamable.com/ar4boq)  
  Discover the admin functionalities: manage products, oversee customer orders, and handle user accounts efficiently.


## 🚀 Installation Guide

### 1. Clone the Repository
First, clone the repo to your local machine:

```bash
https://github.com/nguyenphan407/Kicks.git
cd Kicks
```

### 2. Setting Up the Front-end

#### Navigate to the `fe` folder:

```bash
cd fe
```

#### Install front-end dependencies:

```bash
yarn install
```

#### Start the Front-end Development Server:

```bash
yarn dev
```

- The frontend will be accessible at `http://localhost:5173`.
- The admin will be accessible at `http://localhost:5174`.

Note: The admin folder setup is similar to the fe (front-end) folder.


### 3. Setting Up the Back-end

#### Navigate to the `be` folder:

```bash
cd ../be
```

#### Install back-end dependencies:

```bash
composer install
```

#### Create the `.env` file for Laravel configuration:

```bash
cp .env.example .env
```

### 4. Setting Up the Database

1. **Create a MySQL Database**:
   - Open MySQL and create a new database for the project:
     ```sql
     CREATE DATABASE kicks_shoes_db;
     ```
   - Alternatively, you can create a database using a MySQL client like **phpMyAdmin** or **MySQL Workbench**.

2. **Configure Database in `.env`**:
   - Open the `.env` file in the `be` folder, and update the following lines to match your database credentials:
     ```plaintext
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=kicks_shoes_db
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     ```

3. **Run Migrations**:
   - After configuring the database, run migrations to create the necessary tables:
     ```bash
     php artisan migrate
     ```
   - This will create the tables needed for products, users, orders, etc., in your `your_database` database.

#### Generate application key:

```bash
php artisan key:generate
```

#### Start the Back-end Server:

```bash
php artisan serve
```

The backend will be accessible at `http://localhost:8000`.

### 5. Instructions for New Team Members

1. **Clone the repo and install dependencies**: Follow the setup steps above to get the initial environment ready.
2. **Sync with the remote repo**: Before starting any new work or when you see remote changes, pull the latest updates:
   ```bash
   git pull origin main
   ```
3. **Push your code to the repo**:
   - Pull any latest changes to avoid conflicts:
     ```bash
     git pull origin main
     ```
   - Then push your own changes:
     ```bash
     git push origin main
     ```

### 6. Additional Configurations (if applicable)

- **React Router**: Already installed. To add new routes, simply import `react-router-dom` and configure in `App.js`.
- **React Toastify**: For notifications, import `toast` from `react-toastify`.
- **Tailwind CSS**: Configured and ready to use. You can use Tailwind utility classes to style components.

---

## 📄 License

This project is licensed under the UIT License.

---
<img src="Thumbnail.png" alt="Project Thumbnail" width="100%"/>
