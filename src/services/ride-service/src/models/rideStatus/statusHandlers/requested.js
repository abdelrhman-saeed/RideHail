import status from "./status.js"


class requested extends status
{
    handle()
    {
        if (this.ride.status !== this.status.assigned)
            throw new Error(`ride status needs to be "${this.status.assigned}"`)
    }

}

export default requested
