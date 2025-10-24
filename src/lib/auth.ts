import { createClient } from '@supabase/supabase-js';
import { User } from './database-schema';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'coach' | 'student';
  name: string;
  isAuthenticated: boolean;
}

class AuthService {
  private currentUser: AuthUser | null = null;

  async signUp(email: string, password: string, name: string, phone: string, role: 'user' | 'coach' | 'student' = 'user') {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            role
          }
        }
      });

      if (error) throw error;

      // Create user record in our database
      if (data.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: data.user.email!,
            name,
            phone,
            role,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (dbError) throw dbError;
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Get user details from our database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      this.currentUser = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.name,
        isAuthenticated: true
      };

      // Update last login
      await supabase
        .from('users')
        .update({ 
          last_login: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', data.user.id);

      return { success: true, user: this.currentUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      this.currentUser = null;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        this.currentUser = null;
        return null;
      }

      // Get user details from our database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        this.currentUser = null;
        return null;
      }

      this.currentUser = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.name,
        isAuthenticated: true
      };

      return this.currentUser;
    } catch (error) {
      this.currentUser = null;
      return null;
    }
  }

  async updateUserRole(userId: string, role: 'admin' | 'user' | 'coach' | 'student') {
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          role,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isCoach(): boolean {
    return this.currentUser?.role === 'coach';
  }

  isStudent(): boolean {
    return this.currentUser?.role === 'student';
  }

  canAccessAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  canViewDatabase(): boolean {
    return this.currentUser?.role === 'admin' || this.currentUser?.role === 'coach';
  }

  getCurrentUserData(): AuthUser | null {
    return this.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        this.currentUser = null;
        callback(null);
      }
    });
  }
}

// Export singleton instance
export const auth = new AuthService();
export default auth;

