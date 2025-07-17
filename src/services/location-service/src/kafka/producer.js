import { Kafka } from "kafkajs";

const kafka    = new Kafka({ brokers: ['kafka:9092'] })
const producer = kafka.producer()

await producer.connect()
//await producer.send({
//
//    topic: 'logs',
//    messages: [
//        { value: 'message-01' }
//    ]
//})
//
//await producer.disconnect()
//
//
export default producer
