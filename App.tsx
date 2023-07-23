import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, Appbar, Button, TextInput, RadioButton } from 'react-native-paper';

export default function App() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('Text');
  const [running, setRunning] = useState(0);

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  return (
    <PaperProvider theme={paperTheme}>
      <Appbar.Header>
        <Appbar.Content title="NFC Card Emu" />
      </Appbar.Header>
      <View style={styles.container}>
        <RadioButton.Group onValueChange={mode => setMode(mode)} value={mode}>
          <View style={styles.row}>
            <View style={styles.row}>
              <RadioButton.Android
                value="Text"
                disabled={running == 1}
              />
              <Text>Text</Text>
            </View>
            <View style={styles.row}>
              <RadioButton.Android
                value="URL"
                disabled={running == 1}
              />
              <Text>URL</Text>
            </View>
          </View>
        </RadioButton.Group>
        <TextInput
          style={styles.input}
          mode="outlined"
          label={mode}
          value={text}
          onChangeText={text => setText(text)}
          disabled={running == 1}
          multiline
        />
        <Button
          style={styles.button}
          mode="contained"
          icon={['play', 'pause'][running]}
          onPress={() => setRunning((running + 1) % 2)}
          disabled={text.trim() == ''}
        >
          {['Start', 'Stop'][running]}
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '95%',
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
});
