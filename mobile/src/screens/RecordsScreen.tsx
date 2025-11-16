import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getRecords } from '../api/client';
import { COLORS } from '../theme/colors';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/PrimaryButton';
type RecordItem = {
  id?: string;
  doctor_notes?: string;
  prescription?: string;
  visit_date?: string;
  [key: string]: unknown;
};

export default function RecordsScreen() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getRecords();
      setRecords((res.records as RecordItem[]) || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load records');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  if (loading) {
    return (
      <Screen center>
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={{ marginTop: 8, color: COLORS.textSecondary }}>Loading records…</Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen center>
        <View style={{ width: '100%', maxWidth: 360, alignItems: 'center' }}>
          <Text style={{ color: COLORS.textPrimary, marginBottom: 8 }}>
            We couldn't load your records.
          </Text>
          <Text
            style={{
              color: COLORS.textSecondary,
              marginBottom: 16,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            {error}
          </Text>
          <PrimaryButton title="Retry" onPress={loadRecords} />
        </View>
      </Screen>
    );
  }

  if (!records.length) {
    return (
      <Screen center>
        <View style={{ width: '100%', maxWidth: 360, alignItems: 'center' }}>
          <Text style={{ color: COLORS.textPrimary, marginBottom: 4 }}>No records yet.</Text>
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Your visits and prescriptions will appear here after your first consultation.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: COLORS.textPrimary,
            marginBottom: 4,
          }}
        >
          Health records
        </Text>
        {lastUpdated && (
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 }}>
            Updated: {lastUpdated.toLocaleDateString()}
          </Text>
        )}

        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          data={records}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: '600', color: COLORS.textPrimary }}>
                {item.visit_date || 'Visit'}
              </Text>
              <Text style={{ color: COLORS.textSecondary }}>Notes: {item.doctor_notes || '-'}</Text>
              <Text style={{ color: COLORS.textSecondary }}>Rx: {item.prescription || '-'}</Text>
            </Card>
          )}
        />
      </View>
    </Screen>
  );
}
