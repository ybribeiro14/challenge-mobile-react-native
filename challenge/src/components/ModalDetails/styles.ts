import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { EventsOrSeriesProps } from '../../store/modules/characters/types';

export const Container = styled.Modal``;

export const ViewModal = styled.View`
  flex: 1;
  background: #fff;
  margin: 30px 20px;
  border-radius: 5px;
`;

export const DataCharacter = styled.View`
  background: #808080;
  align-items: center;
  justify-content: center;
`;

export const TitleModal = styled.Text`
  font-size: 25px;
  color: #ffff;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const TextModal = styled.Text`
  font-size: 16px;
  color: #ffff;
  text-align: center;
  margin-top: 15px;
`;

export const CharacterAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ListEventsAndSeries = styled(
  FlatList as new () => FlatList<EventsOrSeriesProps>,
)`
  padding: 32px 24px 16px;
`;

export const EventContainer = styled.View``;
