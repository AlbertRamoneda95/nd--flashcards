import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "native-base";
import { saveDeckQuestionCorrect } from "../utils/api";
import { addDeckQuestionCorrect } from "../actions";

class Card extends React.Component {
  state = {
    showAnswer: false
  };

  toggleShowAnswer() {
    this.setState(prevState => ({ showAnswer: !prevState.showAnswer }));
  }

  handleCorrect(correct) {
    const { dispatch, deckId, card } = this.props;
    const deckQuestionCorrect = {
      deckId: deckId,
      questionId: card.id,
      correct
    };

    saveDeckQuestionCorrect(deckQuestionCorrect).then(() => {
      this.setState({ showAnswer: false });
      dispatch(addDeckQuestionCorrect(deckQuestionCorrect));
    });
  }

  render() {
    const { card } = this.props;

    return (
      <View style={styles.center}>
        <Text style={[styles.questionText, { marginTop: 40 }]}>
          {card.question}
        </Text>
        <Button transparent onPress={() => this.toggleShowAnswer()}>
          <Text>SHOW ANSWER</Text>
        </Button>
        {this.state.showAnswer && (
          <Text style={[styles.questionAnswer, { marginTop: 20 }]}>
            {card.answer}
          </Text>
        )}
        <Button
          style={[styles.button, { backgroundColor: "#48b51d" }]}
          onPress={() => this.handleCorrect(true)}
        >
          <Text style={[styles.buttonText, { color: "#ffffff" }]}>CORRECT</Text>
        </Button>
        <Button
          style={[styles.button, { backgroundColor: "#e04848" }]}
          onPress={() => this.handleCorrect(false)}
        >
          <Text style={[styles.buttonText, { color: "#ffffff" }]}>
            INCORRECT
          </Text>
        </Button>
        <Text style={[styles.buttonText, { marginTop: 20 }]}>
          {this.props.questionsRemaining} QUESTION(S) REMAINING
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft:20
  },
  questionText: {
    color: "#0f4c75",
    fontSize: 40,
    fontWeight:"bold",
  },
  questionAnswer:{
    color: "#5b8c85",
    fontSize: 30,
  },
  button: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#dbd9d9"
  },
  buttonText: {
    fontSize: 15
  }
});

export default connect()(Card);
