import { API_CONFIG, API_REQUEST_CONFIG, buildApiUrl } from './config';

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// HTTP Methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request options
interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number>;
}

// Generic API request function
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    params
  } = options;

  try {
    const url = buildApiUrl(endpoint, params);
    
    const requestHeaders: Record<string, string> = {
      ...API_REQUEST_CONFIG.headers,
      ...headers,
    };

    // Add authorization header if token exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Specific API functions
export const api = {
  // Authentication
  async login(credentials: { email: string; password: string }) {
    return apiRequest(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: credentials,
    });
  },

  async register(userData: { 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
  }) {
    return apiRequest(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: userData,
    });
  },

  async logout() {
    return apiRequest(API_CONFIG.ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
  },

  // Loan operations
  async applyLoan(loanData: {
    amount: number;
    purpose: string;
    duration: number;
    monthlyIncome: number;
    employmentStatus: string;
    creditScore?: number;
  }) {
    return apiRequest(API_CONFIG.ENDPOINTS.APPLY_LOAN, {
      method: 'POST',
      body: loanData,
    });
  },

  async getLoans() {
    return apiRequest(API_CONFIG.ENDPOINTS.GET_LOANS);
  },

  async getLoanDetails(loanId: string | number) {
    return apiRequest(API_CONFIG.ENDPOINTS.GET_LOAN_DETAILS, {
      params: { id: loanId },
    });
  },

  // User operations
  async getUserProfile() {
    return apiRequest(API_CONFIG.ENDPOINTS.GET_USER_PROFILE);
  },

  async updateUserProfile(profileData: Record<string, unknown>) {
    return apiRequest(API_CONFIG.ENDPOINTS.UPDATE_USER_PROFILE, {
      method: 'PUT',
      body: profileData,
    });
  },

  // Dashboard operations
  async getDashboardData() {
    return apiRequest(API_CONFIG.ENDPOINTS.GET_DASHBOARD_DATA);
  },

  async getAnalytics() {
    return apiRequest(API_CONFIG.ENDPOINTS.GET_ANALYTICS);
  },

  // ML/Recommendation operations
  async getRecommendations(userData: Record<string, unknown>) {
    return apiRequest(API_CONFIG.ENDPOINTS.GET_RECOMMENDATIONS, {
      method: 'POST',
      body: userData,
    });
  },

  async predictEligibility(applicantData: {
    monthlyIncome: number;
    employmentStatus: string;
    creditScore?: number;
    existingDebt?: number;
  }) {
    return apiRequest(API_CONFIG.ENDPOINTS.PREDICT_ELIGIBILITY, {
      method: 'POST',
      body: applicantData,
    });
  },
};
