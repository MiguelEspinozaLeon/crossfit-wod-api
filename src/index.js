import express from 'express'
import { router as v1WorkoutRouter} from "./v1/routes/workoutRoutes.js";
import bodyParser from 'body-parser';
import apicache from 'apicache';

import { swaggerDocs as V1SwaggerDocs } from './v1/swagger.js';
import { testPgDb } from './database/Record.js';
import { createTables } from './database/migrations.js';



const app = express(); 
const cache = apicache.middleware;
const PORT = process.env.PORT || 3000; 


app.use(cache('2 minutes'))
app.use(bodyParser.json())
app.use('/api/v1/workouts', v1WorkoutRouter)

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
    V1SwaggerDocs(app, PORT);
    createTables()
    console.log(process.env.PG_PASSWORD)
});