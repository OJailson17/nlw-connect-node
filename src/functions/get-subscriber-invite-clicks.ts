import { redis } from '../redis/client';

interface GetSubscriberInviteClicksParams {
  subscriberId: string;
}

export const getSubscriberInviteClicks = async ({
  subscriberId,
}: GetSubscriberInviteClicksParams) => {
  const count = await redis.hget('referral:access-count', subscriberId);

  return {
    count: count ? Number.parseInt(count) : 0,
  };
};
