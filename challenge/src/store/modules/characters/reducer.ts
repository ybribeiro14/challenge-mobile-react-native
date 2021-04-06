import { Reducer } from 'redux';
import { CharacterAction, CharactersState } from './types';

const INITIAL_STATE: CharactersState = {
  characters: [],
  loading: false,
  typeFilter: '',
};

const reducer: Reducer<CharactersState> = (
  state = INITIAL_STATE,
  action: CharacterAction,
) => {
  switch (action.type) {
    case '@character/SET_CHARACTERS':
      return { ...state, loading: false, characters: action.payload };
    case '@character/LOAD_CHARACTERS':
      return { ...state, loading: true };
    case '@character/SET_FAVORITE_CHARACTER':
      return { ...state, loading: true };
    case '@character/SET_TYPE_FILTER':
      return { ...state, typeFilter: action.payload };
    default:
      return state;
  }
};

export default reducer;
