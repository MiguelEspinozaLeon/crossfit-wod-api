import * as recordService from '../services/recordService.js'

export const getRecordForWorkout = (req, res) => {
    try{
        const {params: {workoutId}} = req;
        if (!workoutId) {
            res
                .status(400).send({status: 'FAILED', data: {error: 'Parameter workoutId cannot be empty.'}})
        }

        const records = recordService.getRecordForWorkout(workoutId)
        res.send({status: 'OK', data: records})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}