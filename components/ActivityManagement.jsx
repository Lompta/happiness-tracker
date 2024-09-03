import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { storage } from '../utils/storage';

const ActivityManagement = ({ onClose, onActivitiesUpdated }) => {
  const [activities, setActivities] = useState([]);
  const [newActivityName, setNewActivityName] = useState('');

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    const loadedActivities = await storage.loadActivities();
    setActivities(loadedActivities.filter(activity => !activity.archived));
  };

  const addActivity = async () => {
    if (newActivityName.trim()) {
      const updatedActivities = [...activities, { name: newActivityName.trim(), archived: false }];
      await storage.saveActivities(updatedActivities);
      setActivities(updatedActivities);
      setNewActivityName('');
      onActivitiesUpdated();
    }
  };

  const archiveActivity = async (index) => {
    const updatedActivities = activities.map((activity, i) => 
      i === index ? { ...activity, archived: true } : activity
    );
    await storage.saveActivities(updatedActivities);
    setActivities(updatedActivities.filter(activity => !activity.archived));
    onActivitiesUpdated();
  };

  const renderActivityItem = ({ item, index }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityName}>{item.name}</Text>
      <TouchableOpacity onPress={() => archiveActivity(index)} style={styles.archiveButton}>
        <Text style={styles.buttonText}>Archive</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Activities</Text>
      <View style={styles.addActivity}>
        <TextInput
          style={styles.input}
          value={newActivityName}
          onChangeText={setNewActivityName}
          placeholder="New activity name"
        />
        <TouchableOpacity onPress={addActivity} style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addActivity: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  activityName: {
    fontSize: 16,
    flex: 1,
  },
  archiveButton: {
    backgroundColor: '#ff9500',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ActivityManagement;