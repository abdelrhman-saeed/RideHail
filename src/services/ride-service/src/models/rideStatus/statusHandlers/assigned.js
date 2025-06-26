
import status from "./status.js";


class assigned extends status
{
    handle()
    {
        if (this.rideStatus !== this.status.requested)
            throw new Error(`ride status needs to be "${this.status.requested}" and driver_id is required`)
    }

}

export default assigned
