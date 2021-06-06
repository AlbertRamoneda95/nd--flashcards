import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { setLocalNotification } from "./utils/helper";
import Deck from "./components/DeckItem";
import AddCardForm from "./components/AddCard";
import Quiz from "./components/Quiz";
import Card from "./components/CardItem";
import TabNavigator from "./components/TabNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";


const Stack = createStackNavigator();
const store = createStore(reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      //assync load necessary font family on android texts
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({  loading: false });
    setLocalNotification();
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Root>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitle: "UdaciCards",
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#1b262c" }
              }}
            >
              <Stack.Screen name="Home" component={TabNavigator} />
              <Stack.Screen
                name="DeckDetail"
                component={Deck}
              />
              <Stack.Screen name="AddCardForm" component={AddCardForm} />
              <Stack.Screen name="Quiz" component={Quiz} />
              <Stack.Screen name="Card" component={Card} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </Root>
    );
  }
}

export default App;
