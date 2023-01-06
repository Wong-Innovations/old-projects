import { DELETE_SET, DELETE_CARD, CREATE_SET, CREATE_CARD, GET_CARDS, UPDATE_CARD_WEIGHT, EDIT_CARD, EDIT_SET } from '../constants';

const initialState = {
  flashcards: [
    { name: '',
      description: '',
      card: [
        {
          main: [''],
          secondary: [''],
          answer: '',
          srs: 0
        },
      ]
    },
  ]
};

const flashcardsReducer = (state = initialState, action) => {
  const newFlashcards = state.flashcards;
  switch(action.type) {

    case DELETE_SET:
      newFlashcards.splice(action.setIndex, 1);
      return { flashcards: newFlashcards };

    case DELETE_CARD:
      newFlashcards[action.setIndex].card.splice(action.cardIndex, 1);
      return { flashcards: newFlashcards };

    case CREATE_SET:
      newFlashcards.unshift({
        name: action.name,
        description: action.description,
        card: []
      });
      return { flashcards: newFlashcards };

    case CREATE_CARD:
      newFlashcards[action.setIndex].card.unshift({
        main: action.main,
        secondary: action.secondary,
        answer: action.answer,
        srs: 10
      });
      return { flashcards: newFlashcards };

    case EDIT_CARD:
      newFlashcards[action.setIndex].card[action.cardIndex] = {...action.newCard, srs: newFlashcards[action.setIndex].card[action.cardIndex].srs};
      return { flashcards: newFlashcards };

    case EDIT_SET:
      newFlashcards[action.setIndex].name = action.newSet.name;
      newFlashcards[action.setIndex].description = action.newSet.description;
      return { flashcards: newFlashcards };

    case GET_CARDS:
      return { flashcards: action.data };

    case UPDATE_CARD_WEIGHT:
      newFlashcards[action.setIndex].card[action.cardIndex].srs += action.weightChange;
      if (newFlashcards[action.setIndex].card[action.cardIndex].srs < 1)
        newFlashcards[action.setIndex].card[action.cardIndex].srs = 1;
      return state;
      
    default:
      return state;
  }
}

export default flashcardsReducer;