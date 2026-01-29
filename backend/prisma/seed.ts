import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@pulseos.com' },
    update: {},
    create: {
      email: 'admin@pulseos.com',
      password_hash: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
      full_name: 'Admin User',
      phone: '+1-555-0001',
    },
  });

  const doctorUser1 = await prisma.user.upsert({
    where: { email: 'dr.smith@pulseos.com' },
    update: {},
    create: {
      email: 'dr.smith@pulseos.com',
      password_hash: await bcrypt.hash('doctor123', 10),
      role: 'DOCTOR',
      full_name: 'Dr. Sarah Smith',
      phone: '+1-555-1001',
    },
  });

  const doctorUser2 = await prisma.user.upsert({
    where: { email: 'dr.johnson@pulseos.com' },
    update: {},
    create: {
      email: 'dr.johnson@pulseos.com',
      password_hash: await bcrypt.hash('doctor123', 10),
      role: 'DOCTOR',
      full_name: 'Dr. Michael Johnson',
      phone: '+1-555-1002',
    },
  });

  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@pulseos.com' },
    update: {},
    create: {
      email: 'staff@pulseos.com',
      password_hash: await bcrypt.hash('staff123', 10),
      role: 'STAFF',
      full_name: 'Emily Roberts',
      phone: '+1-555-2001',
    },
  });

  const doctor1 = await prisma.doctor.upsert({
    where: { user_id: doctorUser1.id },
    update: {},
    create: {
      user_id: doctorUser1.id,
      doctor_id: 'DOC001',
      specialization: 'Cardiologist',
      qualification: 'MD, FACC',
      license_number: 'MED-123456',
      consultation_fee: 150.0,
      available_days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    },
  });

  const doctor2 = await prisma.doctor.upsert({
    where: { user_id: doctorUser2.id },
    update: {},
    create: {
      user_id: doctorUser2.id,
      doctor_id: 'DOC002',
      specialization: 'General Physician',
      qualification: 'MBBS, MD',
      license_number: 'MED-789012',
      consultation_fee: 100.0,
      available_days: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    },
  });

  const staff = await prisma.staff.upsert({
    where: { user_id: staffUser.id },
    update: {},
    create: {
      user_id: staffUser.id,
      staff_id: 'STF001',
      department: 'Reception',
      position: 'Front Desk Receptionist',
    },
  });

  const patient1 = await prisma.patient.upsert({
    where: { patient_id: 'PAT001' },
    update: {},
    create: {
      patient_id: 'PAT001',
      full_name: 'John Doe',
      date_of_birth: new Date('1985-05-15'),
      gender: 'MALE',
      blood_group: 'O+',
      phone: '+1-555-3001',
      email: 'john.doe@example.com',
      address: '123 Main St, Springfield, IL 62701',
      emergency_contact: 'Jane Doe: +1-555-3002',
    },
  });

  const patient2 = await prisma.patient.upsert({
    where: { patient_id: 'PAT002' },
    update: {},
    create: {
      patient_id: 'PAT002',
      full_name: 'Mary Johnson',
      date_of_birth: new Date('1990-08-22'),
      gender: 'FEMALE',
      blood_group: 'A+',
      phone: '+1-555-3003',
      email: 'mary.johnson@example.com',
      address: '456 Oak Ave, Springfield, IL 62702',
      emergency_contact: 'Bob Johnson: +1-555-3004',
    },
  });

  const patient3 = await prisma.patient.upsert({
    where: { patient_id: 'PAT003' },
    update: {},
    create: {
      patient_id: 'PAT003',
      full_name: 'Robert Williams',
      date_of_birth: new Date('1978-12-10'),
      gender: 'MALE',
      blood_group: 'B+',
      phone: '+1-555-3005',
      email: 'robert.w@example.com',
      address: '789 Pine Rd, Springfield, IL 62703',
      emergency_contact: 'Susan Williams: +1-555-3006',
    },
  });

  const appointment1 = await prisma.appointment.create({
    data: {
      appointment_number: 'APT001',
      patient_id: patient1.id,
      doctor_id: doctor1.id,
      appointment_date: new Date('2026-02-01'),
      appointment_time: '10:00 AM',
      status: 'SCHEDULED',
      reason: 'Regular checkup',
      notes: 'Patient reports feeling well',
      created_by: admin.id,
    },
  });

  const appointment2 = await prisma.appointment.create({
    data: {
      appointment_number: 'APT002',
      patient_id: patient2.id,
      doctor_id: doctor2.id,
      appointment_date: new Date('2026-02-02'),
      appointment_time: '02:00 PM',
      status: 'SCHEDULED',
      reason: 'Fever and cold',
      notes: 'Patient has mild fever since yesterday',
      created_by: staffUser.id,
    },
  });

  const medicalRecord1 = await prisma.medicalRecord.create({
    data: {
      patient_id: patient3.id,
      doctor_id: doctor1.id,
      visit_date: new Date('2026-01-20'),
      chief_complaint: 'Chest pain',
      diagnosis: 'Mild angina',
      notes: 'Patient advised to reduce stress and follow up in 2 weeks',
      prescriptions: [
        {
          medication: 'Aspirin',
          dosage: '75mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take after breakfast',
        },
        {
          medication: 'Atorvastatin',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take at bedtime',
        },
      ],
    },
  });

  const invoice1 = await prisma.invoice.create({
    data: {
      invoice_number: 'INV001',
      patient_id: patient3.id,
      total_amount: 250.0,
      paid_amount: 250.0,
      status: 'PAID',
      items: [
        {
          description: 'Consultation Fee',
          quantity: 1,
          unit_price: 150.0,
          amount: 150.0,
        },
        {
          description: 'ECG Test',
          quantity: 1,
          unit_price: 100.0,
          amount: 100.0,
        },
      ],
      payment_method: 'Credit Card',
      payment_date: new Date('2026-01-20'),
      created_by: staffUser.id,
    },
  });

  console.log('✅ Seed data created successfully!');
  console.log('\n📋 Test Users:');
  console.log('Admin: admin@pulseos.com / admin123');
  console.log('Doctor 1: dr.smith@pulseos.com / doctor123');
  console.log('Doctor 2: dr.johnson@pulseos.com / doctor123');
  console.log('Staff: staff@pulseos.com / staff123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
