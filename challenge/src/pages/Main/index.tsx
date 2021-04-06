import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as CharactersActions from '../../store/modules/characters/actions';

import ModalDetail from '../../components/ModalDetails';

import {
  Container,
  Filters,
  CharactersList,
  TextName,
  CharacterContainer,
  CharacterAvatar,
  CharacterInfo,
  Title,
  ButtonFavorite,
  InputFilter,
  OptionsFilter,
  LabelCheckbox,
  ViewFilter,
  ButtonFilter,
} from './styles';

import {
  Characters,
  CharactersState,
} from '../../store/modules/characters/types';

const Main: React.FC = props => {
  const [offset, setOffset] = useState<number>(0);
  const [textFilter, setTextFilter] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedFav, setCheckedFav] = useState<boolean>(false);
  const [characterDetail, setCharacterDetail] = useState<Characters>({
    id: '',
    name: '',
    description: '',
    thumbnail: {
      path: '',
      extension: '',
    },
    series: {
      items: [],
    },
    events: {
      items: [],
    },
    favorite: false,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {
    characters,
    loadCharacters,
    setFavoriteCharacter,
    setTypeFilter,
  } = props;

  const handleShowDetails = useCallback(
    async (id: string) => {
      setModalVisible(true);
      console.log(characters);
      const characterFilter = characters.characters.filter(character => {
        return character.id === id;
      });
      console.log(characterFilter[0]);
      const character: Characters = characterFilter[0];
      setCharacterDetail(character);
    },
    [characters],
  );

  const handleSetFavorite = useCallback(
    async (id: string) => {
      setFavoriteCharacter(id);
    },
    [setFavoriteCharacter],
  );

  const handleLoadList = useCallback(async () => {
    const newOffset = offset + 20;
    setOffset(offset + 20);
    loadCharacters(newOffset);
  }, [loadCharacters, offset]);

  const handleFilter = useCallback(async () => {
    console.log(textFilter);

    let text = '';

    if (checked) {
      text = `&name=${textFilter}`;
    }

    setTypeFilter(text);

    loadCharacters(0);
  }, [textFilter, setTypeFilter, checked, loadCharacters]);

  useEffect(() => {
    loadCharacters({
      offset,
      onlyFavorites: false,
    });
  }, []);

  return (
    <Container>
      <ModalDetail
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        dataCharacter={characterDetail}
      />
      <Filters>
        <OptionsFilter>
          <CheckBox
            disabled={false}
            value={checked}
            onValueChange={newValue => setChecked(newValue)}
          />
          <LabelCheckbox>Filtrar por nome</LabelCheckbox>

          <CheckBox
            disabled={false}
            value={checkedFav}
            onValueChange={newValue => setCheckedFav(newValue)}
          />
          <LabelCheckbox>Exibir Somente Favoritos</LabelCheckbox>
        </OptionsFilter>
        <ViewFilter>
          <InputFilter
            placeholder="digite o nome..."
            editable={checked}
            value={textFilter}
            onChangeText={setTextFilter}
          />
          <ButtonFilter onPress={() => handleFilter()}>
            <TextName>Filtrar</TextName>
          </ButtonFilter>
        </ViewFilter>
      </Filters>
      <CharactersList
        data={characters.characters}
        ListHeaderComponent={<Title>Lista de Personagens</Title>}
        keyExtractor={character => character.id}
        onEndReached={() => handleLoadList()}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => {
          if (checkedFav) {
            if (item.favorite) {
              return (
                <CharacterContainer onPress={() => handleShowDetails(item.id)}>
                  <CharacterAvatar
                    source={{
                      uri: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`,
                    }}
                  />
                  <CharacterInfo>
                    <TextName>{item.name}</TextName>
                    <ButtonFavorite onPress={() => handleSetFavorite(item.id)}>
                      <Icon
                        name={item.favorite ? 'star' : 'star-o'}
                        color="#fff"
                        size={30}
                      />
                    </ButtonFavorite>
                  </CharacterInfo>
                </CharacterContainer>
              );
            }
          } else {
            return (
              <CharacterContainer onPress={() => handleShowDetails(item.id)}>
                <CharacterAvatar
                  source={{
                    uri: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`,
                  }}
                />
                <CharacterInfo>
                  <TextName>{item.name}</TextName>
                  <ButtonFavorite onPress={() => handleSetFavorite(item.id)}>
                    <Icon
                      name={item.favorite ? 'star' : 'star-o'}
                      color="#fff"
                      size={30}
                    />
                  </ButtonFavorite>
                </CharacterInfo>
              </CharacterContainer>
            );
          }
        }}
      />

      {characters.loading ? (
        <ActivityIndicator size="large" color="#ffff" />
      ) : (
          <></>
        )}
    </Container>
  );
};

const mapStateToProps = (state: CharactersState) => ({
  characters: state.characters,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(CharactersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
