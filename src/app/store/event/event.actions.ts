import { createActionGroup, props } from '@ngrx/store';
import { Event, Model, WithId } from '@types';

export const EventActions = createActionGroup({
  source: 'event',
  events: {
    LoadAll: props<any>(),
    AddOne: props<{ payload: Event }>(),
    AddMany: props<{ payload: Event[] }>(),
    UpdateOne: props<{ payload: WithId<Partial<Event>> }>(),
    DeleteOne: props<{ payload: Model<Event> }>(),
    SetAll: props<{ payload: Model<Event>[] }>(),
    OnAddOne: props<{ payload: Model<Event> }>(),
    onAddMany: props<{ payload: Model<Event>[] }>(),
    OnUpdateOne: props<{ payload: WithId<Partial<Event>> }>(),
    OnDeleteOne: props<{ payload: Model<Event> }>(),
  },
});
