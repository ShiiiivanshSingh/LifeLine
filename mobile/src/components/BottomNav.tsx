import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export type BottomNavActive = 'home' | 'records' | 'profile';

type Props = {
  active: BottomNavActive;
  onHomePress: () => void;
  onRecordsPress: () => void;
  onTeleconsultPress: () => void;
  onProfilePress: () => void;
};

export function BottomNav({
  active,
  onHomePress,
  onRecordsPress,
  onTeleconsultPress,
  onProfilePress,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {/* Left tab - Home */}
        <Pressable
          style={({ pressed }) => [
            styles.tab,
            active === 'home' && styles.tabActive,
            pressed && styles.tabPressed,
          ]}
          onPress={onHomePress}
        >
          <Feather
            name="home"
            size={20}
            color={active === 'home' ? COLORS.primary : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.label,
              { color: active === 'home' ? COLORS.primary : COLORS.textSecondary },
            ]}
          >
            Home
          </Text>
        </Pressable>

        {/* Right tab - Records */}
        <Pressable
          style={({ pressed }) => [
            styles.tab,
            active === 'records' && styles.tabActive,
            pressed && styles.tabPressed,
          ]}
          onPress={onRecordsPress}
        >
          <MaterialCommunityIcons
            name="file-document"
            size={20}
            color={active === 'records' ? COLORS.primary : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.label,
              { color: active === 'records' ? COLORS.primary : COLORS.textSecondary },
            ]}
          >
            Records
          </Text>
        </Pressable>

        {/* Far-right tab - Profile */}
        <Pressable
          style={({ pressed }) => [
            styles.tab,
            active === 'profile' && styles.tabActive,
            pressed && styles.tabPressed,
          ]}
          onPress={onProfilePress}
        >
          <Feather
            name="user"
            size={20}
            color={active === 'profile' ? COLORS.primary : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.label,
              { color: active === 'profile' ? COLORS.primary : COLORS.textSecondary },
            ]}
          >
            Profile
          </Text>
        </Pressable>
      </View>

      {/* Center floating action button for Teleconsult */}
      <Pressable
        onPress={onTeleconsultPress}
        style={({ pressed }) => [
          styles.fab,
          { transform: [{ scale: pressed ? 0.92 : 1 }] },
        ]}
      >
        <Feather name="video" size={22} color={COLORS.background} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: COLORS.surface,
  },
  tabPressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    top: -22,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
