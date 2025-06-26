import status from "./status.js"


class canceled extends status
{
    handle()
    {
        if (this.rideStatus === this.status.completed || this.rideStatus === this.status.intransit)
            throw new Error(`ride status can\'t be "${this.status.completed}" nor "${this.status.intransit}"!`)
    }

}

export default canceled
