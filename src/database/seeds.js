import * as db from '../config/database.js'
import bcrypt from 'bcrypt'


import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const data = require('./db.json')



const insertMembers = async() => {
    const saltRounds = 10;
    try{
        data.members.forEach(async(member) =>  {
            const hashed_password = bcrypt.hashSync(member.password, saltRounds);
            
            const text = 'INSERT INTO public.members(id, name, gender, dateOfBirth, email, password) VALUES($1, $2, $3, $4, $5, $6)'
            const values = [member.id, member.name, member.gender, member.dateOfBirth, member.email, hashed_password]
    
            const res = await db.query(text, values);
        })
        console.log('users seeded');
    } catch (error) {
        console.log(error);
    }    
}

const insertWorkouts = async() => {
    try {
        data.workouts.forEach(async(workout) => {
            const text = 'INSERT INTO public.workouts(id, name, mode) VALUES($1, $2, $3)'
            const values = [workout.id, workout.name, workout.mode]
            await db.query(text, values);
            
            workout.equipment.forEach(async(equip) => {
                const text = 'INSERT INTO public.equipment(id, name, workout_id) VALUES($1, $2, $3)'
                const values = [crypto.randomUUID() ,equip, workout.id]
                await db.query(text, values)
            })
            workout.exercises.forEach(async(exercise) => {
                const text = 'INSERT INTO public.exercises(id, name, workout_id) VALUES($1, $2, $3)'
                const values = [crypto.randomUUID(), exercise, workout.id]
                await db.query(text, values)
            })
            workout.trainerTips.forEach(async(tip) => {
                const text = 'INSERT INTO public.trainer_tips(id, name, workout_id) VALUES($1, $2, $3)'
                const values = [crypto.randomUUID(), tip, workout.id]
                await db.query(text, values)
            })
        })
        console.log('workouts seeded')    
    } catch (error) {
        console.log(error);
    }
}

await insertMembers();
await insertWorkouts();