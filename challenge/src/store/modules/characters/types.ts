import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type CharacterAction = ActionType<typeof actions>;

export interface EventsOrSeriesProps {
  name: string;
}

export interface Characters {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  series: {
    items: EventsOrSeriesProps[];
  };
  events: {
    items: EventsOrSeriesProps[];
  };
  favorite: boolean;
}

export interface CharactersState {
  readonly characters: Characters[];
  readonly loading: boolean;
  readonly typeFilter: string;
}
