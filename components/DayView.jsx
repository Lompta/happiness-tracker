import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import ActivityCard from './ActivityCard';
import MoodTracker from './MoodTracker';
import { colors } from '../constants/customColors'; 

const DayView = ({ date, activities, onSave, initialData, isToday }) => {
  const [dayActivities, setDayActivities] = useState([]);
  const [mood, setMood] = useState(5);
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  
  useEffect(() => {
    if (initialData) {
      setDayActivities(initialData.activities || []);
      setMood(initialData.mood || 5);
      setNotes(initialData.notes || '');
      setIsEditing(isToday && !initialData.saved);
    } else {
      setDayActivities(activities.map(activity => ({
        name: activity.name,
        completed: false
      })));
      setMood(5);
      setNotes('');
      setIsEditing(isToday);
    }
  }, [date, initialData, activities, isToday]);

  const toggleActivity = (activityName) => {
    if (isEditing) {
      setDayActivities(prev => prev.map(activity => 
        activity.name === activityName 
          ? { ...activity, completed: !activity.completed }
          : activity
      ));
    }
  };

  const handleSave = () => {
    onSave({ activities: dayActivities, mood, notes, saved: true });
    if (isToday) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.activitiesList}>
          {dayActivities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity.name}
              completed={activity.completed}
              onToggle={() => toggleActivity(activity.name)}
              disabled={!isEditing}
            />
          ))}
        </View>
        <View style={styles.moodTrackerContainer}>
          <MoodTracker 
            mood={mood} 
            onMoodChange={setMood} 
            disabled={!isEditing} 
          />
        </View>
        <TextInput
          style={[styles.notesInput, !isEditing && styles.readOnlyInput]}
          multiline
          placeholderTextColor="#CCCCCC"
          placeholder="Notes or gratitude for the day..."
          value={notes}
          onChangeText={setNotes}
          editable={isEditing}
        />
      </ScrollView>
      {isToday && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={isEditing ? handleSave : handleEdit}
        >
          <Text style={styles.actionButtonText}>
            {isEditing ? 'Save Day' : 'Edit Day'}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    date: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 15,
      marginHorizontal: 20,
      color: colors.text,
    },
    scrollView: {
      flex: 1,
    },
    activitiesList: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    moodTrackerContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    notesInput: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 20,
      minHeight: 100,
      textAlignVertical: 'top',
      fontSize: 16,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    readOnlyInput: {
      backgroundColor: '#f0f0f0',
      color: '#666',
    },
    actionButton: {
      backgroundColor: colors.primary,
      padding: 15,
      margin: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    actionButtonText: {
      color: colors.buttonText,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default DayView;