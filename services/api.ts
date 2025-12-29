const BASE_URL = 'https://apigcare.vercel.app/api/v1';

/**
 * Request payload for salon registration
 */
export interface RegisterSalonRequest {
  ownerName: string;
  salonName: string;
  email: string;
  password: string;
  phone: string;
}

/**
 * Response from salon registration API
 */
export interface RegisterSalonResponse {
  success: boolean;
  data: {
    salonId: string;
    ownerName: string;
    salonName: string;
    token: string;
  };
}

/**
 * Request payload for salon login
 */
export interface LoginSalonRequest {
  email: string;
  password: string;
}

/**
 * Response from salon login API
 */
export interface LoginSalonResponse {
  success: boolean;
  data: {
    salonId: string;
    salonName: string;
    ownerName: string;
    token: string;
  };
}

/**
 * Standard API error response
 */
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Request payload for creating a service
 */
export interface CreateServiceRequest {
  name: string;
  duration: number;
  price: number;
  category: string;
}

/**
 * Service data structure
 */
export interface ServiceData {
  id: string;
  salonId: string;
  name: string;
  duration: number;
  price: number;
  category: string;
}

/**
 * Response from create service API
 */
export interface CreateServiceResponse {
  success: boolean;
  data: ServiceData;
}

/**
 * Response from get services API
 */
export interface GetServicesResponse {
  success: boolean;
  data: ServiceData[];
}

/**
 * Response from delete service API
 */
export interface DeleteServiceResponse {
  success: boolean;
  message: string;
}

/**
 * Request payload for creating a barber
 */
export interface CreateBarberRequest {
  name: string;
  specialty: string[];
  experience: string;
  image: string;
}

/**
 * Barber data structure
 */
export interface BarberData {
  id: string;
  salonId: string;
  name: string;
  specialty: string[];
  experience: string;
  imageUrl: string;
}

/**
 * Response from create barber API
 */
export interface CreateBarberResponse {
  success: boolean;
  data: BarberData;
}

/**
 * Response from get barbers API
 */
export interface GetBarbersResponse {
  success: boolean;
  data: BarberData[];
}

/**
 * API Service for handling all backend communication
 */
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Register a new salon account
   * @param data - Salon registration details
   * @returns Registration response with salon ID and token
   * @throws ApiError if registration fails
   */
  async registerSalon(data: RegisterSalonRequest): Promise<RegisterSalonResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/salon/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: result.message || 'Registration failed',
          errors: result.errors,
        } as ApiError;
      }

      return result as RegisterSalonResponse;
    } catch (error: any) {
      if (error.success === false) {
        throw error;
      }
      throw {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      } as ApiError;
    }
  }

  /**
   * Login to an existing salon account
   * @param data - Login credentials (email and password)
   * @returns Login response with salon details and token
   * @throws ApiError if login fails
   */
  async loginSalon(data: LoginSalonRequest): Promise<LoginSalonResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/salon/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: result.message || 'Login failed',
          errors: result.errors,
        } as ApiError;
      }

      return result as LoginSalonResponse;
    } catch (error: any) {
      if (error.success === false) {
        throw error;
      }
      throw {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      } as ApiError;
    }
  }

  /**
   * Create a new service for the salon
   * @param token - Authentication token
   * @param data - Service details
   * @returns Created service data
   * @throws ApiError if creation fails
   */
  async createService(token: string, data: CreateServiceRequest): Promise<CreateServiceResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/salon/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: result.message || 'Failed to create service',
          errors: result.errors,
        } as ApiError;
      }

      return result as CreateServiceResponse;
    } catch (error: any) {
      if (error.success === false) {
        throw error;
      }
      throw {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      } as ApiError;
    }
  }

  /**
   * Get all services for the salon
   * @param token - Authentication token
   * @returns List of all services
   * @throws ApiError if request fails
   */
  async getSalonServices(token: string): Promise<GetServicesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/salon/services`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: result.message || 'Failed to fetch services',
          errors: result.errors,
        } as ApiError;
      }

      return result as GetServicesResponse;
    } catch (error: any) {
      if (error.success === false) {
        throw error;
      }
      throw {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      } as ApiError;
    }
  }

  /**
   * Delete a service
   * @param token - Authentication token
   * @param serviceId - ID of the service to delete
   * @returns Delete confirmation response
   * @throws ApiError if deletion fails
   */
  async deleteService(token: string, serviceId: string): Promise<DeleteServiceResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/salon/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: result.message || 'Failed to delete service',
          errors: result.errors,
        } as ApiError;
      }

      return result as DeleteServiceResponse;
    } catch (error: any) {
      if (error.success === false) {
        throw error;
      }
      throw {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      } as ApiError;
    }
  }

  /**
   * Add a new barber/staff member
   * @param token - Authentication token
   * @param data - Barber details
   * @returns Created barber data
   * @throws ApiError if creation fails
   */
  async addBarber(token: string, data: CreateBarberRequest): Promise<CreateBarberResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/salon/barbers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: result.message || 'Failed to add barber',
          errors: result.errors,
        } as ApiError;
      }

      return result as CreateBarberResponse;
    } catch (error: any) {
      if (error.success === false) {
        throw error;
      }
      throw {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      } as ApiError;
    }
  }

  /**
   * Get all barbers for the salon
   * @param token - Authentication token
   * @returns List of all barbers
   * @throws ApiError if request fails
   */
  async getBarbers(token: string): Promise<GetBarbersResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/salon/barbers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: result.message || 'Failed to fetch barbers',
          errors: result.errors,
        } as ApiError;
      }

      return result as GetBarbersResponse;
    } catch (error: any) {
      if (error.success === false) {
        throw error;
      }
      throw {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      } as ApiError;
    }
  }

  // TODO: Add more API methods as needed
  // async updateService(token: string, serviceId: string, data: any) { ... }
  // async getSalonProfile(token: string) { ... }
  // async updateSalonProfile(token: string, data: any) { ... }
}

export const apiService = new ApiService(BASE_URL);
