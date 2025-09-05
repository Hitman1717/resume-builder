#!/bin/bash

# Resume Builder Pro - Development Setup Script
# This script sets up the development environment for the resume builder

echo "🚀 Setting up Resume Builder Pro..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version is $NODE_VERSION. Please upgrade to v16 or higher."
    exit 1
fi

print_status "Node.js $(node -v) is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_status "npm $(npm -v) is installed"

# Check if LaTeX is installed
if ! command -v pdflatex &> /dev/null; then
    print_warning "LaTeX (pdflatex) is not installed. PDF generation will not work."
    print_info "Please install TeX Live, MiKTeX, or MacTeX for PDF generation."
else
    print_status "LaTeX is installed and ready"
fi

echo ""
print_info "Installing backend dependencies..."

# Install backend dependencies
cd server
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        print_status "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
else
    print_status "Backend dependencies already installed"
fi

# Create backend .env file if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOL
# Server Configuration
PORT=5000
NODE_ENV=development

# AI Configuration - Replace with your actual API key
GEMINI_API_KEY=your_gemini_api_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=INFO
EOL
    print_status "Created backend .env file"
    print_warning "Please update GEMINI_API_KEY in server/.env with your actual API key"
else
    print_status "Backend .env file already exists"
fi

cd ..

echo ""
print_info "Installing frontend dependencies..."

# Install frontend dependencies
cd vite-project
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        print_status "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
else
    print_status "Frontend dependencies already installed"
fi

# Create frontend .env file if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOL
# Frontend Environment Variables

# API Base URL - Update this when deploying
VITE_API_BASE_URL=http://localhost:5000

# Environment
VITE_ENVIRONMENT=development
EOL
    print_status "Created frontend .env file"
else
    print_status "Frontend .env file already exists"
fi

cd ..

echo ""
print_status "Setup completed successfully! 🎉"
echo ""
print_info "To start the development servers:"
echo ""
echo -e "${BLUE}# Terminal 1 - Backend${NC}"
echo "cd server && npm run dev"
echo ""
echo -e "${BLUE}# Terminal 2 - Frontend${NC}"
echo "cd vite-project && npm run dev"
echo ""
print_info "Then open http://localhost:5173 in your browser"
echo ""

# Check if everything is ready
if [ ! -f "server/.env" ] || [ ! -f "vite-project/.env" ]; then
    print_warning "Please check your .env files before starting the servers"
fi

if ! command -v pdflatex &> /dev/null; then
    echo ""
    print_warning "LaTeX is not installed. Install it for PDF generation:"
    echo "  • Ubuntu/Debian: sudo apt install texlive-latex-recommended texlive-fonts-recommended"
    echo "  • macOS: brew install --cask mactex"
    echo "  • Windows: Download MiKTeX from https://miktex.org/"
fi

echo ""
print_info "Happy coding! 🚀"
