import { Kafka } from "kafkajs";
import fs from 'fs'

const kafka    = new Kafka({ brokers:      ['kafka:9092'] })
const consumer = kafka.consumer({ groupId: 'logger' })

await consumer.connect()
await consumer.subscribe({
    topic:         'logs',
    numPartitions: 1,
    fromBeginning: true
})

await consumer.run({

    eachMessage: async({ message }) => {

        const log = message.value.toString()

        try {
            fs.appendFileSync('../log.txt', log + '\n')
            console.log(`Received log: ${log}`)
        }
        catch(err) {
            console.log(`err: ${err.message}`)
        }
    }
})
