import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  center?: boolean;
};

export function Screen({ children, scroll = false, center = false }: ScreenProps) {
  const Container = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container
        contentContainerStyle={
          scroll
            ? [
                styles.content,
                center && { justifyContent: 'center', alignItems: 'center', flexGrow: 1 },
              ]
            : undefined
        }
        style={!scroll ? [styles.content, center && styles.center] : undefined}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
