import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.1.7:3000/');
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", 'Mobile: ' + this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 52, borderBottomWidth: .4, borderBottomColor: '#9c9c9c' }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        {chatMessages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
