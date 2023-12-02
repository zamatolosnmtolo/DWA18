Podcast App README

Creator
Zamatolo Mtolo

Technologies Used
JavaScript
React
Vite

Acknowledgments 
ChatGPT: Assistance in conceptualizing and developing the podcast app.
W3Schools: Valuable resources for learning and implementing web development techniques.
YouTube: Educational content contributing to the project's development.
Kim: Contribution to CSS styling.

Deployment
The project is deployed to a custom Netlify URL.

Views and Responsiveness
All views display correctly on the smallest mobile device available, "iPhone SE," emulated in Chrome Dev tools.
Favicon and Metatags
Favicon information added via RealFaviconGenerator using a free PNG image from Flaticon.
Metatag information added via MetaTags.io using a free image from Unsplash. Ensure manual replacement of URL values with absolute Netlify URLs after deployment.
Data Integration
Show data loaded via fetch call from Podcast API.
Specific show data fetched from individual show endpoint.
Loading States
Loading states implemented during initial data and new data loading.
Show and Episode Details
Users can view show details broken down into seasons, sorted by number.
Users can listen to any episode in a season.
Specific season view available, showing only episodes for the selected season.
Toggle between different seasons for the same show.
Browsing Features
Users can view the names of all available shows.
Preview images of shows displayed during browsing.
Number of seasons per show visible.
Human-readable date for the last show update.
Genres associated with each show displayed.
Favourites
Users can mark specific episodes as favourites.
A view displays all user favourites.
Favourites organized by show and season.
Episodes can be removed from favourites.
Sorting and Filtering
Shows can be arranged alphabetically (A-Z, Z-A) and by date updated (ascending, descending).
Users can filter shows by title through a text input.
Fuzzy matching implemented for finding shows based on strings.
Genre labels act as filters.
User Interaction
Date and time of episode addition to favourites visible.
Favourites sorting options available.
Audio player shows progress and episode length as timestamps.
Always-visible audio player allows listening while browsing.
Confirmation prompt for closing the page with active audio.
App remembers user listening history, progress, and timestamp.
Supabase Integration
User authentication via Supabase.
User favourites stored in the Supabase database.
Automatic syncing of favourites when logged in.
Users can share their favourites via a publicly accessible URL.
Additional Features
User can reset all progress, effectively removing listening history.
Sliding carousel on the landing page presents shows users might be interested in.







