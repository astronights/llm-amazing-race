# 🌍 LLM-Based Text Adventure: Amazing Race

Welcome to the **LLM-Based Text Adventure: Amazing Race** project! This is an interactive, location-based text adventure game inspired by "The Amazing Race." The game challenges players to solve riddles and navigate through various cities and points of interest, using an AI-powered system to deliver a unique and engaging experience.

## 🎯 Project Overview

The game is built with a modern tech stack combining TypeScript, Next.js, and Python, leveraging the power of large language models (LLMs) to create dynamic and immersive gameplay. Players will embark on a virtual adventure where they must solve riddles to discover and travel to various landmarks around the world.

## 🛠️ Tech Stack

### **Frontend:**
- **TypeScript + Next.js**: The frontend is developed using Next.js, a React framework, with TypeScript for type safety and scalability. The app is hosted and deployed on Vercel, ensuring seamless and rapid deployment.

### **Backend:**
- **Python**: The backend is powered by Python, which handles the game's logic, interacts with the LLM, and processes data from the location services.
- **LangChain**: This framework orchestrates the interaction with the LLM, making it easier to integrate complex language models into the game.
- **Gemini LLM**: The Gemini LLM is used to generate riddles, provide hints, and interact with players in a natural language format.

### **Data:**
- **Open Source Location Data**: The game utilizes open source location datasets to query cities and points of interest. This data is essential for creating accurate and meaningful challenges based on real-world locations.

## 🌟 Features

- **Interactive Riddles**: Players must solve AI-generated riddles to identify their next destination.
- **Dynamic Gameplay**: Each playthrough is unique, with the LLM generating different riddles and routes based on the player's progress.
- **Global Exploration**: The game features a diverse set of cities and points of interest from around the world, challenging players' knowledge and problem-solving skills.
- **Real-Time Feedback**: The game provides immediate feedback based on the player's input, guiding them to the next destination.

## 🚀 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (for running the Next.js frontend)
- **Python 3.10** (for the backend)
- **Vercel CLI** (for deployment)
- **Git** (for version control)

### **Installation**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/amazing-race-text-adventure.git
   cd amazing-race-text-adventure