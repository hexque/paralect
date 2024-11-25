import { HttpException } from '../lib/exceptions/HttpException';
import { Job } from '../interfaces/jobs.interface';
import jobModel from '../models/jobs.model';

class JobService {
  public jobs = jobModel;

  public async findAllVacancies(): Promise<Job[]> {
    const jobs: Job[] = await this.jobs.find();
    return jobs;
  }

  public async findVacancyById(vacancyId: string): Promise<Job> {
    if (!vacancyId) throw new HttpException(400, 'VacancyId not found');

    const findVacancy: Job = await this.jobs.findOne({ _id: vacancyId });
    if (!findVacancy) throw new HttpException(404, "Job doesn't exist");

    return findVacancy;
  }
}

export default JobService;
