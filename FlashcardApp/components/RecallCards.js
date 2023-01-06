import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { updateCardWeight } from '../actions/flashcards';

import Flashcard from './Flashcard';

const RecallCards = ({ navigation, route }) => {

  const flashcards = useSelector(state => state.flashcards[route.params.setIndex]);

  const dispatch = useDispatch();

  const getRandomCard = () => {
    let cdf = [0];
    let counter = 0;
    flashcards.card.map((card) => {
      counter += card.srs;
      cdf.push(counter);
    });
    const randomNum = Math.floor(Math.random() * cdf[cdf.length-1]);
    let start = 0, end = cdf.length-1;
    while (start <= end) {
      let mid = Math.floor((end+start)/2);
      if (start === end)
        return mid;
      else if (cdf[mid] <= randomNum && randomNum <= cdf[mid+1])
        return mid;
      else if (cdf[mid] < randomNum) 
        start = mid + 1;
      else
        end = mid;
    }
  }

  const [guess, setGuess] = useState('');
  const [cardCompleted, setCardCompleted] = useState(false);
  const [cardNumber, setCardNumber] = useState(getRandomCard());

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: flashcards.name
    });
  });

  const handleCheckGuess = () => {
    Keyboard.dismiss();
    if (guess == flashcards.card[cardNumber].answer) {
      dispatch(updateCardWeight(route.params.setIndex, cardNumber, 2));
      setCardCompleted(true);
      setTimeout(() => {
        handleChangeCard();
        setCardCompleted(false);
        while (true) {
          let newIndex = getRandomCard();
          if (cardNumber !== newIndex) {
            setCardNumber(newIndex);
            break;
          }
        }
      } , 1500);
    } else {
      dispatch(updateCardWeight(route.params.setIndex, cardNumber, -1));
    }
    setGuess('');
  }

  const handleChangeCard = () => {

  }

  return (
    <View style={{ flex: 1 }}>
      {/* Flashcard Wrapper */}
      <View style={styles.flashcardWrapper}>
        <View style={styles.flashcard}>
          <Flashcard
            main={flashcards.card[cardNumber].main}
            secondary={flashcards.card[cardNumber].secondary}
          />
        </View>

      </View>

      {/* Answer Verification */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.answerWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Answer'}
          value={guess}
          onChangeText={text => setGuess(text)}
        />

        <TouchableOpacity onPress={handleCheckGuess}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Check</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Bottom Button */}
      {(flashcards.card.length > 3)? (<View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate('ChoiceCards', { setIndex: route.params.setIndex })}>
          <View style={styles.bottomButtonWrapper}>
            <Text style={styles.buttonText}>MULTIPLE CHOICE</Text>
          </View>
        </TouchableOpacity>
      </View>) : null}

      {/* Success Modal */}
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={cardCompleted}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Icon
              reverse
              name={'check'}
              type={'font-awesome'}
              color={'#32cd32'}
              reverseColor={'#FFF'}
              size={30}
            />
            <Text style={styles.modalText}>Good Job!</Text>
          </View>
        </View>
        
      </Modal>
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
    marginBottom: 15,
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
  buttonWrapper: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 36
  },
  bottomButtonWrapper: {
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modal: {
    width: 250,
    height: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
});

export default RecallCards;