import { NextFunction, Request, Response } from 'express';
import { Job } from '../interfaces/jobs.interface';
import JobService from '../services/jobs.service';

class JobsController {
  public jobService = new JobService();

  public getAllVacancies = async (_, res: Response, next: NextFunction) => {
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

  public createVacancy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacancyData: Job = req.body;
      const createOneVacancyData: Job = await this.jobService.createVacancy(vacancyData);

      res.status(200).json({ data: createOneVacancyData, message: 'сreateOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateVacancy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacancyId: string = req.params.id;
      const findOneVacancyData: Job = req.body;

      const updatedVacancyData: Job = await this.jobService.updateVacancy(
        vacancyId,
        findOneVacancyData
      );

      res.status(200).json({ data: updatedVacancyData, message: 'updateOne' });
    } catch (error) {
      next(error);
    }
  };

  public deleteVacancy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacancyId: string = req.params.id;
      const findOneVacancyData = await this.jobService.deleteVacancy(vacancyId);

      res.status(200).json({ data: findOneVacancyData, message: 'deleteOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default JobsController;
