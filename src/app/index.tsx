import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pick } from '../../supabase/functions/_shared/pick';
import activities from '../../supabase/functions/_shared/activities.json';

export default function Today() {
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Static HTML and initial hydration must be independent of the client clock.
    setDate(new Date().toISOString().slice(0, 10));
  }, []);
  const activity = date === null ? null : pick(activities, date);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.heading}>Today</Text>
        <Text style={styles.notice}>Demo pick from three sample activities. Uses the UTC date when you open this page.</Text>
        {date === null ? (
          <Text style={styles.body}>Loading your pick...</Text>
        ) : activity ? (
          <View style={styles.card}>
            <Text accessibilityRole="header" style={styles.title}>{activity.title}</Text>
            <Text style={styles.body}>{activity.summary}</Text>
            {activity.steps.map((step, index) => (
              <View key={step} style={styles.step}>
                <Text style={styles.body}>{index + 1}.</Text>
                <Text style={[styles.body, styles.instruction]}>{step}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.body}>No activities available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f6f4ef' },
  content: { padding: 24, gap: 20, maxWidth: 680, width: '100%', alignSelf: 'center' },
  heading: { fontSize: 36, fontWeight: '700', color: '#16352c' },
  notice: { fontSize: 16, lineHeight: 24, color: '#4a554f' },
  card: { padding: 24, gap: 20, borderRadius: 16, backgroundColor: '#ffffff' },
  title: { fontSize: 26, fontWeight: '600', color: '#16352c' },
  body: { fontSize: 18, lineHeight: 28, color: '#263b32' },
  step: { flexDirection: 'row', gap: 12 },
  instruction: { flex: 1 },
});
