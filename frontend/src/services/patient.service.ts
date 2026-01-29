import api from './api';
import type { Patient, PaginatedResponse } from '../types/index';

interface CreatePatientData {
  full_name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  blood_group?: string;
  phone: string;
  email?: string;
  address?: string;
  emergency_contact?: string;
}

export const patientService = {
  async getPatients(page = 1, limit = 10, search = ''): Promise<PaginatedResponse<Patient>> {
    const response = await api.get('/api/patients', {
      params: { page, limit, search },
    });
    return response.data;
  },

  async getPatientById(id: string): Promise<Patient> {
    const response = await api.get(`/api/patients/${id}`);
    return response.data;
  },

  async createPatient(data: CreatePatientData): Promise<Patient> {
    const response = await api.post('/api/patients', data);
    return response.data;
  },

  async updatePatient(id: string, data: Partial<CreatePatientData>): Promise<Patient> {
    const response = await api.put(`/api/patients/${id}`, data);
    return response.data;
  },

  async deletePatient(id: string): Promise<void> {
    await api.delete(`/api/patients/${id}`);
  },
};
