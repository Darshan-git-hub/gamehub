## GameHub

## Project Description
This is a game-selling website built with Node.js, Express, and MongoDB. Users can sign up, log in, browse available games, and add them to their cart for purchase.

## Features
- User authentication (signup and signin)
- Game catalog with categories (upcoming, featured, latest)
- Shopping cart functionality
- Session management using Passport.js
- EJS templating for dynamic views

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps
1. **Clone the Repository**
   ```sh
   git clone <repository_url>
   cd <repository_folder>
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Start MongoDB** (Ensure MongoDB is running locally or provide a connection string in `app.js`)
   ```sh
   mongod
   ```
4. **Run the Server**
   ```sh
   node app.js
   ```
5. **Access the Website**
   Open a browser and go to:
   ```
   http://localhost:3000
   ```

## Project Structure
```
project/
│── config/
│   ├── passport.js
│── models/
│   ├── Cart.js
│   ├── Game.js
│   ├── user.js
│── public/
│   ├── images/
│   ├── js/
│   ├── styles/
│── views/
│   ├── base.ejs
│   ├── cart.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│── app.js
│── package.json
```

## Dependencies
The project uses the following NPM packages:
```json
{
  "dependencies": {
    "bcrypt": "^5.0.1",
    "connect-flash": "^0.1.1",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "mongoose": "^6.0.0",
    "passport": "^0.5.0",
    "passport-local": "^1.0.0"
  }
}
```

## License
This project is open-source. You are free to modify and use it for your own projects.

## Contributors
Feel free to contribute by submitting issues or pull requests.

![image](https://github.com/user-attachments/assets/69a960e2-b390-42d7-a22d-f0d3b8b60db9)

![image](https://github.com/user-attachments/assets/4ed7f6a0-39af-4c44-9ef2-4618b66d2ed4)

