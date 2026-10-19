# Parkezo 🚗

Welcome to **Parkezo**! A modern, secure, and user-friendly smart parking application designed to seamlessly connect drivers with parking spots, whilst ensuring safety and compliance through integrated features.

---

## 🌟 Key Features

* **Secure Authentication via Aadhaar** 🔐
  * Mandatory user verification using a 12-digit Aadhaar number.
  * OTP simulation and live webcam integration for Facial Verification.
* **Interactive Parking Dashboard** 🗺️
  * Live map powered by Leaflet to explore available parking spots across the city.
  * Real-time sorting by Price, Rating, and Proximity to current location.
  * Visual statistics panel detailing platform activity (Total Users, Bookings, Active Spots).
* **Parkezo AI Assistant** 🤖
  * Built-in AI Chatbot widget available on all pages to help users quickly find parking spots (e.g., "Find parking in Mysore"), discover top-rated spots, and navigate the booking workflow.
* **User Profile & History** 👤
  * Detailed history of past and active bookings.
  * Track status of **Reported Violations** (e.g., "Pending Review", "Validated", "Action Taken").
  * Secure profile where core identity (Name, Phone) is locked to Aadhaar verification, allowing only email updates.
* **Host a Parking Spot** 🚗
  * Hosting a spot be it your home or parking space.
* **Stunning UI/UX** ✨
  * Modern, responsive "Glassmorphism" aesthetic.
  * Smooth animations, responsive layout, and beautiful data presentation.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 19 + Vite
* **Styling**: Vanilla CSS with modern Glassmorphism aesthetics
* **Maps Integration**: Leaflet & React-Leaflet
* **Icons**: Lucide React
* **Charts**: Chart.js & react-chartjs-2
* **Routing**: React Router DOM

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You will need **Node.js** (v18 or higher recommended) and **npm** installed on your system. 
You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nikhil-Raikar/Parkezo.git
   cd Parkezo
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the App:**
   Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173/`).

---

## 📸 Using the Application

1. **Authentication**: Upon launching, you will be redirected to the secure login gateway.
   - Enter a 12-digit number for the Aadhaar.
   - Enter a 6-digit number for the OTP.
   - Allow camera permissions to capture a quick photo, then continue.
2. **Dashboard Exploration**: Use the map or the list view on the left to browse parking spaces. You can search by area (e.g., "Indiranagar") or sort by top-rated spots.
3. **Booking**: Click on an available spot and select "Book Spot" to view pricing and simulate a reservation.
4. **Chatbot**: Click the floating bubble in the bottom right to ask the AI for help!

---

*Built with ❤️ for a smarter city.*
