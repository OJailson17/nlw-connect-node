import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { SubscribeToEvent } from '../functions/subscribe-to-event';

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to an event',
        tags: ['subscriptions'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      const { subscriberId } = await SubscribeToEvent({ name, email });

      return reply.status(201).send({ subscriberId });
    }
  );
};
