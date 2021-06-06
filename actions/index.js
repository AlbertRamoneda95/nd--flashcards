export const ADD_DECK = 'ADD_DECK';
export const ADD_DECK_QUESTION = 'ADD_DECK_QUESTION';
export const MAKE_DECK_QUESTION_CORRECT = 'MAKE_DECK_QUESTION_CORRECT';
export const RESET_DECK = 'RESET_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
};

export function addDeckQuestion(deckQuestion) {
  return {
    type: ADD_DECK_QUESTION,
    deckQuestion,
  };
};

export function addDeckQuestionCorrect(deckQuestionCorrect) {
  return {
    type: MAKE_DECK_QUESTION_CORRECT,
    deckQuestionCorrect,
  };
};

export function resetDeck(id) {
  return {
    type: RESET_DECK,
    id,
  };
};

export function recieveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}
