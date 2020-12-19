import { createStore, applyMiddleware, Reducer, Middleware } from 'redux';
import {
  CharacterAction,
  CharactersFavoritesState,
} from './modules/characters/types';

export interface StoreState {
  characters: CharactersFavoritesState;
}

export type StoreAction = CharacterAction;

export default (
  reducers: Reducer<StoreState, StoreAction>,
  middlewares: Middleware[],
) => {
  const enhancer = applyMiddleware(...middlewares);
  return createStore(reducers, enhancer);
};
