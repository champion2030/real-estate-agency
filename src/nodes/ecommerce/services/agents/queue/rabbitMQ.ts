import amqp, { Connection, Options } from 'amqplib';
import { rabbitMQ } from '../../../../../global.config';
import logger from '../../../../../utils/logger';
import { LogicError } from '../../../../../utils/LogicError';
import { AgentsQueues } from '../agent.type';
import { MESSAGE_NOT_FOUND_TO_CONSUME } from '../../../../../errorCodes.config';

export default class QueueUtil {
  static async connect(): Promise<Connection> {
    try {
      return amqp.connect(rabbitMQ);
    } catch (error) {
      logger.error(error);
    }
  }

  static async consumeRPC(
    queue: AgentsQueues,
    queueOptions: Options.AssertQueue,
    consumeOptions: Options.Consume,
    consumerService: (params?: any) => any,
  ): Promise<void> {
    try {
      const connection = await this.connect();
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, queueOptions);
      await channel.prefetch(1);
      await channel.consume(
        queue,
        async (consumeMessage) => {
          if (consumeMessage) {
            const response = await consumerService(
              consumeMessage.content && consumeMessage.content.length > 0
                ? JSON.parse(consumeMessage.content.toString())
                : {},
            );

            channel.sendToQueue(
              consumeMessage.properties.replyTo,
              Buffer.from(JSON.stringify(response)),
              { correlationId: consumeMessage.properties.correlationId },
            );

            channel.ack(consumeMessage);
          } else {
            throw new LogicError(MESSAGE_NOT_FOUND_TO_CONSUME);
          }
        },
        consumeOptions,
      );
    } catch (error) {
      logger.error(error);
    }
  }

  static async sendMessageToQueue(
    queue: AgentsQueues,
    queueOptions: Options.AssertQueue,
    publishOptions: Options.Publish,
    message?: any,
  ): Promise<void> {
    try {
      const connection = await this.connect();
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, queueOptions);
      channel.sendToQueue(
        queue,
        Buffer.from(message ? JSON.stringify(message) : ''),
        publishOptions,
      );
    } catch (error) {
      logger.error(error);
    }
  }
}
