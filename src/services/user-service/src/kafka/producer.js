
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['kafka:9092']
})
const producer = kafka.producer()

await producer.connect()

export const sendKafkaMessage = async (topic, key, value) => {

    await producer.send({
        topic,
        messages: [{ key, value: JSON.stringify(value) }]
    })
}
