import { NextFunction, Request, Response } from 'express';
import { Job } from '../interfaces/jobs.interface';
import JobService from '../services/jobs.service';

class JobsController {
  public jobService = new JobService();

  public getVacancies = async (_, res: Response, next: NextFunction) => {
    try {
      const findAllVacanciesData: Job[] = await this.jobService.findAllVacancies();

      res.status(200).json({ data: findAllVacanciesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getVacancyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacancyId: string = req.params.id;
      const findOneVacancyData: Job = await this.jobService.findVacancyById(vacancyId);

      res.status(200).json({ data: findOneVacancyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default JobsController;
