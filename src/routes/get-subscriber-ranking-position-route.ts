import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position';

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/invites/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscribe ranking position',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params;

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        });

        return { position };
      }
    );
  };
