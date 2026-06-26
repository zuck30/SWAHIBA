# Swahiba

<p align="center">

This project presents a complete implementation of a frontend specifically designed for the mixed‑language communication style used across East Africa or Swahili Swahiba LLM from Scratch (Swahili-Gpt).

> **Please, refer to this repository**  
>https://github.com/zuck30/swahili-llm-scratch

## Features

- Natural conversation supporting pure Kiswahili, pure English, and natural Kiswaenglish code-switching
- Multiple conversation management with create, switch, and delete functionality
- Real-time responses with typing indicators
- Persistent conversation history in local storage for now

## How to Run

Follow these steps to set up and run the chat application:

### 1. Install Dependencies

First, install all required npm packages:

```bash
npm install
```

### 2. Install Additional Packages

Install Heroicons for the icon set:

```bash
npm install @heroicons/react
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run Development Server

Start the Next.js development server:

```bash
npm run dev
```

### 5. Build for Production

When ready for deployment:

```bash
npm run build
npm start
```

## Backend Integration

The frontend is designed to work with a Python FastAPI backend that loads the MLX model. The chat API endpoint expects:

- **POST** `/api/chat` - Send messages and receive AI responses
- **GET** `/api/health` - Health check endpoint

### FastAPI Server Setup

```bash
pip install fastapi uvicorn mlx
python server.py
```

## How to Contribute

Contributions are welcome and easy to follow:

- **Code, ideas, and documentation** → submit via Pull Requests or open an Issue
- **UI improvements** → Enhance the Kitenge design system
- **Backend integration** → Connect the FastAPI server with the MLX model
- **Localization** → Add more Swahili language support
- **Do NOT commit large data files or model weights** → these are too big for version control


## Future Work

- Full integration with MLX model backend
- Streaming responses for better user experience
- Voice input and output support
- Mobile app version using React Native
- Export conversation history


<br>
<!-- <p align="center">
    <img src="swahiba_interface.png" alt="Swaiba Interface" width="800">
</p> -->

## License

This project is open for research, education, and non‑commercial use.

<p align="center">
    <a href="https://sheddydev.netlify.app"><img src="https://img.shields.io/badge/Blog-sheddydev.netlify.app-purple.svg"></a>
    <a href="https://sheddysilicon.netlify.app"><img src="https://img.shields.io/badge/Author-sheddysilicon.netlify.app-green.svg"></a>
    <a href="mailto:mwalyangashadrack@gmail.com"><img src="https://img.shields.io/badge/Email-mwalyangashadrack%40gmail.com-red.svg"></a>
</p>