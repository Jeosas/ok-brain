import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.view}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default HomeScreen;
