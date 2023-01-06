import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCard, createCard, editCard } from '../actions/flashcards';

import Flashcard from './Flashcard';
import SwipeableNewFlashcard from './SwipeableNewFlashcard';

const EditCards = ({ navigation, route }) => {

  const [buttonVisible, setButtonVisible] = useState(1);
  const [addingCard, setAddingCard] = useState(false);
  const [updateCardNum, setUpdateCardNum] = useState(-1);
  const [editCardNum, setEditCardNum] = useState(-1);
  const [newCard, setNewCard] = useState({
    main: [''],
    secondary: [''],
    answer: ''
  });
  const [updateCard, setUpdateCard] = useState({
    main: [''],
    secondary: [''],
    answer: ''
  });

  const flashcards = useSelector(state => state.flashcards[route.params.setIndex]);

  const dispatch = useDispatch();
  const deletecard = (setIndex, cardIndex) => dispatch(deleteCard(setIndex, cardIndex));
  const editcard = (setIndex, cardIndex, value) => dispatch(editCard(setIndex, cardIndex, value));
  const savecard = (setIndex, card) => dispatch(createCard(setIndex, card));

  // setAsyncCall(true);
  // localGetFlashcards().then((val) => setFlashcards(val)).then(() => setAsyncCall(false));

  const openContext = (index) => {
    setEditCardNum(index);
  }

  const closeContext = () => {
    setEditCardNum(-1);
  }

  const addCard = () => {
    setAddingCard(true);
    setButtonVisible(0);
  }

  const saveCard = () => {
    if (addingCard) {
      savecard(route.params.setIndex, newCard);
      closeCard();
    }
    else {
      editcard(route.params.setIndex,updateCardNum,updateCard);
      setUpdateCardNum(-1);
      setButtonVisible(1);
    }
  }

  const closeCard = () => {
    setNewCard({
      main: [''],
      secondary: [''],
      answer: ''
    });
    setButtonVisible(1);
    setAddingCard(false);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: (flashcards !== null) ? flashcards.name : 'test',
    });
  });

  return (flashcards === null) ? null : (
    <View style={{ flex: 1, paddingBottom: 110 }}>
      {/* Flashcard Wrapper */}
      <ScrollView style={styles.flashcardWrapper}>
        {(addingCard) ? (
          <View style={styles.flashcard}>
            <SwipeableNewFlashcard
              value={newCard}
              onChangeText={setNewCard}
            />
          </View>
        ) : null}
        {flashcards.card.map((flashcard, index) => {
          return (index === updateCardNum)? (
            <View style={styles.flashcard}>
              <SwipeableNewFlashcard
                value={updateCard}
                onChangeText={setUpdateCard}
              />
            </View>
          ) : (
            <View style={styles.flashcard}>
              <Flashcard
                main={flashcard.main}
                secondary={flashcard.secondary}
                onLongPress={() => openContext(index)}
              />
            </View>
          )
        })}
      </ScrollView>

      {/* Bottom Button */}
      {(buttonVisible)? (<View style={styles.bottom}>
        <TouchableOpacity onPress={addCard}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>NEW CARD</Text>
          </View>
        </TouchableOpacity>
      </View>) : (<View style={styles.bottom}>
        <TouchableOpacity onPress={() => saveCard()}>
          <View style={{
            ...styles.buttonWrapper,
            backgroundColor: '#32cd32',
            borderWidth: 0,
          }}>
            <Text style={{...styles.buttonText,color:'#FFF'}}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </View>)}

      {(editCardNum > -1)? (
        <View style={{
          ...styles.bottom,
          borderWidth:2,
          borderRadius:25,
          backgroundColor:'#FFF',
          zIndex:1000,
        }}>
          <TouchableOpacity onPress={() => {
            setUpdateCard(flashcards.card[editCardNum]);
            setUpdateCardNum(editCardNum);
            setEditCardNum(-1);
            setButtonVisible(0);
          }}>
            <View style={styles.contextButtons}>
              <Text style={styles.buttonText}>EDIT</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: 350,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity onPress={() => {
            deletecard(route.params.setIndex, editCardNum);
            closeContext();
          }}>
            <View style={styles.contextButtons}>
              <Text style={styles.buttonText}>DELETE</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: 350,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity onPress={closeContext}>
            <View style={styles.contextButtons}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null }
    </View>
  );
}

const styles = StyleSheet.create({
  flashcardWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flashcard: {
    marginTop: 25,
  },
  answerWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 36
  },
  buttonWrapper: {
    width: 350,
    height: 50,
    borderRadius: 50,
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  contextButtons: {
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default EditCards;