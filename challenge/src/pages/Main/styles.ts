import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import {
  Characters,
  EventsOrSeriesProps,
} from '../../store/modules/characters/types';

export const Container = styled.View`
  flex: 1;
  background: #000;
`;

export const OptionsFilter = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const LabelCheckbox = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Filters = styled.View`
  padding: 24px;
  background: #696969;
`;
export const ViewFilter = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 20px;
  height: 70px;
`;

export const InputFilter = styled.TextInput`
  background: #fff;
  padding: 10px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
`;

export const ButtonFilter = styled.TouchableOpacity`
  height: 50px;
  padding: 10px;
  background: red;
  margin-left: 15px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const CharactersList = styled(
  FlatList as new () => FlatList<Characters>,
)`
  padding: 32px 24px 16px;
`;

export const TextName = styled.Text`
  font-size: 16px;
  color: #ffff;
  font-weight: bold;
  max-width: 150px;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: #ffff;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const CharacterContainer = styled.TouchableOpacity`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const CharacterAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const CharacterInfo = styled.View`
  flex: 1;
  margin-left: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonFavorite = styled.TouchableNativeFeedback``;
