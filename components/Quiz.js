import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import CardItem from './CardItem';
import {Button} from "native-base"
import { saveResettedDeck } from "../utils/api";
import { resetDeck } from "../actions";

class Quiz extends React.Component {

  handleRestart = (deckId) => {
    saveResettedDeck(deckId).then(() => {
      console.log(this.props.dispatch);
      this.props.dispatch(resetDeck(deckId));
    });
  };

  viewDeck = (deckId) => {
    const {navigation } = this.props;
    console.log(deckId);
    navigation.navigate("DeckDetail", { deckId });
  };


  render() {
    const { deck, questionsRemaining} = this.props;
    console.log(deck);
    const questionsArray = Object.values(deck.questions);
    const cardCount = questionsArray.length;
    const correctCount = questionsArray.filter(question => question.correct).length;
    const unansweredQuestions = Object.values(deck.questions)
      .filter(question => question.correct === null);
    console.log(questionsRemaining);
    return (
      <View>
        {questionsRemaining > 0 ? (
          <CardItem
            card={unansweredQuestions[0]}
            deckId={deck.id}
            questionsRemaining={questionsRemaining}
          />
        ) : (
          <View style={styles.center}>
            <Text style={[styles.h4, { marginTop: 40 }]}>Quiz Completed!</Text>
            <Text style={styles.h4}>
              you have awnsered {correctCount} of {cardCount} awnsers Correctly
            </Text>
            <Button style={styles.button} onPress={() => this.handleRestart(deck.id)}>
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </Button>
            <Button style={styles.button} onPress={() => this.viewDeck(deck.id)}>
              <Text style={styles.buttonText}>Back to the Deck</Text>
            </Button>
          </View>
        )}    
      </View>
    );
  }
}


    
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft:10,
    marginRight:10,
    marginTop: 40,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#0f4c75"
  },
  buttonText: {
    color: "white"
  }
});


const mapStateToProps = ({ deck }, { route }) => {
  const {deckId} = route.params
  const questionsRemaining = Object.values(deck[deckId].questions)
  .filter(question => question.correct === null).length;
  return {
    deck: deck[deckId],
    questionsRemaining
  }
}

export default connect(mapStateToProps)(Quiz);
