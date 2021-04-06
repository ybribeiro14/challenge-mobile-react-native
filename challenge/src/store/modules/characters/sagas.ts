import { takeLatest, all, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { Characters, CharactersState } from './types';

import { loadSuccessCharacters } from './actions';
import api from '../../../services/api';

export function* setFavoriteLocalStorage({ payload: id }) {
  try {
    let favorites = yield AsyncStorage.getItem('@FavoritesLocal');

    favorites = JSON.parse(favorites);
    console.log('favorites storage', favorites);
    if (favorites) {
      const characterIsFavorite: [] = favorites.filter(
        (fav: number) => fav === id,
      );

      if (characterIsFavorite.length === 0) {
        favorites.push(id);
      } else {
        favorites.splice(favorites.indexOf(id), 1);
      }
    } else {
      favorites = [id];
    }

    yield AsyncStorage.setItem('@FavoritesLocal', JSON.stringify(favorites));

    // atualizar lista de personagens

    const characters = yield select(state => state.characters.characters);
    const arrayCharacters: Characters[] = [];

    characters.map((character: Characters) =>
      arrayCharacters.push({
        id: character.id,
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail,
        series: {
          items: character.series.items,
        },
        events: {
          items: character.series.items,
        },
        favorite: favorites.filter(
          (idFilter: number) => idFilter === Number(character.id),
        ).length,
      }),
    );
    yield put(loadSuccessCharacters(arrayCharacters));
    // yield AsyncStorage.removeItem('@FavoritesLocal');
  } catch (error) {
    console.log(error);
  }
}

export function* getCharacters({ payload: offset }) {
  try {
    let favorites = yield AsyncStorage.getItem('@FavoritesLocal');
    favorites = JSON.parse(favorites);
    const characters = yield select(state => state.characters.characters);
    const textFilter = yield select(state => state.characters.typeFilter);

    const response = yield api.get(
      `/characters?ts=1234&apikey=cfa2c80e2ec760e38aa447fc0636644b&hash=915c6277fcd05b836b2c88564f70590d&offset=${offset}${textFilter}`,
    );

    const arrayCharacters: Characters[] = offset > 0 ? characters : [];

    if (response.data) {
      response.data.data.results.map((character: Characters) =>
        arrayCharacters.push({
          id: character.id,
          name: character.name,
          description: character.description,
          thumbnail: character.thumbnail,
          series: {
            items: character.series.items,
          },
          events: {
            items: character.series.items,
          },
          favorite: favorites.filter(
            (id: number) => id === Number(character.id),
          ).length,
        }),
      );

      console.log(arrayCharacters);

      yield put(loadSuccessCharacters(arrayCharacters));
    }
  } catch (error) {
    console.log(error);
  }
}

export default all([
  takeLatest('@character/SET_FAVORITE_CHARACTER', setFavoriteLocalStorage),
  takeLatest('@character/LOAD_CHARACTERS', getCharacters),
]);
