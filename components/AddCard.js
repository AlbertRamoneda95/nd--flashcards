import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Toast } from "native-base";
import { Item, Input } from "native-base";
import { createId } from "../utils/helper";
import { saveDeckQuestion } from "../utils/api";
import { addDeckQuestion } from "../actions";

class AddCardForm extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  handleTextChange(text, key) {
    this.setState({ [key]: text });
  }

  handleSubmit() {
    const { question, answer } = this.state;

    if (question === "" || answer === "") {
      Toast.show({
        text: "Please Enter both details",
        buttonText: "Okay"
      });
    } else {
      const { deckId } = this.props.route.params;
      const newQuestion = {
        deckId: deckId,
        question: {
          id: createId(),
          correct: null,
          question,
          answer
        }
      };

      saveDeckQuestion(newQuestion).then(() => {
        this.props.dispatch(addDeckQuestion(newQuestion));
        this.setState({ question: "QUESTION", answer: "ANSWER" });
        this.props.navigation.goBack();
      });
    }
  }

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.center}>
        <Text style={styles.headerText}>ADD CARD</Text>
        <Item style={styles.textInput} rounded>
          <Input
            placeholder="Enter Card Question"
            value={question}
            onChangeText={text => this.handleTextChange(text, "question")}
          />
        </Item>
        <Item style={styles.textInput} rounded>
          <Input
            placeholder="Enter Card Answer"
            value={answer}
            onChangeText={text => this.handleTextChange(text, "answer")}
          />
        </Item>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSubmit()}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "#0f4c75",
    fontSize: 35,
    marginTop: 40
  },
  textInput: {
    marginTop: 40,
    width: 300,
    backgroundColor: "#ededed"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 50,
    width: 200,
    borderRadius: 10,
    backgroundColor: "#0f4c75"
  },
  buttonText: {
    fontSize: 15,
    color: "white"
  }
});

const mapStateToProps = (_, { navigation }) => ({ navigation });

export default connect(mapStateToProps)(AddCardForm);
