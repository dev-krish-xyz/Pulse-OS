import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest, PaginatedResponse } from '../types';
import prisma from '../utils/prisma';
import { Patient } from '@prisma/client';

const createPatientSchema = z.object({
  full_name: z.string().min(2),
  date_of_birth: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  blood_group: z.string().optional(),
  phone: z.string(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  emergency_contact: z.string().optional(),
});

const updatePatientSchema = createPatientSchema.partial();

export const getPatients = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { full_name: { contains: search, mode: 'insensitive' as any } },
            { patient_id: { contains: search, mode: 'insensitive' as any } },
            { phone: { contains: search } },
            { email: { contains: search, mode: 'insensitive' as any } },
          ],
        }
      : {};

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.patient.count({ where }),
    ]);

    const response: PaginatedResponse<Patient> = {
      data: patients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPatientById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: {
          include: { doctor: { include: { user: true } } },
          orderBy: { appointment_date: 'desc' },
          take: 10,
        },
        medical_records: {
          include: { doctor: { include: { user: true } } },
          orderBy: { visit_date: 'desc' },
          take: 5,
        },
      },
    });

    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    res.json(patient);
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPatient = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = createPatientSchema.parse(req.body);

    const latestPatient = await prisma.patient.findFirst({
      orderBy: { created_at: 'desc' },
      select: { patient_id: true },
    });

    const lastNumber = latestPatient?.patient_id
      ? parseInt(latestPatient.patient_id.replace('PAT', ''))
      : 0;
    const newPatientId = `PAT${String(lastNumber + 1).padStart(3, '0')}`;

    const patient = await prisma.patient.create({
      data: {
        ...data,
        patient_id: newPatientId,
        date_of_birth: new Date(data.date_of_birth),
      },
    });

    res.status(201).json(patient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input', details: error.errors });
      return;
    }
    console.error('Create patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePatient = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = updatePatientSchema.parse(req.body);

    const updateData: any = { ...data };
    if (data.date_of_birth) {
      updateData.date_of_birth = new Date(data.date_of_birth);
    }

    const patient = await prisma.patient.update({
      where: { id },
      data: updateData,
    });

    res.json(patient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input', details: error.errors });
      return;
    }
    console.error('Update patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePatient = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.patient.delete({
      where: { id },
    });

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
