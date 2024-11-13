import { Kafka, logLevel, KafkaConfig } from "kafkajs";

const kafkaConfig: KafkaConfig = {
  brokers: ["cspa3gnp02kgs1f1bbq0.any.us-east-1.mpx.prd.cloud.redpanda.com:9092"],
  ssl: {}, 
  sasl: {
    mechanism: "scram-sha-256", 
    username: "kedari",
    password: "kedari"
  },
  logLevel: logLevel.INFO,
};

export const kafka = new Kafka(kafkaConfig);

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer connected...");
  } catch (error) {
    console.error("Failed to connect Kafka Producer:", error);
  }
};
