import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { requestOtp } from '../api/client';
import { COLORS } from '../theme/colors';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!phone.trim()) {
      Alert.alert('Enter phone number', 'Please enter your phone number to continue.');
      return;
    }

    try {
      setLoading(true);
      await requestOtp(phone.trim());
      // For now we skip OTP entry/verification and go straight to Home.
      navigation.replace('Home');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      Alert.alert('Login failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen center>
      <View style={{ width: '100%', maxWidth: 380 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 }}>
          Lifeline
        </Text>
        <Text style={{ fontSize: 16, color: COLORS.textSecondary, marginBottom: 24 }}>
          Telemedicine for rural communities.
        </Text>

        <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 8 }}>
          Phone number
        </Text>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 }}>
          We use this to send a one-time code when enabled. For this pilot, you may be logged in directly.
        </Text>
        <TextInput
          placeholder="Enter your phone"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: COLORS.border,
            backgroundColor: COLORS.surface,
            color: COLORS.textPrimary,
            padding: 12,
            borderRadius: 12,
            marginBottom: 16,
          }}
        />

        <PrimaryButton title="Continue" loading={loading} onPress={handleContinue} />
        <View style={{ height: 12 }} />
        <PrimaryButton
          title="Continue as guest"
          variant="secondary"
          onPress={() => navigation.replace('Home')}
        />

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>
            By continuing you agree to basic terms of use and privacy for this pilot.
          </Text>
        </View>
      </View>
    </Screen>
  );
}
