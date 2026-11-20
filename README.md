
# 🌍 Wanderlust

Wanderlust is a full-stack web application designed to help users discover and share interesting places to stay. Users can explore property listings, view detailed information, create their own listings, and share experiences through reviews and ratings.

## 🌐 Live Demo

🚀 **[Explore Wanderlust](https://wanderlust-3q3v.onrender.com)**

## ✨ Features

- **User Authentication:** Register, log in, and log out securely.
- **Explore Listings:** Browse available properties and discover new places.
- **Create Listings:** Add properties with titles, descriptions, locations, prices, and images.
- **Manage Listings:** Edit and delete your own property listings.
- **Image Uploads:** Upload and manage property images using Cloudinary.
- **Reviews & Ratings:** Share experiences and rate properties.
- **Authorization:** Ensure users can modify only their own listings and reviews.
- **Responsive Design:** Enjoy a user-friendly interface across different screen sizes.
- **Error Handling:** Handle invalid inputs and application errors.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript, EJS, Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js |
| Session Management | Express-session, Connect-Mongo |
| Image Storage | Cloudinary |

## 💻 Run Locally

Want to explore the project or run it on your own machine? Follow these steps.

### Prerequisites

- Node.js
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd Wanderlust
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Replace the placeholder values with your actual credentials.

**Note:** Never upload your `.env` file or expose your private credentials on GitHub.

### 5. Start the Application

```bash
node app.js
```

Open your browser and visit:

http://localhost:8080

## 📂 Project Structure

```text
Wanderlust/
│
├── controllers/       # Handles application logic
├── init/              # Database initialization
├── models/            # Database models
├── public/            # Static files (CSS, JavaScript, images)
├── routes/            # Application routes
├── utils/             # Utility functions
├── views/             # EJS templates
│
├── middleware.js      # Custom middleware
├── schema.js          # Validation schemas
├── app.js             # Main application file
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## 🔮 Future Improvements

- Advanced property search and filtering.
- Interactive maps and location-based discovery.
- Improved property recommendations.
- Enhanced user experience.

## 👨‍💻 Author

**Jatin Garg**

[GitHub Profile](https://github.com/Jatingarg2006)

---

⭐ If you find this project interesting, consider giving it a star!

**Built with ❤️ by Jatin Garg**
