import { Router } from 'express';
import JobsController from '../controllers/jobs.controller';
import { Routes } from '../interfaces/routes.interface';

class JobsRoute implements Routes {
  public path = '/vacancy';

  public router = Router();

  public jobsController = new JobsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.jobsController.getVacancies);
    this.router.get(`${this.path}/:id`, this.jobsController.getVacancyById);
  }
}

export default JobsRoute;
