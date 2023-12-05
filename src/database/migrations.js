import { client } from "../config/database.js"


export const createTables = async() => {
    try {
        await client.connect()
        
        await client.query('CREATE TABLE IF NOT EXISTS public.members (id UUID PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL, gender VARCHAR(10) NOT NULL, dateOfBirth DATE NOT NULL, email VARCHAR(50) NOT NULL, password TEXT NOT NULL);')
        
        await client.query('CREATE TABLE IF NOT EXISTS public.workouts ( id UUID PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL, mode VARCHAR(50) NOT NULL, createdAt DATE NOT NULL DEFAULT CURRENT_DATE, updatedAt DATE NOT NULL DEFAULT CURRENT_DATE); ')

        await client.query(
            `CREATE TABLE IF NOT EXISTS public.exercises (
                id UUID PRIMARY KEY NOT NULL, 
                name VARCHAR(50) NOT NULL, 
                workout_id UUID NOT NULL, 
                CONSTRAINT fk_workout 
                    FOREIGN KEY(workout_id) 
                        REFERENCES workouts(id));`)
        await client.query(
            `CREATE TABLE IF NOT EXISTS public.equipment (
                id UUID PRIMARY KEY NOT NULL,
                name VARCHAR(50) NOT NULL, 
                workout_id UUID NOT NULL, 
                CONSTRAINT fk_workout 
                    FOREIGN KEY(workout_id) 
                        REFERENCES workouts(id));`)
        await client.query(
            `CREATE TABLE IF NOT EXISTS public.trainer_tips (
                id UUID PRIMARY KEY NOT NULL,
                name VARCHAR(50) NOT NULL, 
                workout_id UUID NOT NULL, 
                CONSTRAINT fk_workout 
                    FOREIGN KEY(workout_id) 
                        REFERENCES workouts(id));`
        )                                


        console.log('Tables have been created')    
    } catch (error) {
        console.log(error);
    }
}
