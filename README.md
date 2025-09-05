# Professional Resume Builder Pro

A modern, full-stack resume builder application that generates professional PDF resumes using LaTeX templates with AI-powered text enhancement. Built with industry-standard architecture and ready for scaling.

## 🌟 Features

- 🎨 **Modern Multi-Page UI** - Clean, responsive design with routing and navigation
- 📝 **Complete Resume Builder** - All essential sections with smart fresher detection
- 🤖 **AI Enhancement** - Gemini API integration to improve text quality
- 📄 **Professional PDF** - LaTeX-generated PDFs with professional formatting
- 🔧 **Smart Structure** - Automatically adapts resume structure for freshers vs experienced
- 📅 **Date Management** - Calendar pickers for precise date entry
- 👁️ **Live Preview** - Real-time PDF preview before downloading
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🏗️ **Scalable Architecture** - Modular structure ready for expansion

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite for lightning-fast development
- **React Router** for client-side routing
- **Custom Hooks** for state management
- **Modular Components** for reusability
- **Modern CSS** with gradient backgrounds and animations

### Backend
- **Node.js** with Express.js
- **MVC Architecture** with controllers, services, and routes
- **LaTeX PDF Generation** for professional output
- **Google Gemini AI** integration for text enhancement
- **RESTful API** design with proper error handling

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- LaTeX distribution (TeX Live, MiKTeX, or MacTeX)
- Google Gemini API key (optional, for AI enhancement)

## 📁 Project Structure

```
resume-builder-pro/
├── server/                          # Backend API
│   ├── server.js                   # Entry point
│   ├── src/
│   │   ├── controllers/            # Request handlers
│   │   ├── services/               # Business logic
│   │   ├── routes/                 # API routes
│   │   ├── middleware/             # Custom middleware
│   │   ├── templates/              # LaTeX templates
│   │   ├── utils/                  # Helper functions
│   │   └── config/                 # Configuration
│   └── package.json
├── vite-project/                   # Frontend React App
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API services
│   │   ├── utils/                  # Helper functions
│   │   └── App.jsx                 # Main app with routing
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- LaTeX distribution (TeX Live, MiKTeX, or MacTeX)
- Google Gemini API key (optional, for AI enhancement)

### Quick Start

1. **Clone and navigate to project**
   ```bash
   cd /path/to/resume
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../vite-project
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Backend - create server/.env file
   echo "GEMINI_API_KEY=your_api_key_here" > server/.env
   echo "PORT=5000" >> server/.env
   
   # Frontend - create vite-project/.env file
   echo "VITE_API_BASE_URL=http://localhost:5000" > vite-project/.env
   ```

### Running the Application

**Development Mode:**

1. **Start the backend server**
   ```bash
   cd server
   npm run dev  # Uses nodemon for auto-restart
   ```
   API will run on http://localhost:5000

2. **Start the frontend (in a new terminal)**
   ```bash
   cd vite-project
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Open your browser** and navigate to http://localhost:5173

**Production Mode:**
```bash
cd server && npm start
cd vite-project && npm run build && npm run preview
```

## 🎯 How to Use

### Navigation
- **Home** (`/`) - Landing page with features overview
- **Resume Builder** (`/resume-builder`) - Main resume creation tool
- **Templates** (`/templates`) - Browse available templates
- **About** (`/about`) - Learn about the technology and features

### Creating Your Resume

1. **Personal Information** - Fill in your basic details (name and email required)
2. **Professional Summary** - Brief overview of your skills and experience
3. **Work Experience** - Use date pickers for precise duration entry
4. **Projects** - Showcase your technical projects with links
5. **Achievements** - Highlight your accomplishments
6. **Education** - Academic background with optional GPA
7. **Skills** - Categorized by type (Technical, Languages, Tools)

### Smart Features

- **🎓 Fresher Detection** - Automatically adapts resume structure for new graduates
- **📅 Smart Dates** - Calendar pickers with "Currently working here" option
- **🤖 AI Enhancement** - Improve text with Gemini AI integration
- **👁️ Live Preview** - See exactly how your resume will look
- **📱 Responsive** - Works on all devices

## 🔌 API Endpoints

```
GET  /health                    # Health check
POST /api/resume/generate       # Generate and download PDF
POST /api/resume/preview        # Generate PDF for preview
```

## 🎨 Architecture Highlights

### Frontend Architecture
- **Component-Based**: Reusable UI components
- **Custom Hooks**: `useResumeForm`, `useResumeGeneration`
- **Service Layer**: API abstraction with error handling
- **Utility Functions**: Validation, date helpers, constants

### Backend Architecture
- **MVC Pattern**: Controllers, Services, Routes separation
- **Middleware**: CORS, error handling, logging
- **Template Engine**: Modular LaTeX template generation
- **AI Integration**: Gemini API service with fallback handling

## 🚀 Extending the Application

### Adding New Resume Templates
1. Create new template in `server/src/templates/`
2. Add template selection in frontend
3. Update template routes and controllers

### Adding Authentication
1. Install JWT middleware
2. Create auth routes and controllers
3. Add protected routes
4. Update frontend with auth context

### Adding Database
1. Configure database in `server/src/config/database.js`
2. Create models and migrations
3. Update services to use database
4. Add user data persistence

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| LaTeX not found | Install TeX Live, MiKTeX, or MacTeX |
| AI not working | Check GEMINI_API_KEY in .env file |
| PDF generation fails | Check server logs for LaTeX errors |
| CORS errors | Verify FRONTEND_URL in server .env |
| Port conflicts | Change PORT in .env files |

## 📈 Performance & Scaling

- **Frontend**: Lazy loading, code splitting ready
- **Backend**: Stateless design, horizontal scaling ready
- **PDF Generation**: Async processing, queue-ready
- **AI Calls**: Rate limiting and caching ready

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use and modify for your needs.

---

**Built with ❤️ for job seekers worldwide**

