import { combineReducers } from 'redux';
import { StoreState } from '../createStore';

import characters from './characters/reducer';

export default combineReducers<StoreState>({
  characters,
});
