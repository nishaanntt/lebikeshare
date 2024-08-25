# LeBikeShare
This project is a bike-sharing app designed to simplify the process of finding and renting bikes in urban areas. The app was developed as part of my MSc dissertation, focusing on delivering a user-friendly and efficient service with a strong emphasis on mobile-first design. The system comprises a mobile app built with Expo (React Native) and a backend server implemented with ExpressJS, connected to a MongoDB database.

## Features
- **User Registration:** Users can register on the mobile app by providing their name, address, and a valid UK mobile number. After registration, they receive a verification link via email. Once their email is verified, they receive a pre-generated password in a follow-up email to log into their account.

- **Real-time Availability and Booking:** The app allows users to find nearby bike stations and check bike availability using GPS. Users can book a bike by selecting a station and rental period, receiving an estimated cost after entering start and end times. Payment information, like credit card details, can be saved for quicker payments.

- **Manage Bike Stations & Bikes:** Admins can add, remove, and update bike stations and bike details, including station names, bike slots, unique bike numbers, origin stations, and maintenance dates. This ensures accurate listings and availability tracking.

- **Maps Integration:** Users can view nearby bike stations using Google Maps, which shows their current location and nearby stations via GPS.

- **Secured Transactions:** Users can make secured transaction through integrated Stripe payment gateway which also enables them to save their payment details for ease of use for future transactions.

## Architecture
- **Frontend:** Built using Expo (React Native) for a cross-platform mobile app experience.

- **Backend:** Powered by ExpressJS, providing RESTful API endpoints.

- **Database:** MongoDB for managing user data, bike inventory, and rental transactions.
