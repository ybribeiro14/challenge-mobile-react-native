import { action } from 'typesafe-actions';
import { Characters } from './types';

export const setFavoriteCharacter = (id: number) =>
  action('@character/SET_FAVORITE_CHARACTER', id);

export const loadCharacters = (offset: number) =>
  action('@character/LOAD_CHARACTERS', offset);

export const loadSuccessCharacters = (data: Characters[]) =>
  action('@character/SET_CHARACTERS', data);

export const setTypeFilter = (typeFilter: string) =>
  action('@character/SET_TYPE_FILTER', typeFilter);
