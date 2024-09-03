import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { storage } from '../utils/storage';

const HistoryView = ({ onSelectDay }) => {
  const [history, setHistory] = useState({});

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const allLogs = await storage.loadAllDailyLogs();
    setHistory(allLogs);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => onSelectDay(item)}
    >
      <Text style={styles.date}>{item}</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summary}>
          {history[item].activities.filter(act => act.completed).length} activities completed
        </Text>
        <Text style={styles.mood}>Mood: {history[item].mood || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={Object.keys(history).sort((a, b) => new Date(b) - new Date(a))}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summary: {
    fontSize: 14,
    color: '#666',
  },
  mood: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default HistoryView;