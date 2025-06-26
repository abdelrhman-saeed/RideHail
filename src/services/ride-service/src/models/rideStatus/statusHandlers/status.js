

class status
{
    /** @type {Object} */
    status = {
        "requested": "REQUESTED",
        "canceled":  "CANCELED",
        "completed": "COMPLETED",
        "intransit": "IN_TRANSIT",
        "assigned":  "ASSIGNED",
    }

    /**
    * @param {string} rideStatus
    * @param {string} newStatus
    */
    constructor(rideStatus, newStatus)
    {
        if (this.constructor === status)
            throw new Error('Cannot instantiate abstract class "status"')

        this.rideStatus = rideStatus
        this.newStatus  = newStatus

    }

    handle()
    {
        throw new Error('hanlde method must be implemented!')
    }
}

export default status
