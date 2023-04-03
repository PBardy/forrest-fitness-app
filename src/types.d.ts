import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type WithId<T> = T & {
  id: string;
};

export type WithUser<T> = T & {
  userId: string;
};

export type Model<T> = WithId<WithUser<T>>;

export type Sex = {
  icon: IconProp;
  label: SexEnum;
};

export type ActivityLevel = {
  icon: IconProp;
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

export type SexEnum = 'Male' | 'Female';

export type ActivityLevelEnum =
  | 'Inactive'
  | 'Moderate'
  | 'Active'
  | 'Very Active';