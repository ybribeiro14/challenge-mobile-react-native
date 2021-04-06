import React from 'react';
import { ModalProps, Modal } from 'react-native';

import { Characters } from '../../store/modules/characters/types';

import {
  ViewModal,
  DataCharacter,
  TitleModal,
  CharacterAvatar,
  TextModal,
  ListEventsAndSeries,
  EventContainer,
} from './styles';

interface ModalDetailsProps extends ModalProps {
  dataCharacter: Characters;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({
  dataCharacter,
  ...rest
}) => {
  return (
    <Modal {...rest}>
      <ViewModal style={{ flex: 1, backgroundColor: '#575353' }}>
        <DataCharacter>
          <TitleModal>Detalhes do Personagem</TitleModal>
          <CharacterAvatar
            source={{
              uri: `${dataCharacter.thumbnail.path}/portrait_xlarge.${dataCharacter.thumbnail.extension}`,
            }}
          />
          <TextModal>{dataCharacter.name}</TextModal>
          <TextModal>{dataCharacter.description}</TextModal>
        </DataCharacter>

        <ListEventsAndSeries
          data={dataCharacter.events.items}
          ListHeaderComponent={<TitleModal>Eventos</TitleModal>}
          keyExtractor={event => event.name}
          renderItem={({ item }) => (
            <EventContainer>
              <TextModal>{item.name}</TextModal>
            </EventContainer>
          )}
        />

        <ListEventsAndSeries
          data={dataCharacter.series.items}
          ListHeaderComponent={<TitleModal>Séries</TitleModal>}
          keyExtractor={event => event.name}
          renderItem={({ item }) => (
            <EventContainer>
              <TextModal>{item.name}</TextModal>
            </EventContainer>
          )}
        />
      </ViewModal>
    </Modal>
  );
};

export default ModalDetails;
