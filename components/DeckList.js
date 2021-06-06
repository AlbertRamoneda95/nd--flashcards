import React from "react";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { recieveDecks } from "../actions";
import { TouchableOpacity } from "react-native";
import { Container, Card, CardItem, Body, Content, Text } from "native-base";

class DeckList extends React.Component {
  componentDidMount() {
    getDecks().then(results => {
      const decks = JSON.parse(results) || {};
      console.log(decks);
      this.props.dispatch(recieveDecks(decks));
    });
  }

  viewDeck(id) {
    this.props.navigation.navigate("DeckDetail", { deckId: id });
  }

  viewAddDeckForm() {
    this.props.navigation.navigate("AddDeckForm");
  }

  render() {
    const { deck } = this.props;

    return (
      <Container>
        <Content style={{ backgroundColor: "#f1fcfc" }} padder>
          {Object.keys(deck).map(id => (
            <TouchableOpacity
              key={id}
              onPress={() => {
                this.viewDeck(deck[id].id);
              }}
            >
              <Card  style={{
                    justifyContent: "center",
                    backgroundColor: "#6495ED"
                  }} bordered>
                <CardItem
                  header
                  style={{
                    justifyContent: "center",
                    backgroundColor: "#6495ED"
                  }}
                >
                  <Text style={{ color: "white" }}>{deck[id].value}</Text>
                </CardItem>
                <CardItem style={{ backgroundColor: "#6495ED" }}>
                  <Body style={{ alignItems: "center" }}>
                    <Text style={{ color: "white" }}>
                      {Object.keys(deck[id].questions).length} cards
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
          ))}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ deck }) => ({ deck });

export default connect(mapStateToProps)(DeckList);
