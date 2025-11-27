// API Configuration
// Change this to switch between local and production backend

const API_CONFIG = {
    // Use 'local' for local testing, 'production' for deployed backend
    mode: 'local', // Change to 'production' when deploying frontend

    local: 'http://localhost:5000',
    production: 'https://mood-tracker-backend-p4lb.onrender.com'
};

export const API_URL = API_CONFIG[API_CONFIG.mode];
