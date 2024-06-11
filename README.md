
# OS Emulation personal portfolio website

## Overview

This project is a website designed to emulate an operating system environment for both phone and desktop devices. The main idea is to create an interactive experience that feels like navigating through an actual operating system, complete with draggable folders, modals, and a dynamic navbar.

## Features

- **Folders and Files**: The desktop contains folders that can be opened to reveal content.
- **Modals**: Clicking on folders opens modals with specific content.
- **Navbar**: A functional navbar that dynamically updates and includes a dropdown menu.
- **Responsive Design**: The layout adjusts for phone and desktop environments, providing a seamless user experience.

## Current Stage

The project is currently in the final stages of implementing features related to modal opening, navbar functionality, and styling.

## Usage

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/os-emulation-website.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd os-emulation-website
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```

After starting the development server, you can view the website in your browser at `http://localhost:3000`.

## Logic Overview

### Folder Component

Each folder component is draggable and can be opened with a double-click to reveal its content in a modal. The folders have unique IDs assigned to them, which allows the modals to be triggered by these IDs.

### Modal Component

Modals are used to display the content of the folders. They have a draggable feature for desktop environments, which is disabled on smaller screens like phones.

### Navbar Component

The navbar includes dynamic links that update based on the open modals. It also features a dropdown menu that lists folders, allowing users to open them directly from the navbar. The dropdown closes when clicking outside of it.

### State Management

State is managed using React's `useState` hook. The main states include:
- `openModals`: Tracks the currently open modals.
- `zIndex`: Manages the z-index of modals to bring the clicked modal to the front.
- `modalZIndices`: Keeps track of the z-index for each modal.
- `activeLink`: Highlights the currently active link in the navbar.

## Implementation

The project is implemented using:
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **Framer Motion**: For animations and draggable functionality.

## Future Improvements

- **File Management**: Implementing more complex file management within the folders.
- **Enhanced UI**: Adding more detailed styling and transitions to enhance the user experience.
- **Backend Integration**: Connecting the project with a backend to manage user data and files.

We hope you enjoy exploring this OS emulation website. Your feedback and contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README provides a comprehensive overview of your project, its current stage, usage instructions, and the logic behind it.