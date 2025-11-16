import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getPharmacyStock } from '../api/client';
import { COLORS } from '../theme/colors';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/PrimaryButton';
type PharmacyItem = {
  id?: string;
  medicine_name?: string;
  quantity?: number;
  last_updated?: string;
  [key: string]: unknown;
};

export default function PharmacyScreen() {
  const [items, setItems] = useState<PharmacyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadStock = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPharmacyStock();
      setItems((res.items as PharmacyItem[]) || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stock');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStock();
  }, []);

  if (loading) {
    return (
      <Screen center>
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={{ marginTop: 8, color: COLORS.textSecondary }}>Loading pharmacy stock…</Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen center>
        <View style={{ width: '100%', maxWidth: 360, alignItems: 'center' }}>
          <Text style={{ color: COLORS.textPrimary, marginBottom: 8 }}>
            We couldn't load pharmacy stock.
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
          <PrimaryButton title="Retry" onPress={loadStock} />
        </View>
      </Screen>
    );
  }

  if (!items.length) {
    return (
      <Screen center>
        <View style={{ width: '100%', maxWidth: 360, alignItems: 'center' }}>
          <Text style={{ color: COLORS.textPrimary, marginBottom: 4 }}>
            No pharmacy stock data.
          </Text>
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Once stock is synced from the clinic, medicines will appear here.
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
          Pharmacy stock
        </Text>
        {lastUpdated && (
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 }}>
            Updated: {lastUpdated.toLocaleDateString()}
          </Text>
        )}

        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: '600', color: COLORS.textPrimary }}>
                {item.medicine_name || 'Medicine'}
              </Text>
              <Text style={{ color: COLORS.textSecondary }}>Qty: {item.quantity ?? '-'}</Text>
              <Text style={{ color: COLORS.textSecondary }}>
                Last updated: {item.last_updated || '-'}
              </Text>
            </Card>
          )}
        />
      </View>
    </Screen>
  );
}
