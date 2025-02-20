import { redis } from '../redis/client';

interface AccessInviteLinkParams {
  subscriberId: string;
}

export const accessInviteLink = async ({
  subscriberId,
}: AccessInviteLinkParams) => {
  await redis.hincrby('referral:access-count', subscriberId, 1);
};
