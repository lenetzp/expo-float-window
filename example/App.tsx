import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as FloatWindow from 'float-window';

export default function App() {
  console.log('xxx',FloatWindow.isFloatwindowOpen());
  
  const openHandle = () => {
    console.log('openHandle');
    
    FloatWindow.openFloatwindow()
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={openHandle}>
        <Text>xxx{FloatWindow.isFloatwindowOpen()}xxx</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
