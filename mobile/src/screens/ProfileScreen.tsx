import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS } from '../theme/colors';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { Feather } from '@expo/vector-icons';

const MOCK_PROFILE = {
  name: 'Sita Devi',
  age: 42,
  village: 'Bhagwanpur',
  phone: '+91 98765 43210',
  language: 'Hindi',
  chronicIssues: ['Diabetes', 'Hypertension'],
  lastVisit: '10 Nov 2025',
  nextVisit: '24 Nov 2025',
};

export default function ProfileScreen() {
  return (
    <Screen scroll>
      {/* Top header: brand + avatar icon */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <View>
          <Text style={{ fontSize: 26, fontWeight: '700', color: COLORS.textPrimary }}>
            Hi {MOCK_PROFILE.name.split(' ')[0]}
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 4 }}>
            Keeping track of your visits and medicines.
          </Text>
        </View>

        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name="user" size={22} color={COLORS.textPrimary} />
        </View>
      </View>

      {/* Search / QR bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 16,
          backgroundColor: COLORS.surface,
          marginBottom: 16,
        }}
      >
        <Feather name="search" size={16} color={COLORS.textSecondary} />
        <TextInput
          placeholder="Search records / scan QR"
          placeholderTextColor={COLORS.textSecondary}
          style={{
            flex: 1,
            marginLeft: 8,
            color: COLORS.textPrimary,
            paddingVertical: 0,
          }}
        />
        <Feather name="camera" size={18} color={COLORS.textSecondary} />
      </View>

      {/* Tabs row like For You / What's New */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 14, color: COLORS.textPrimary, fontWeight: '600' }}>
            Overview
          </Text>
          <View
            style={{
              marginTop: 4,
              height: 2,
              borderRadius: 999,
              backgroundColor: COLORS.primary,
            }}
          />
        </View>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Visits</Text>
        </View>
        <View style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Medicines</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Settings</Text>
        </View>
      </View>

      {/* Recent / upcoming care card */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: COLORS.textPrimary,
          marginBottom: 8,
        }}
      >
        Your care summary
      </Text>

      <Card style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 }}>
          Next visit scheduled
        </Text>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 }}>
          {MOCK_PROFILE.nextVisit} • Local clinic
        </Text>

        {/* Simple progress bar mock between last and next visit */}
        <View
          style={{
            height: 6,
            borderRadius: 999,
            backgroundColor: COLORS.background,
            overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: '60%',
              height: '100%',
              backgroundColor: COLORS.primary,
            }}
          />
        </View>
        <Text style={{ fontSize: 11, color: COLORS.textSecondary }}>
          Last visit: {MOCK_PROFILE.lastVisit}
        </Text>
      </Card>

      {/* Basic personal details section */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: COLORS.textPrimary,
          marginBottom: 4,
        }}
      >
        Profile details
      </Text>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 }}>
        These details come from your clinic records.
      </Text>

      <Card>
        <Text style={{ color: COLORS.textSecondary, marginBottom: 4 }}>
          Name: <Text style={{ color: COLORS.textPrimary }}>{MOCK_PROFILE.name}</Text>
        </Text>
        <Text style={{ color: COLORS.textSecondary, marginBottom: 4 }}>
          Village: <Text style={{ color: COLORS.textPrimary }}>{MOCK_PROFILE.village}</Text>
        </Text>
        <Text style={{ color: COLORS.textSecondary, marginBottom: 4 }}>
          Age: <Text style={{ color: COLORS.textPrimary }}>{MOCK_PROFILE.age}</Text>
        </Text>
        <Text style={{ color: COLORS.textSecondary, marginBottom: 4 }}>
          Phone: <Text style={{ color: COLORS.textPrimary }}>{MOCK_PROFILE.phone}</Text>
        </Text>
        <Text style={{ color: COLORS.textSecondary, marginBottom: 8 }}>
          Preferred language:{' '}
          <Text style={{ color: COLORS.textPrimary }}>{MOCK_PROFILE.language}</Text>
        </Text>
        <Text style={{ color: COLORS.textSecondary, marginBottom: 4 }}>
          Chronic issues:
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {MOCK_PROFILE.chronicIssues.map((issue) => (
            <View
              key={issue}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: COLORS.surfaceSoft,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: COLORS.textPrimary }}>{issue}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Text style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 12 }}>
        Profile last updated around your visit on {MOCK_PROFILE.lastVisit}.
      </Text>
    </Screen>
  );
}
