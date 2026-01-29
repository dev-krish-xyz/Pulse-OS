import { Router } from 'express';
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';
import { Role } from '../types/enums';

const router = Router();

router.use(authenticate);

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/', authorize(Role.ADMIN), createDoctor);
router.put('/:id', authorize(Role.ADMIN), updateDoctor);
router.delete('/:id', authorize(Role.ADMIN), deleteDoctor);

export default router;
