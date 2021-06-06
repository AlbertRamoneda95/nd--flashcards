import { AsyncStorage } from 'react-native';

export const DECKS_ITEM_KEY = 'DECKS';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_ITEM_KEY);
};

export function saveDeck(deck) {
  console.log(deck)
  return AsyncStorage.mergeItem(DECKS_ITEM_KEY, JSON.stringify({
    [deck.id]: deck,
  }));
};

export function saveDeckQuestion(deckQuestion) {
  const { deckId, question } = deckQuestion;

  return getDecks().then((results) => {
    const decks = JSON.parse(results);
    const items = decks[deckId];
    
    AsyncStorage.mergeItem(DECKS_ITEM_KEY, JSON.stringify({
      [deckId]: {
        ...items,
        questions: {
          ...items.questions,
          [question.id]: question,
        },
      },
    }));
  });
};

export function saveDeckQuestionCorrect(correctAnswer) {
  const { deckId, questionId, correct } = correctAnswer;
  
  return getDecks().then((results) => {
    const items = JSON.parse(results);
    const single = items[deckId];
    const question = single.questions[questionId];

    AsyncStorage.mergeItem(DECKS_ITEM_KEY, JSON.stringify({
      [deckId]: {
        ...single,
        questions: {
          ...single.questions,
          [questionId]: {
            ...question,
            correct,
          },
        },
      },
    }));
  });
};

export function saveResettedDeck(deckId) {
  return getDecks().then((results) => {
    const decks = JSON.parse(results);
    const deck = decks[deckId];

    AsyncStorage.mergeItem(DECKS_ITEM_KEY, JSON.stringify({
      [deckId]: {
        ...deck,
        questions: Object.values(deck.questions).reduce(
          (acc, question) => {
            acc[question.id] = { ...question, correct: null };
            return acc;
          },
          {},
        ),
      },
    }));
    debugger;
  });
};
