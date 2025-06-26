
import assigned from "./statusHandlers/assigned.js"
import canceled from "./statusHandlers/canceled.js"
import completed from "./statusHandlers/completed.js"
import intransit from "./statusHandlers/intransit.js"
import requested from "./statusHandlers/requested.js"
import status from "./statusHandlers/status.js"


const statusHandlers = {
    "ASSIGNED": assigned, "CANCELED": canceled, "IN_TRANSIT": intransit, "COMPLETED": completed, "REQUESTED": requested,
}

/**
 * @param {string} rideStatus
 * @param {string} newStatus
 * @returns {void}
 */

const checkStatus = (rideStatus, newStatus) => {

    if (rideStatus === 'CANCELED')
        throw new Error('can\'t update a ride that\'s already "CANCELED"')

    newStatus = newStatus.toUpperCase()

    if (! statusHandlers[newStatus])
        throw new Error('unsupported ride status!')
   
    /** @type {status} */
    const handler = new (statusHandlers[newStatus]) (rideStatus, newStatus)

    handler.handle()
}

export default checkStatus
