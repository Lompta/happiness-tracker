import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ActivityCard = ({ activity, onToggle, completed, disabled }) => (
  <TouchableOpacity onPress={onToggle} style={styles.card} disabled={disabled}>
    <View style={[styles.checkbox, completed && styles.completed]}>
      {completed && <View style={styles.checkmark} />}
    </View>
    <Text style={styles.activityText}>{activity}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  activityText: {
    fontSize: 18,
    color: '#333',
  },
});

export default ActivityCard;