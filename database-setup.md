# APH Performance Showcase - Database Setup Guide

## 🗄️ Complete Database System Implementation

This guide will help you set up a comprehensive database system with admin controls, user authentication, and payment tracking for your APH Performance Showcase website.

## 📋 What's Included

### ✅ **Database Features**
- **User Management**: Registration, authentication, role-based access
- **Program Management**: Dynamic program creation and pricing
- **Payment Tracking**: Complete payment processing and history
- **Enrollment System**: Student enrollment tracking
- **Activity Logging**: All actions are logged for audit trails
- **Admin Dashboard**: Full database management interface
- **Analytics**: Revenue, user, and program analytics

### ✅ **User Roles**
- **Admin**: Full system access, database management
- **Coach**: View student data and programs
- **Student/Parent**: Access programs and payments
- **User**: Basic access to programs

## 🚀 **Setup Instructions**

### **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `aph-performance-showcase`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for setup to complete (2-3 minutes)

### **Step 2: Set Up Database Schema**

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `database-setup.sql`
3. Paste into the SQL Editor
4. Click **Run** to execute the schema
5. Verify all tables are created successfully

### **Step 3: Configure Environment Variables**

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: Payment Gateway (for production)
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
VITE_STRIPE_SECRET_KEY=your-stripe-secret-key
```

**To get your Supabase credentials:**
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the **Project URL** and **anon public** key
3. Paste them into your `.env.local` file

### **Step 4: Install Dependencies**

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Install additional dependencies (if not already installed)
npm install @radix-ui/react-tabs
npm install @radix-ui/react-table
```

### **Step 5: Test the System**

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test user registration**:
   - Go to the Login section
   - Create a new account
   - Verify user appears in Supabase dashboard

3. **Test payment processing**:
   - Go to Payment section
   - Select a program
   - Complete a test payment
   - Verify payment appears in database

4. **Test admin access**:
   - Create an admin user in Supabase
   - Login with admin credentials
   - Access the Admin Dashboard

## 🔧 **Database Schema Overview**

### **Tables Created**

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | User management | Role-based access, authentication |
| `programs` | Program catalog | Dynamic pricing, capacity management |
| `payments` | Payment tracking | Transaction history, status tracking |
| `enrollments` | Student enrollment | Program assignments, status tracking |
| `activity_logs` | Audit trail | All actions logged with details |
| `admin_settings` | System configuration | Configurable settings |

### **Key Features**

- **Row Level Security (RLS)**: Users can only see their own data
- **Automatic Timestamps**: Created/updated timestamps on all records
- **Foreign Key Constraints**: Data integrity maintained
- **Indexes**: Optimized for fast queries
- **Triggers**: Automatic timestamp updates

## 👥 **User Management**

### **Creating Admin Users**

1. **Via Supabase Dashboard**:
   ```sql
   INSERT INTO users (email, name, phone, role, is_active) 
   VALUES ('admin@yourdomain.com', 'Admin Name', '+1234567890', 'admin', true);
   ```

2. **Via Application**:
   - Register normally through the app
   - Update role in Supabase dashboard to 'admin'

### **User Roles & Permissions**

| Role | Can View | Can Edit | Can Delete |
|------|----------|----------|------------|
| **Admin** | Everything | Everything | Everything |
| **Coach** | Students, Programs | Student data | None |
| **Student** | Own data, Programs | Own profile | None |
| **User** | Programs | Own profile | None |

## 💳 **Payment Integration**

### **Current Implementation**
- **Mock Payment Processing**: Simulates real payment processing
- **Database Storage**: All payments stored with full details
- **Transaction IDs**: Unique identifiers for each payment
- **Status Tracking**: Pending, completed, failed, refunded

### **Production Payment Gateway**
To integrate real payment processing:

1. **Stripe Integration**:
   ```bash
   npm install @stripe/stripe-js
   ```

2. **Update Payment Component**:
   - Replace mock processing with Stripe API calls
   - Add webhook handling for payment confirmations
   - Implement refund functionality

## 📊 **Admin Dashboard Features**

### **Analytics Dashboard**
- **Revenue Analytics**: Total revenue, payment trends
- **User Analytics**: User growth, role distribution
- **Program Analytics**: Enrollment statistics, capacity tracking

### **Management Tools**
- **User Management**: View, edit, delete users
- **Payment Management**: View all payments, update status
- **Program Management**: Create, edit, manage programs
- **Activity Monitoring**: Real-time action logging

### **Export Functionality**
- **CSV Export**: Export user data, payment records
- **Reports**: Generate custom reports
- **Backup**: Database backup capabilities

## 🔒 **Security Features**

### **Authentication**
- **Supabase Auth**: Secure user authentication
- **JWT Tokens**: Secure session management
- **Password Reset**: Email-based password recovery

### **Authorization**
- **Role-Based Access**: Different permissions per role
- **Row Level Security**: Database-level access control
- **API Security**: Secure API endpoints

### **Data Protection**
- **Encryption**: All sensitive data encrypted
- **Audit Trails**: Complete action logging
- **Backup**: Regular database backups

## 🚀 **Deployment with Database**

### **Lovable.dev Deployment**

1. **Set Environment Variables**:
   - Add Supabase credentials to Lovable dashboard
   - Configure production database settings

2. **Database Migration**:
   - Run the SQL setup script on production database
   - Verify all tables and permissions

3. **Test Production**:
   - Test user registration
   - Test payment processing
   - Verify admin dashboard access

## 📈 **Monitoring & Maintenance**

### **Database Monitoring**
- **Supabase Dashboard**: Built-in monitoring tools
- **Query Performance**: Monitor slow queries
- **Storage Usage**: Track database growth

### **Regular Maintenance**
- **Backup Strategy**: Daily automated backups
- **Performance Optimization**: Regular index maintenance
- **Security Updates**: Keep dependencies updated

## 🆘 **Troubleshooting**

### **Common Issues**

1. **Database Connection Errors**:
   - Check environment variables
   - Verify Supabase credentials
   - Ensure database is accessible

2. **Authentication Issues**:
   - Check user roles in database
   - Verify RLS policies
   - Test with different user types

3. **Payment Processing Errors**:
   - Check payment validation
   - Verify database constraints
   - Test with different payment methods

### **Support Resources**
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Community Forums**: [github.com/supabase/supabase](https://github.com/supabase/supabase)
- **Discord Support**: [discord.supabase.com](https://discord.supabase.com)

## 🎯 **Next Steps**

1. **Set up your Supabase project**
2. **Run the database setup script**
3. **Configure environment variables**
4. **Test the complete system**
5. **Deploy to production**
6. **Train your team on admin dashboard**

Your APH Performance Showcase now has a complete, professional database system with admin controls, user management, and payment tracking! 🎉