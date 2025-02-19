import { db } from '../drizzle/client';
import { subscriptions } from '../drizzle/schema/subscriptions';

interface SubscribeToEventParams {
  name: string;
  email: string;
}

export const SubscribeToEvent = async ({
  email,
  name,
}: SubscribeToEventParams) => {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning();

  const subscriber = result[0];

  return {
    subscriberId: subscriber.id,
  };
};
