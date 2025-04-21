# Release Notes

For the ![Portuguese](https://github.com/StormJose/Weatherly-app/blob/main/docs/release-notes.md) version.

## Version 2.0.0 – 2025-04-21

![page-image](https://github.com/StormJose/Weatherly-app/blob/main/docs/img/main-weatherly-screenshot.png)



### ✨ New Features
- **Global Search Functionality**  
  Users can now search for weather data from any location worldwide, not just their current geolocation. This improves usability for travelers, planners, or just curious minds.

![page-image](https://github.com/StormJose/Weatherly-app/blob/main/docs/img/search-weatherly-screenshot.png)


### 🎨 UI & UX Improvements
- Improved layout proportions and overall responsiveness across devices.
- Enhanced accessibility:
  - Tooltips added to main navigation buttons for better screen reader support and clearer navigation:
    - "Return to Current Weather"
    - "Dark Mode"
- Footer section at the bottom of the app to acknowledge open APIs and contributors.


![page-image](https://github.com/StormJose/Weatherly-app/blob/main/docs/img/tooltip-weatherly-screenshot.png)



### 🧠 Architectural Changes
- Began migrating the app structure from basic HTML/CSS/JS to an **MVC architecture**.
  - Reorganized codebase to promote separation of concerns and reusability.
  - Logic is being refactored into standalone functions for better maintainability.
  - ⚠️ **Note:** Migration is partial and ongoing. Expect full MVC support in the next version.

### 🚀 Tooling & Optimization
- **Integrated Parcel as the bundler**  
  Parcel is a zero-config build tool that simplifies bundling assets like JavaScript, HTML, and CSS. It optimizes performance, improves development workflow with hot reloading, and prepares the app for scalable deployment. As a multi-asset project with visual representations for all types of weather, it makes sense to move to a more sophisticated approach this time.

---

Thank you for checking out this release!  
Stay tuned for Version 1.2.0 where the MVC migration will be finalized and new features will be introduced.

