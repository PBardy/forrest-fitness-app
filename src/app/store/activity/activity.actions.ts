import { createActionGroup, props } from '@ngrx/store';
import { Activity, Model, WithId } from '@types';

export const ActivityActions = createActionGroup({
  source: 'Activity',
  events: {
    LoadAll: props<any>(),
    AddOne: props<{ payload: Activity }>(),
    UpdateOne: props<{ payload: WithId<Partial<Activity>> }>(),
    DeleteOne: props<{ payload: Model<Activity> }>(),
    SetAll: props<{ payload: Model<Activity>[] }>(),
    OnAddOne: props<{ payload: Model<Activity> }>(),
    OnUpdateOne: props<{ payload: WithId<Partial<Activity>> }>(),
    OnDeleteOne: props<{ payload: Model<Activity> }>(),
  },
});
