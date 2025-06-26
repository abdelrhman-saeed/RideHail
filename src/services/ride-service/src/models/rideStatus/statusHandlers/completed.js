import status from "./status.js"


class completed extends status
{
    handle()
    {
        if (this.rideStatus !== this.status.intransit)
            throw new Error(`ride status needs to be "${this.status.intransit}"`)
    }

}

export default completed
