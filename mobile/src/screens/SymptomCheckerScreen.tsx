import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { checkSymptoms } from '../api/client';
import { COLORS } from '../theme/colors';
import { PrimaryButton } from '../components/PrimaryButton';

const EXAMPLE_SYMPTOMS = [
  {
    label: 'Fever & cough',
    text: 'I have had a fever, dry cough, and body pain for 3 days. Breathing is normal.',
  },
  {
    label: 'Stomach pain',
    text: 'Since yesterday I have pain in my lower stomach with loose motions and no blood.',
  },
  {
    label: 'Headache & dizziness',
    text: 'For one week I am getting headache and some dizziness when I stand up.',
  },
];

export default function SymptomCheckerScreen() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!text.trim()) {
      return;
    }
    try {
      setLoading(true);
      const res = await checkSymptoms(text.trim());
      setAdvice(res.advice);
      setError(null);
    } catch (err) {
      // Show a friendly, offline-safe message instead of raw network error text.
      setAdvice('');
      setError(
        'We could not reach the Lifeline server right now. Please check your network or try again in a few minutes.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Text style={{ fontSize: 18, marginBottom: 8, color: COLORS.textPrimary }}>
          AI Symptom Checker
        </Text>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 }}>
          This tool does not replace a doctor. For emergencies, contact local services immediately.
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Describe your symptoms..."
          placeholderTextColor={COLORS.textSecondary}
          value={text}
          onChangeText={setText}
          style={{
            borderWidth: 1,
            borderColor: COLORS.border,
            backgroundColor: COLORS.surface,
            color: COLORS.textPrimary,
            padding: 10,
            borderRadius: 8,
            marginBottom: 12,
            textAlignVertical: 'top',
          }}
        />

        {/* Preloaded examples to help users understand how to describe symptoms */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 6 }}>
            Try one of these examples:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {EXAMPLE_SYMPTOMS.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => setText(item.text)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  marginRight: 8,
                  marginBottom: 8,
                  backgroundColor: COLORS.surface,
                }}
              >
                <Text style={{ fontSize: 12, color: COLORS.textPrimary }}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <PrimaryButton title="Check symptoms" onPress={handleCheck} />
        )}

        {/* Error and advice blocks */}
        {!!error && (
          <View style={{ marginTop: 16 }}>
            <Text style={{ color: COLORS.textSecondary, marginBottom: 8 }}>{error}</Text>
            <PrimaryButton
              title="Retry"
              variant="secondary"
              onPress={handleCheck}
            />
          </View>
        )}

        {!!advice && !error && (
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 4, color: COLORS.textSecondary }}>
              Advice
            </Text>
            <Text style={{ color: COLORS.textPrimary }}>{advice}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
