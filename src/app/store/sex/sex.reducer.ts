import { createReducer } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Sex, WithId } from '@types';

export const selectId = (a: WithId<Sex>): string => {
  return String(a.id);
};

export type SexState = EntityState<WithId<Sex>>;

export const sexAdapter: EntityAdapter<WithId<Sex>> = createEntityAdapter<
  WithId<Sex>
>({
  selectId,
});

export const initialSexState = sexAdapter.setAll(
  [
    {
      id: '1',
      label: 'Male',
      icon: 'mars',
    },
    {
      id: '2',
      label: 'Female',
      icon: 'venus',
    },
  ],
  sexAdapter.getInitialState()
);

export const sexReducer = createReducer(initialSexState);
