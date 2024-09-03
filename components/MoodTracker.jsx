import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Smile, Frown } from 'lucide-react-native';

const MoodTracker = ({ mood, onMoodChange, disabled }) => {
  const moodLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood</Text>
      <View style={styles.moodContainer}>
        <View style={styles.iconContainer}>
          <Frown size={28} color="#FF6B6B" />
        </View>
        <View style={styles.moodLevelsContainer}>
          {moodLevels.map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.moodButton,
                mood === level && styles.selectedMoodButton,
              ]}
              onPress={() => onMoodChange(level)}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.moodButtonText,
                  mood === level && styles.selectedMoodButtonText,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.iconContainer}>
          <Smile size={28} color="#4ECB71" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: '10%', // Icons take up 8% of the width
    alignItems: 'center',
  },
  moodLevelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '84%', // Mood scale takes up 80% of the width
  },
  moodButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodButton: {
    backgroundColor: '#40E0D0',
  },
  moodButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedMoodButtonText: {
    color: 'white',
  },
});

export default MoodTracker;
