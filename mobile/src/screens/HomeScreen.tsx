import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable, Animated } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { getHealth } from '../api/client';
import { COLORS } from '../theme/colors';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/PrimaryButton';
import { Card } from '../components/Card';
import { BottomNav } from '../components/BottomNav';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [health, setHealth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [connectingTele, setConnectingTele] = useState(false);
  const connectingOpacity = useState(new Animated.Value(0))[0];

  const loadHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getHealth();
      setHealth(`${res.status} (${res.service})`);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Backend unreachable');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHealth();
  }, []);

  const handleStartTeleconsult = () => {
    setConnectingTele(true);
    Animated.sequence([
      Animated.timing(connectingOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(600),
      Animated.timing(connectingOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setConnectingTele(false);
      navigation.navigate('Teleconsult');
    });
  };

  return (
    <Screen>
      <View style={{ flex: 1, paddingBottom: 96 }}>
        {connectingTele && (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: COLORS.surfaceSoft,
              opacity: connectingOpacity,
              zIndex: 10,
            }}
          >
            <Text style={{ fontSize: 12, color: COLORS.background }}>
              Connecting you to a doctor…
            </Text>
          </Animated.View>
        )}
        {/* Top bar with avatar, title, and notification/bookmark icon */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: COLORS.surface,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Feather name="user" size={20} color={COLORS.textPrimary} />
            </View>
            <View>
              <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Good day</Text>
              <Text style={{ fontSize: 20, color: COLORS.textPrimary, fontWeight: '600' }}>
                Lifeline
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={{ padding: 8 }}
          >
            <Feather name="bell" size={20} color={COLORS.textPrimary} />
          </Pressable>
        </View>


        <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
  <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>
    Service status: 
  </Text>

  <Text
    style={{
      fontSize: 12,
      color: error ? '#ffcc00' : COLORS.textSecondary,
      marginLeft: 4,
    }}
    numberOfLines={1}
    ellipsizeMode="clip"
  >
    {loading
      ? 'Checking…'
      : error
      ? 'Issues detected'
      : 'All systems operational'}
  </Text>
</View>

        {/* Section label
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>
            Service status: 
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontSize: 12,
              color: error ? '#ffcc00' : COLORS.textSecondary,
            }}
          >
            {loading
              ? 'Checking…'
              : error
              ? 'Issues detected'
              : 'All systems operational'}
          </Text>
        </View> */}

        {/* Status card with clearer loading/error states and last updated time */}
        <Card style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: COLORS.surfaceSoft,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Feather
                name={error ? 'alert-triangle' : 'activity'}
                size={18}
                color={error ? '#000000' : COLORS.textPrimary}
              />
            </View>
            <View style={{ flex: 1 }}>
              {loading ? (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <ActivityIndicator color={COLORS.primary} />
                    <Text
                      style={{
                        fontSize: 13,
                        color: COLORS.textSecondary,
                        marginLeft: 8,
                      }}
                    >
                      Checking service status…
                    </Text>
                  </View>
                  {/* Simple skeleton placeholder bar */}
                  <View
                    style={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: COLORS.surfaceSoft,
                      opacity: 0.5,
                      width: '60%',
                    }}
                  />
                </View>
              ) : error ? (
                <View>
                  <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 8 }}>
                    {error}
                  </Text>
                  <Pressable onPress={loadHealth} style={{ alignSelf: 'flex-start', paddingVertical: 4 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: COLORS.primary,
                        textDecorationLine: 'underline',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      Retry
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 13, color: COLORS.textSecondary }}>{health}</Text>
                  {lastUpdated && (
                    <Text
                      style={{
                        fontSize: 11,
                        color: COLORS.textSecondary,
                        marginTop: 4,
                      }}
                    >
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </Card>

        {/* Large, clearly labeled primary actions */}
        <View style={{ gap: 12 }}>
          <View>
            <PrimaryButton
              title="Start teleconsultation"
              icon={(color) => <Feather name="video" size={20} color={color} />}
              onPress={handleStartTeleconsult}
            />
            {/* <Text
              style={{
                marginTop: 4,
                fontSize: 12,
                color: COLORS.textSecondary,
                textAlign: 'center',
              }}
            >
              Recommended!
            </Text> */}
          </View>
          <PrimaryButton
            title="View health records"
            variant="secondary"
            icon={(color) => <Feather name="file-text" size={20} color={color} />}
            onPress={() => navigation.navigate('Records')}
          />
          <PrimaryButton
            title="Check pharmacy stock"
            variant="secondary"
            icon={(color) => <MaterialCommunityIcons name="pill" size={20} color={color} />}
            onPress={() => navigation.navigate('Pharmacy')}
          />
          <View>
            <PrimaryButton
              title="Use AI symptom checker"
              variant="secondary"
              icon={(color) => <Feather name="activity" size={20} color={color} />}
              onPress={() => navigation.navigate('SymptomChecker')}
            />
            <Text
              style={{
                 marginTop: 4,
                marginRight: 4,
                fontSize: 12,
                color: COLORS.textSecondary,
                textAlign: 'center',
              }}
            >
              New!
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom navigation bar inspired by provided design */}
      <BottomNav
        active="home"
        onHomePress={() => navigation.navigate('Home')}
        onRecordsPress={() => navigation.navigate('Records')}
        onTeleconsultPress={() => navigation.navigate('Teleconsult')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
    </Screen>
  );
}
