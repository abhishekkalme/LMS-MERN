<p align="center"><em>LMS-MERN: A full-stack Learning Management System with Authentication, Role-based Access, Notes Management, Cloudinary Integration, and Syllabus Uploads.</em></p>

<p align="left">
	<img src="https://img.shields.io/github/license/abhishekkalme/LMS-MERN?style=flat-square&color=blue&logo=opensourceinitiative&logoColor=white" alt="license">
	<img src="https://img.shields.io/github/last-commit/abhishekkalme/LMS-MERN?style=flat-square&color=orange&logo=git&logoColor=white" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/abhishekkalme/LMS-MERN?style=flat-square&color=yellow&logo=javascript&logoColor=black" alt="top-language">
	<img src="https://img.shields.io/github/languages/count/abhishekkalme/LMS-MERN?style=flat-square&color=success&logo=visualstudiocode&logoColor=white" alt="language-count">
</p>
<p align="left">Built with the tools and technologies:</p>
<p align="left">
	<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
	<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
	<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js" />
	<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
	<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
	<img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white" alt="npm">
</p>
<br>

## 🔗 Quick Links

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)
- [📍 Overview](#-Overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

**LMS-MERN** is a full-featured Learning Management System for students and educators. It supports:

- Role-based access (Student, Teacher, Admin)
- Secure authentication (JWT, refresh tokens, OTP)
- Notes upload & approval
- Dynamic syllabus filters
- PDF previews with Cloudinary integration
- Dark/light theme support

---

## 👾 Features

- 👤 **User Authentication**: Secure login/signup with JWT, OTP verification.
- 🧑‍🏫 **Role Management**: Admin, Teacher, Student support.
- 🗂 **Notes Uploading & Downloading** with unit structure.
- 📚 **Syllabus Filters**: Based on branch, year, semester.
- 🖼 **PDF Preview Modal** (Cloudinary-hosted)
- 🔒 **Protected Routes** with refresh token auto-renewal.
- ☁️ **Cloudinary** structured uploads.

---

## 📁 Project Structure

> See complete file tree in repo: [LMS-MERN](https://github.com/abhishekkalme/LMS-MERN)

````bash
LMS-MERN/
├── Backend/
│   ├── routes/, models/, config/, middleware/, utils/
│   └── index.js
├── Frontend/
│   ├── src/components/* (Admin, Notes, Auth, etc.)
│   ├── public/, assets/, context/
│   └── main.jsx, App.jsx
└── README.md
````


## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with LMS-MERN, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm
- Node.js ≥ 18
- npm ≥ 9
- MongoDB instance
- Cloudinary credentials


### ⚙️ Installation

Install LMS-MERN using one of the following methods:

**Build from source:**

1. Clone the LMS-MERN repository:
```sh
❯ git clone https://github.com/abhishekkalme/LMS-MERN
````

2. Navigate to the project directory:

```sh
❯ cd LMS-MERN
```

3. Install the project dependencies:

**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ cd Backend && npm install
> cd Frontend && npm install
```

### 🤖 Usage

Run LMS-MERN using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ # In one terminal
cd Backend && npm run dev

# In another
cd Frontend && npm run dev

```
Visit http://localhost:5173 in your browser.



### 🧪 Testing

Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```

---

## 📌 Project Roadmap

- Setup Authentication (JWT + OTP + Email)

- PDF Uploading (Cloudinary with folder structure)

- Admin Approval + Feedback

- Role-based UI rendering

- AI-based note summaries (Upcoming 🚀)

- Download Analytics Dashboard


---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/abhishekkalme/LMS-MERN/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/abhishekkalme/LMS-MERN/issues)**: Submit bugs found or log feature requests for the `LMS-MERN` project.
- **💡 [Submit Pull Requests](https://github.com/abhishekkalme/LMS-MERN/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
 <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/abhishekkalme/LMS-MERN
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/abhishekkalme/LMS-MERN/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=abhishekkalme/LMS-MERN">
   </a>
</p>
</details>

---

## 🎗 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 🙌 Acknowledgments

 List any resources, contributors, inspiration, etc. here.
React

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Render](https://render.com/)
- [Netlify](https://netlify.com/)
- [RGPV Syllabus Data](https://www.rgpv.ac.in/)


---
