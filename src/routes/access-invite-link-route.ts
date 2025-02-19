import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { env } from '../env';
import { AccessInviteLink } from '../functions/access-invite-link';

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access an invite link and redirect users',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params;

      await AccessInviteLink({ subscriberId });

      const redirectUrl = new URL(env.WEB_URL);

      redirectUrl.searchParams.set('referrer', subscriberId);

      return reply.redirect(redirectUrl.toString(), 302);
    }
  );
};
