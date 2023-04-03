import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SexState, sexAdapter } from './sex.reducer';

const { selectAll } = sexAdapter.getSelectors();

export const selectSexFeature = createFeatureSelector<SexState>('sex');

export const selectSexes = createSelector(selectSexFeature, selectAll);
