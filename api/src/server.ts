import App from './app';
import JobsRoute from './routes/jobs.route';

const app = new App([new JobsRoute()]);

app.listen();
