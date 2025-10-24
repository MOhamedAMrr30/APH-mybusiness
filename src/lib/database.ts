import { createClient } from '@supabase/supabase-js';
import { 
  User, 
  Program, 
  Payment, 
  Enrollment, 
  ActivityLog, 
  AdminSettings,
  DatabaseOperations 
} from './database-schema';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

class APHDatabase implements DatabaseOperations {
  // User operations
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapUserFromDB(data);
  }

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapUserFromDB(data);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) return null;
    return this.mapUserFromDB(data);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapUserFromDB(data);
  }

  async deleteUser(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    return !error;
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapUserFromDB);
  }

  // Program operations
  async createProgram(programData: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<Program> {
    const { data, error } = await supabase
      .from('programs')
      .insert([{
        ...programData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapProgramFromDB(data);
  }

  async getProgramById(id: string): Promise<Program | null> {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapProgramFromDB(data);
  }

  async getAllPrograms(): Promise<Program[]> {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapProgramFromDB);
  }

  async updateProgram(id: string, updates: Partial<Program>): Promise<Program> {
    const { data, error } = await supabase
      .from('programs')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapProgramFromDB(data);
  }

  async deleteProgram(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id);

    return !error;
  }

  // Payment operations
  async createPayment(paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert([{
        ...paymentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapPaymentFromDB(data);
  }

  async getPaymentById(id: string): Promise<Payment | null> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapPaymentFromDB(data);
  }

  async getPaymentsByUserId(userId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapPaymentFromDB);
  }

  async getAllPayments(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapPaymentFromDB);
  }

  async updatePaymentStatus(id: string, status: Payment['status']): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapPaymentFromDB(data);
  }

  // Enrollment operations
  async createEnrollment(enrollmentData: Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Enrollment> {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([{
        ...enrollmentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapEnrollmentFromDB(data);
  }

  async getEnrollmentsByUserId(userId: string): Promise<Enrollment[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapEnrollmentFromDB);
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapEnrollmentFromDB);
  }

  async updateEnrollmentStatus(id: string, status: Enrollment['status']): Promise<Enrollment> {
    const { data, error } = await supabase
      .from('enrollments')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapEnrollmentFromDB(data);
  }

  // Activity log operations
  async logActivity(activityData: Omit<ActivityLog, 'id' | 'createdAt'>): Promise<ActivityLog> {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert([{
        ...activityData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapActivityLogFromDB(data);
  }

  async getActivityLogs(limit = 100, offset = 0): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.map(this.mapActivityLogFromDB);
  }

  async getActivityLogsByUserId(userId: string): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapActivityLogFromDB);
  }

  // Admin operations
  async getAdminSettings(): Promise<AdminSettings[]> {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapAdminSettingsFromDB);
  }

  async updateAdminSetting(key: string, value: any, updatedBy: string): Promise<AdminSettings> {
    const { data, error } = await supabase
      .from('admin_settings')
      .upsert([{
        key,
        value,
        updated_by: updatedBy,
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return this.mapAdminSettingsFromDB(data);
  }

  // Analytics operations
  async getPaymentAnalytics(startDate: Date, endDate: Date) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .gte('payment_date', startDate.toISOString())
      .lte('payment_date', endDate.toISOString());

    if (error) throw error;

    const totalRevenue = data.reduce((sum, payment) => sum + payment.amount, 0);
    const totalPayments = data.length;
    const averagePayment = totalPayments > 0 ? totalRevenue / totalPayments : 0;
    
    const paymentsByStatus = data.reduce((acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRevenue,
      totalPayments,
      averagePayment,
      paymentsByStatus
    };
  }

  async getUserAnalytics() {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;

    const totalUsers = data.length;
    const activeUsers = data.filter(user => user.is_active).length;
    const newUsersThisMonth = data.filter(user => {
      const userDate = new Date(user.created_at);
      const now = new Date();
      return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
    }).length;

    const usersByRole = data.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      usersByRole,
      activeUsers,
      newUsersThisMonth
    };
  }

  async getProgramAnalytics() {
    const { data: programs, error: programsError } = await supabase
      .from('programs')
      .select('*');

    if (programsError) throw programsError;

    const { data: enrollments, error: enrollmentsError } = await supabase
      .from('enrollments')
      .select('*');

    if (enrollmentsError) throw enrollmentsError;

    const totalPrograms = programs.length;
    const activePrograms = programs.filter(program => program.is_active).length;
    const totalEnrollments = enrollments.length;

    const enrollmentsByProgram = enrollments.reduce((acc, enrollment) => {
      acc[enrollment.program_id] = (acc[enrollment.program_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPrograms,
      activePrograms,
      totalEnrollments,
      enrollmentsByProgram
    };
  }

  // Helper methods for mapping database records
  private mapUserFromDB(data: any): User {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: data.role,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      isActive: data.is_active,
      lastLogin: data.last_login ? new Date(data.last_login) : undefined
    };
  }

  private mapProgramFromDB(data: any): Program {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      ageGroup: data.age_group,
      duration: data.duration,
      maxParticipants: data.max_participants,
      currentParticipants: data.current_participants,
      isActive: data.is_active,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  private mapPaymentFromDB(data: any): Payment {
    return {
      id: data.id,
      userId: data.user_id,
      programId: data.program_id,
      amount: data.amount,
      currency: data.currency,
      paymentMethod: data.payment_method,
      cardLastFour: data.card_last_four,
      status: data.status,
      transactionId: data.transaction_id,
      paymentDate: new Date(data.payment_date),
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      notes: data.notes
    };
  }

  private mapEnrollmentFromDB(data: any): Enrollment {
    return {
      id: data.id,
      userId: data.user_id,
      programId: data.program_id,
      paymentId: data.payment_id,
      status: data.status,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }

  private mapActivityLogFromDB(data: any): ActivityLog {
    return {
      id: data.id,
      userId: data.user_id,
      action: data.action,
      entityType: data.entity_type,
      entityId: data.entity_id,
      details: data.details,
      ipAddress: data.ip_address,
      userAgent: data.user_agent,
      createdAt: new Date(data.created_at)
    };
  }

  private mapAdminSettingsFromDB(data: any): AdminSettings {
    return {
      id: data.id,
      key: data.key,
      value: data.value,
      description: data.description,
      updatedBy: data.updated_by,
      updatedAt: new Date(data.updated_at)
    };
  }
}

// Export singleton instance
export const db = new APHDatabase();
export default db;