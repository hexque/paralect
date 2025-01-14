import { z } from 'zod';

import { validationSchema } from './schema';

export type FormData = z.infer<typeof validationSchema>;
