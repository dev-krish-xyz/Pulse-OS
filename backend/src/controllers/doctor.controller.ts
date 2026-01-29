import { Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { AuthRequest, PaginatedResponse } from '../types';
import prisma from '../utils/prisma';

const createDoctorSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
  phone: z.string(),
  specialization: z.string(),
  qualification: z.string(),
  license_number: z.string(),
  consultation_fee: z.number(),
  available_days: z.array(z.string()),
});

export const getDoctors = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { doctor_id: { contains: search, mode: 'insensitive' as any } },
            { specialization: { contains: search, mode: 'insensitive' as any } },
            { user: { full_name: { contains: search, mode: 'insensitive' as any } } },
          ],
        }
      : {};

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        skip,
        take: limit,
        include: { user: true },
        orderBy: { created_at: 'desc' },
      }),
      prisma.doctor.count({ where }),
    ]);

    const response: PaginatedResponse<any> = {
      data: doctors,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };

    res.json(response);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDoctorById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        user: true,
        appointments: {
          include: { patient: true },
          orderBy: { appointment_date: 'desc' },
          take: 10,
        },
      },
    });

    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found' });
      return;
    }

    res.json(doctor);
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDoctor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = createDoctorSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const latestDoctor = await prisma.doctor.findFirst({
      orderBy: { created_at: 'desc' },
      select: { doctor_id: true },
    });

    const lastNumber = latestDoctor?.doctor_id
      ? parseInt(latestDoctor.doctor_id.replace('DOC', ''))
      : 0;
    const newDoctorId = `DOC${String(lastNumber + 1).padStart(3, '0')}`;

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const doctor = await prisma.doctor.create({
      data: {
        doctor_id: newDoctorId,
        specialization: data.specialization,
        qualification: data.qualification,
        license_number: data.license_number,
        consultation_fee: data.consultation_fee,
        available_days: data.available_days,
        user: {
          create: {
            email: data.email,
            password_hash: hashedPassword,
            full_name: data.full_name,
            phone: data.phone,
            role: 'DOCTOR',
          },
        },
      },
      include: { user: true },
    });

    res.status(201).json(doctor);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input', details: error.errors });
      return;
    }
    console.error('Create doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateDoctor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { specialization, qualification, license_number, consultation_fee, available_days } =
      req.body;

    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        specialization,
        qualification,
        license_number,
        consultation_fee,
        available_days,
      },
      include: { user: true },
    });

    res.json(doctor);
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDoctor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.doctor.delete({
      where: { id },
    });

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
