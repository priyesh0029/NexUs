import express,{NextFunction} from 'express';
import http from 'http';
import cors from 'cors';

import connectDB from './framework/database/mongoDb/connection';
import expressConfig from './framework/webserver/express';
import serverConfig from './framework/webserver/server';
import errorHandlingMiddleware from './framework/webserver/middleware/errorHandlingMiddleware';
import AppError from './utilities/appError';
import routes from './framework/webserver/routes/indexRoutes';

const app : express.Application = express()
const server = http.createServer(app)


// connecting database
connectDB()

// calling express configuration
expressConfig(app);

// starting the server 
serverConfig(server).startServer();

// routes
routes(app,express.Router());

// catch 404 and forwarding to error handler
app.use(errorHandlingMiddleware) 

app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});