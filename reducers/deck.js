import {
  ADD_DECK,
  ADD_DECK_QUESTION,
  MAKE_DECK_QUESTION_CORRECT,
  RESET_DECK,
  RECEIVE_DECKS
} from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK: {
      const newState = {
        ...state,
        [action.deck.id]: action.deck
      };
      return newState;
    }
    
    case ADD_DECK_QUESTION: {
      const { deckId, question } = action.deckQuestion;
      const deck = state[deckId];

      const newState = {
        ...state,
        [deckId]: {
          ...deck,
          questions: {
            ...deck.questions,
            [question.id]: question
          }
        }
      };
      return newState;
    }
    case MAKE_DECK_QUESTION_CORRECT: {
      const { deckId, questionId, correct } = action.deckQuestionCorrect;
      const deck = state[deckId];
      const questions = deck.questions;
      const question = questions[questionId];

      const newState = {
        ...state,
        [deckId]: {
          ...deck,
          questions: {
            ...questions,
            [questionId]: {
              ...question,
              correct
            }
          }
        }
      };
      return newState;
    }

    case RESET_DECK: {
      const deck = state[action.id];

      const newState = {
        ...state,
        [action.id]: {
          ...deck,
          questions: Object.values(deck.questions).reduce((accumulator, question) => {
            accumulator[question.id] = { ...question, correct: null };
            return accumulator;
          }, {})
        }
      };

      return newState;
    }

    case RECEIVE_DECKS:
      return action.decks;
    default:
      return state;
  }
}
