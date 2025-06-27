# CareerBoostConnect

A resume analysis application that checks your resume against ATS (Applicant Tracking System) requirements using AI-powered analysis.

## Project Structure

```
CareerBoostConnect/
├── frontend/          # React + Vite frontend
├── backend/           # Express.js backend
├── package.json       # Root package.json for managing both
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

Run this command from the root directory to install all dependencies for both frontend and backend:

```bash
npm run install:all
```

Or install them separately:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd backend && npm install
```

### 2. Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
PORT=5000
```

#### Frontend Environment Variables (Optional)

Create a `.env` file in the `frontend/` directory if you need to override the API URL:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Running the Application

#### Option 1: Run Both Frontend and Backend Together

From the root directory:

```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000

#### Option 2: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Build for Production

```bash
# Build both frontend and backend
npm run build

# Or build separately
npm run build:frontend
npm run build:backend
```

## Features

- **Resume Upload**: Support for PDF and Word documents
- **ATS Analysis**: AI-powered analysis using Google Gemini
- **Score Breakdown**: Detailed scoring across multiple categories
- **Improvement Suggestions**: Actionable feedback for resume improvement
- **Export Reports**: Download analysis reports as text files
- **Dark Mode**: Toggle between light and dark themes

## API Endpoints

- `POST /api/resume/analyze` - Analyze uploaded resume
- `GET /api/health` - Health check endpoint

## Development

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Radix UI components
- React Query for data fetching

### Backend
- Express.js with TypeScript
- Multer for file uploads
- PDF parsing with pdf-parse
- Word document parsing with mammoth
- Google Gemini API for AI analysis

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the root directory to `frontend`
4. Set build command: `npm run build`
5. Set output directory: `dist`

### Backend (Railway/Render/Heroku)
1. Set the root directory to `backend`
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables (GEMINI_API_KEY, etc.)

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 5000 and 5173 are available
2. **CORS errors**: The backend is configured to allow requests from localhost:5173
3. **Missing dependencies**: Run `npm run install:all` to install all dependencies
4. **API key issues**: Make sure your Gemini API key is set in the backend `.env` file

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify environment variables are set correctly
4. Make sure both frontend and backend are running

## License

MIT License 