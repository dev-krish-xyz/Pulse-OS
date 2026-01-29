export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  STAFF = 'STAFF',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  CANCELLED = 'CANCELLED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  full_name: string;
  phone?: string;
  is_active?: boolean;
  doctor?: Doctor;
  staff?: Staff;
}

export interface Patient {
  id: string;
  patient_id: string;
  full_name: string;
  date_of_birth: string;
  gender: Gender;
  blood_group?: string;
  phone: string;
  email?: string;
  address?: string;
  emergency_contact?: string;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: string;
  user_id: string;
  doctor_id: string;
  specialization: string;
  qualification: string;
  license_number: string;
  consultation_fee: number;
  available_days: string[];
  user?: User;
}

export interface Staff {
  id: string;
  user_id: string;
  staff_id: string;
  department: string;
  position: string;
  user?: User;
}

export interface Appointment {
  id: string;
  appointment_number: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id?: string;
  visit_date: string;
  chief_complaint: string;
  diagnosis: string;
  notes?: string;
  prescriptions: Prescription[];
  patient?: Patient;
  doctor?: Doctor;
}

export interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  patient_id: string;
  appointment_id?: string;
  total_amount: number;
  paid_amount: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
  payment_method?: string;
  payment_date?: string;
  patient?: Patient;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
