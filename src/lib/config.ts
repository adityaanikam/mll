// API Configuration
export const API_CONFIG = {
  // Backend API URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://cogni-ml.onrender.com',
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication endpoints
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    
    // Loan application endpoints
    APPLY_LOAN: '/loans/apply',
    GET_LOANS: '/loans',
    GET_LOAN_DETAILS: '/loans/:id',
    
    // User endpoints
    GET_USER_PROFILE: '/user/profile',
    UPDATE_USER_PROFILE: '/user/profile',
    
    // Dashboard endpoints
    GET_DASHBOARD_DATA: '/dashboard',
    GET_ANALYTICS: '/analytics',
    
    // ML/Recommendation endpoints
    GET_RECOMMENDATIONS: '/recommendations',
    PREDICT_ELIGIBILITY: '/predict/eligibility',
  }
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Replace path parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  
  return url;
};

// API request configuration
export const API_REQUEST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds
} as const;
