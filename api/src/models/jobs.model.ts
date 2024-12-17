import { model, Schema, Document } from 'mongoose';
import { Job } from '@/interfaces/jobs.interface';

const jobSchema: Schema = new Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  salaryFork: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Invitation', 'Rejected', 'Archived'],
    required: true
  },
  note: {
    type: String
  }
});

const jobModel = model<Job & Document>('Job', jobSchema);

export default jobModel;
