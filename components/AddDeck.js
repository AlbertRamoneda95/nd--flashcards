import React from "react";
import { connect } from "react-redux";
import { saveDeck } from "../utils/api";
import { createId } from "../utils/helper";
import { addDeck } from "../actions";
import {
  StyleSheet
} from "react-native";
import { Container, Item,Text,Button, Input } from "native-base";

class AddDeckForm extends React.Component {
  state = {
    value: ""
  };

  handleTitleChange(value) {
    this.setState({ value });
  }

  handleSubmit() {
    const { dispatch, navigation } = this.props;
    const { value } = this.state;
    const id = createId();
    const newDeck = { id, value, questions: {} };

    saveDeck(newDeck).then(() => {
      dispatch(addDeck(newDeck));
      this.setState({ value: "" });
      navigation.navigate("DeckDetail", { deckId: id });
    });
  }

  render() {
    const { value } = this.state;

    return (
      <Container style={styles.center}>
        <Text style={{marginTop:10}}>Title of your new Deck?</Text>
        <Item style={{marginLeft:10, marginRight:10, marginTop:10}} rounded>
          <Input
            placeholder="Insert deck title"    
            value={value}
            onChangeText={text => this.handleTitleChange(text)}
          />
        </Item>
        <Button style={styles.button} onPress={() => this.handleSubmit()}>
          <Text>Create</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    backgroundColor:"#f1fcfc",
    alignItems: "center",
  },
  headerText: {
    color: "#0f4c75",
    fontSize: 30,
    marginBottom: 40,
    marginTop:50
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
    fontSize: 15
  }
});

export default connect()(AddDeckForm);
