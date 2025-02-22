import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks';

export const getSubscriberInviteClickRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/invites/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscribe invite clicks ranking',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params;

        const { count } = await getSubscriberInviteClicks({ subscriberId });

        return { count };
      }
    );
  };
