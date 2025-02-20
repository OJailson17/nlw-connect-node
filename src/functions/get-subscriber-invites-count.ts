import { redis } from '../redis/client';

interface GetSubscriberInvitesCountParams {
  subscriberId: string;
}

export const getSubscriberInvitesCount = async ({
  subscriberId,
}: GetSubscriberInvitesCountParams) => {
  const count = await redis.zscore('referral:ranking', subscriberId);

  return {
    count: count ? Number.parseInt(count) : 0,
  };
};
