
import status from "./status.js"


class intransit extends status
{
    handle()
    {
        if (this.rideStatus !== this.status.assigned)
            throw new Error(`ride status needs to be "${this.status.assigned}"`)
    }

}

export default intransit
