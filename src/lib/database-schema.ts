// Database Schema for APH Performance Showcase
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'user' | 'coach' | 'student';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin?: Date;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  price: number;
  ageGroup: string;
  duration: string;
  maxParticipants: number;
  currentParticipants: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  programId: string;
  amount: number;
  currency: string;
  paymentMethod: 'credit_card' | 'visa' | 'mastercard' | 'amex';
  cardLastFour: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  programId: string;
  paymentId: string;
  status: 'active' | 'completed' | 'cancelled' | 'suspended';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: 'user' | 'payment' | 'program' | 'enrollment';
  entityId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface AdminSettings {
  id: string;
  key: string;
  value: any;
  description: string;
  updatedBy: string;
  updatedAt: Date;
}

// Database operations interface
export interface DatabaseOperations {
  // User operations
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  
  // Program operations
  createProgram(program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<Program>;
  getProgramById(id: string): Promise<Program | null>;
  getAllPrograms(): Promise<Program[]>;
  updateProgram(id: string, updates: Partial<Program>): Promise<Program>;
  deleteProgram(id: string): Promise<boolean>;
  
  // Payment operations
  createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment>;
  getPaymentById(id: string): Promise<Payment | null>;
  getPaymentsByUserId(userId: string): Promise<Payment[]>;
  getAllPayments(): Promise<Payment[]>;
  updatePaymentStatus(id: string, status: Payment['status']): Promise<Payment>;
  
  // Enrollment operations
  createEnrollment(enrollment: Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Enrollment>;
  getEnrollmentsByUserId(userId: string): Promise<Enrollment[]>;
  getAllEnrollments(): Promise<Enrollment[]>;
  updateEnrollmentStatus(id: string, status: Enrollment['status']): Promise<Enrollment>;
  
  // Activity log operations
  logActivity(activity: Omit<ActivityLog, 'id' | 'createdAt'>): Promise<ActivityLog>;
  getActivityLogs(limit?: number, offset?: number): Promise<ActivityLog[]>;
  getActivityLogsByUserId(userId: string): Promise<ActivityLog[]>;
  
  // Admin operations
  getAdminSettings(): Promise<AdminSettings[]>;
  updateAdminSetting(key: string, value: any, updatedBy: string): Promise<AdminSettings>;
  
  // Analytics operations
  getPaymentAnalytics(startDate: Date, endDate: Date): Promise<{
    totalRevenue: number;
    totalPayments: number;
    averagePayment: number;
    paymentsByStatus: Record<string, number>;
  }>;
  
  getUserAnalytics(): Promise<{
    totalUsers: number;
    usersByRole: Record<string, number>;
    activeUsers: number;
    newUsersThisMonth: number;
  }>;
  
  getProgramAnalytics(): Promise<{
    totalPrograms: number;
    activePrograms: number;
    totalEnrollments: number;
    enrollmentsByProgram: Record<string, number>;
  }>;
}

