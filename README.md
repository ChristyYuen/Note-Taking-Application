# Note-Taking Application

## Overview

This is a note-taking application developed using **py4web** and **Vue.js**. The app allows users to create, edit, and manage notes with ease. It supports features like color coding, starring notes, and image uploads, all while ensuring that users can only view their own notes.

## Features

- **Create and Edit Notes**: Users can create new notes, each having a title and content that can be edited separately.
- **In-Place Editing**: Notes can be edited in place, either by clicking a button or directly on the note.
- **Color Assignment**: Users can assign a color to their notes, which is saved for future reference.
- **Starred Notes**: Notes can be toggled as starred, and starred notes are displayed at the top of the list.
- **Sorting**: Notes are sorted such that the most recently modified notes appear first, regardless of their starred status.
- **Responsive Design**: On larger screens, notes are displayed in at least two columns for better usability.
- **Image Uploads**: Users can upload images to their notes, and the images are displayed correctly (optional feature).
- **User Isolation**: Each user can only see and manage their own notes.
- **Sharing Notes**: Users can share notes with each other (optional feature).

## Lessons Learned

During the development of this project, I learned the importance of user experience and interface design. Ensuring that the application is not only functional but also visually appealing significantly enhances user satisfaction. The integration of in-place editing and responsive design elements made the application more intuitive and accessible.

## What is py4web?

**py4web** is a web framework for Python that allows developers to build web applications quickly and efficiently. It is designed to be lightweight and easy to use, making it suitable for both beginners and experienced developers. With built-in support for database interactions and a simple routing mechanism, py4web enables rapid prototyping and development of web applications.

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/note-taking-app.git
   cd note-taking-app
   
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt

3. Start the application:
   ```bash
   python app.py

4. Open your web browser and navigate to `http://localhost:8000` to see the Thumbs Rating Component in action.