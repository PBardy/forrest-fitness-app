import { ActivityLevelEnum, SexEnum } from '@enums';

export type WithId<T> = T & {
  id: string;
};

export type WithUser<T> = T & {
  userId: string;
};

export type Model<T> = WithId<WithUser<T>>;

export type Sex = {
  label: SexEnum;
};

export type ActivityLevel = {
  label: ActivityLevelEnum;
  description: string;
};

export type Profile = {
  weight: number;
  height: number;
  sex: WithId<Sex>;
  activityLevel: WithId<ActivityLevel>;
  dob: string;
};
