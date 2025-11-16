import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../theme/colors';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { Feather } from '@expo/vector-icons';

export default function TeleconsultScreen() {
  return (
    <Screen scroll>
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Text style={{ fontSize: 20, marginBottom: 4, color: COLORS.textPrimary }}>
          Teleconsultation
        </Text>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 16 }}>
          When live, this screen will show your video or audio call with the doctor.
        </Text>

        {/* Connection status card */}
        <Card style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.textPrimary,
              marginBottom: 8,
            }}
          >
            Connection status
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: COLORS.surfaceSoft,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: COLORS.textPrimary }}>Waiting to connect</Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.textSecondary,
                flexShrink: 1,
              }}
            >
              Your doctor will join this call from the clinic.
            </Text>
          </View>
        </Card>

        {/* Call controls preview */}
        <Card style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.textPrimary,
              marginBottom: 12,
            }}
          >
            Call controls (preview)
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: COLORS.surfaceSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather name="mic" size={20} color={COLORS.textPrimary} />
            </View>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: COLORS.surfaceSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather name="video" size={20} color={COLORS.textPrimary} />
            </View>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#b34b4b',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather name="phone-off" size={20} color={COLORS.background} />
            </View>
          </View>
          <Text style={{ fontSize: 11, color: COLORS.textSecondary }}>
            Buttons are shown for design preview only. Call experience will be wired later.
          </Text>
        </Card>

        {/* Guidance card */}
        <Card>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.textPrimary,
              marginBottom: 8,
            }}
          >
            Before your call
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 }}>
            • Sit in a quiet, well-lit place.
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 }}>
            • Keep your medicines or reports nearby.
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>
            • Ensure your internet connection is stable.
          </Text>
        </Card>
      </View>
    </Screen>
  );
}
