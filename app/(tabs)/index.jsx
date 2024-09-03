import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { storage } from '../../utils/storage';
import DayView from '../../components/DayView';
import HistoryView from '../../components/HistoryView';
import ActivityManagement from '../../components/ActivityManagement';
import { colors } from '../../constants/customColors';

const getLocalDateString = (date = new Date()) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export default function App() {
  const [activities, setActivities] = useState([]);
  const [currentDate, setCurrentDate] = useState(getLocalDateString());
  const [currentView, setCurrentView] = useState('today');
  const [dayData, setDayData] = useState(null);

  const today = getLocalDateString();

  useEffect(() => {
    const initializeApp = async () => {
      // await storage.seedSampleData(today);
      loadActivities();
      loadDayData();
    };

    initializeApp();
  }, []);

  useEffect(() => {
    loadDayData();
  }, [currentDate]);

  const loadActivities = async () => {
    const loadedActivities = await storage.loadActivities();
    setActivities(loadedActivities.filter(activity => !activity.archived));
  };

  const loadDayData = async () => {
    const data = await storage.loadDailyLog(currentDate);
    setDayData(data);
  };

  const saveDay = async (data) => {
    await storage.saveDailyLog(currentDate, data);
    setDayData(data);
  };

  const toggleView = () => {
    if (currentView === 'activities' || currentView === 'history' || currentDate !== today) {
      setCurrentDate(today);
      setCurrentView('today');
    } else {
      setCurrentView('history');
    }
  };

  const toggleActivityManagement = () => {
    setCurrentView(currentView === 'activities' ? 'today' : 'activities');
  };

  const selectDay = (date) => {
    setCurrentDate(date);
    setCurrentView('today');
  };

  const handleActivitiesUpdated = () => {
    loadActivities();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Happiness Tracker</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={toggleView} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>
              {currentView === 'activities' || currentView === 'history' || currentDate !== today ? 'Today' : 'History'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleActivityManagement} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>
              {currentView === 'activities' ? 'Close' : 'Manage'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {currentView === 'activities' ? (
        <ActivityManagement 
          onClose={toggleActivityManagement} 
          onActivitiesUpdated={handleActivitiesUpdated}
        />
      ) : currentView === 'history' ? (
        <HistoryView onSelectDay={selectDay} />
      ) : (
        <DayView 
          date={currentDate}
          activities={activities}
          onSave={saveDay}
          initialData={dayData}
          isToday={currentDate === today}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  headerButtonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
  },
});