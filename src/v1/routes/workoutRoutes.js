import express from 'express'
import { 
    createNewWorkout, 
    deleteOneWorkout, 
    getAllWorkouts, 
    getOneWorkout, 
    updateOneWorkout } 
from '../../controllers/workoutController.js';
import { getRecordForWorkout } from '../../controllers/recordController.js';






export const router = express.Router();

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get('/', getAllWorkouts)

router.get('/:workoutId', getOneWorkout)

router.get('/:workoutId/records', getRecordForWorkout)

router.post('/', createNewWorkout)

router.patch('/:workoutId', updateOneWorkout)

router.delete('/:workoutId', deleteOneWorkout)

