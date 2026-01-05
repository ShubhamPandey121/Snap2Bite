import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../providers/AuthProvider';
import { isValidEmail, isValidPassword } from '../../lib/utils/validators';
import { useTheme } from '../../providers/ThemeProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!isValidEmail(email) || !isValidPassword(password)) {
      Alert.alert('Invalid', 'Check email/password.');
      return;
    }

    try {
      await signIn(email, password);
    } catch {
      Alert.alert('Error', 'Login failed – check credentials.');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.bg },
      ]}
    >
      <Text
        style={[
          theme.typography.h1,
          styles.title,
          { color: theme.colors.text },
        ]}
      >
        Sign In
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign In" onPress={handleSubmit} variant="primary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
});
