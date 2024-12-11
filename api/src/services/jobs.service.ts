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

  public async createVacancy(vacancyData: Job): Promise<Job> {
    const { company, position, salaryFork, status, note } = vacancyData;

    if (!company || !position || !salaryFork || !status) {
      throw new HttpException(400, 'Missing required fields');
    }

    const newJob = new this.jobs({
      company,
      position,
      salaryFork,
      status,
      note: note || ''
    });

    return newJob.save();
  }

  public async updateVacancy(vacancyId: string, jobData: Job): Promise<Job> {
    if (!vacancyId) throw new HttpException(400, 'VacancyId is empty');

    const findVacancy = await this.jobs.findOne({ _id: vacancyId });

    if (!findVacancy) throw new HttpException(404, "Job doesn't exist");

    await findVacancy.updateOne(jobData);
    return findVacancy;
  }

  public async deleteVacancy(vacancyId: string): Promise<void> {
    if (!vacancyId) throw new HttpException(400, 'VacancyId is empty');

    const findVacancy = await this.jobs.findById(vacancyId);
    if (!findVacancy) throw new HttpException(404, "Job doesn't exist");

    await findVacancy.deleteOne();
  }
}

export default JobService;
