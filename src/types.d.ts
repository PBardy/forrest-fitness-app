import { FormControl } from '@angular/forms';
import { ScheduleEvery } from '@capacitor/local-notifications';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type WithId<T> = T & {
  id: string;
};

export type WithUser<T> = T & {
  userId: string;
};

export type Model<T> = WithId<WithUser<T>>;

export type FormGroupOf<T> = {
  [key in keyof T]: FormControl<T[key]>;
};

export type NullableFormGroupOf<T> = {
  [key in keyof T]: FormControl<T[key] | null>;
};

export type Workout = {
  icon: IconProp;
  label: string;
  energy: number;
  intensity: number;
  duration: number;
};

export type Activity = {
  title: string;
  workout: WithId<Workout>;
  start: string;
  steps?: number;
  energy?: number;
  duration?: number;
  intensity?: number;
  distance?: number;
  notes?: string;
};

export type Event = {
  title: string;
  end: string;
  start: string;
  delay: WithId<EventDelay>;
  repeat: WithId<EventRepeat>;
  workout: WithId<Workout>;
  completed: boolean;
};

export type EventDelay = {
  label: string;
  by: number | null;
};

export type EventRepeat = {
  label: string;
  every?: ScheduleEvery;
};

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
  name: string;
};

export type SexEnum = 'Male' | 'Female';

export type ActivityLevelEnum =
  | 'Inactive'
  | 'Moderate'
  | 'Active'
  | 'Very Active';

export type Range = 'Daily' | 'Weekly' | 'Monthly';

export type Summary = {
  energy: number;
  distance: number;
  intensity: number;
  percentage: number;
};

export type Settings = {
  events: {
    delay: WithId<EventDelay>;
    repeat: WithId<EventRepeat>;
    workout: WithId<Workout>;
  };
};

export type Period = {
  end: Date;
  start: Date;
};
