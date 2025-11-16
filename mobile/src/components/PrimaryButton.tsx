import React, { ReactNode } from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, View } from 'react-native';
import { COLORS } from '../theme/colors';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
  style?: ViewStyle;
  /**
   * Optional icon renderer. Receives the computed text color so the icon matches the label.
   */
  icon?: (color: string) => ReactNode;
};

export function PrimaryButton({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  fullWidth = true,
  style,
  icon,
}: Props) {
  const backgroundColor =
    variant === 'primary' ? COLORS.primary : variant === 'secondary' ? COLORS.surfaceSoft : 'transparent';
  const borderColor = variant === 'ghost' ? COLORS.border : 'transparent';
  const textColor = variant === 'ghost' ? COLORS.textSecondary : COLORS.background;

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        { backgroundColor, borderColor, opacity: loading || pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.row}>
          {icon && <View style={styles.icon}>{icon(textColor)}</View>}
          <Text style={[styles.label, { color: textColor }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
