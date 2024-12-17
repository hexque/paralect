import { Router } from 'express';
import JobsController from '@/controllers/jobs.controller';
import { Routes } from '@/interfaces/routes.interface';

class JobsRoute implements Routes {
  public path = '/vacancies';

  public router: Router = Router();

  public jobsController = new JobsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.jobsController.getAllVacancies);
    this.router.get(`${this.path}/:id`, this.jobsController.getVacancyById);
    this.router.post(`${this.path}`, this.jobsController.createVacancy);
    this.router.patch(`${this.path}/:id`, this.jobsController.updateVacancy);
    this.router.delete(`${this.path}/:id`, this.jobsController.deleteVacancy);
  }
}

export default JobsRoute;
