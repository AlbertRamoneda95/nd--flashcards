import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button , Toast } from "native-base";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";

function Deck({ deck, navigation }) {
  const { id, title, questions } = deck;

  const visitAddCardForm = () => {
    navigation.navigate("AddCardForm", { deckId: id });
  };

  const visitQuiz = () => {
    let length =  Object.keys(questions).length
    if (length === 0) {
      Toast.show({
        text: "Please Add Card or quiz",
        buttonText: "Okay"
      });
    } else {
      clearLocalNotification().then(setLocalNotification);
      navigation.navigate("Quiz", { deckId: id });
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.cardCount}>
        {Object.keys(questions).length} Cards
      </Text>
      <Button style={styles.button} onPress={visitAddCardForm}>
        <Text style={styles.buttonText}>ADD CARD</Text>
      </Button>
      <Button style={styles.button} onPress={visitQuiz}>
        <Text style={styles.buttonText}>START QUIZ</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "#0f4c75",
    textTransform: "uppercase",
    fontSize: 35,
    marginTop: 40
  },
  cardCount: {
    color: "#7d7d7d",
    fontSize: 15
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 40,
    borderRadius: 10,
    backgroundColor: "#0f4c75"
  },
  buttonText: {
    fontSize: 15,
    color: "white"
  }
});

const mapStateToProps = ({ deck }, { route, navigation }) => {
  const { deckId } = route.params;

  return {
    deck: deck[deckId]
  };
};

export default connect(mapStateToProps)(Deck);
