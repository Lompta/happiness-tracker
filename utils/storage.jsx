import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ACTIVITIES: 'happiness_tracker_activities',
  DAILY_LOGS: 'happiness_tracker_daily_logs',
};

const getLocalDateString = (date = new Date()) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const storage = {
  saveActivities: async (activities) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  },

  loadActivities: async () => {
    try {
      const activitiesJson = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return activitiesJson != null ? JSON.parse(activitiesJson) : [];
    } catch (error) {
      console.error('Error loading activities:', error);
      return [];
    }
  },

  saveDailyLog: async (date, log) => {
    try {
      const logsJson = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
      const logs = logsJson != null ? JSON.parse(logsJson) : {};
      logs[date] = log;
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
    } catch (error) {
      console.error('Error saving daily log:', error);
    }
  },

  loadDailyLog: async (date) => {
    try {
      const logsJson = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
      const logs = logsJson != null ? JSON.parse(logsJson) : {};
      return logs[date] || null;
    } catch (error) {
      console.error('Error loading daily log:', error);
      return null;
    }
  },

  loadAllDailyLogs: async () => {
    try {
      const logsJson = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
      return logsJson != null ? JSON.parse(logsJson) : {};
    } catch (error) {
      console.error('Error loading all daily logs:', error);
      return {};
    }
  },

  seedSampleData: async (today) => {
    const sampleActivities = [
      { name: 'Yoga', archived: false },
      { name: 'Off-Color Joke', archived: false },
      { name: 'Walking', archived: false },
      { name: 'Piano', archived: false },
      { name: 'See Grandchildren', archived: false }
    ];

    // Only save activities if there are none
    const existingActivities = await storage.loadActivities();
    if (existingActivities.length === 0) {
      await storage.saveActivities(sampleActivities);
    }

    const sampleLogs = {};
    const existingLogs = await storage.loadAllDailyLogs();

    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = getLocalDateString(date);

      // Only add sample data for days that don't have existing data
      if (!existingLogs[dateString] && dateString !== today) {
        sampleLogs[dateString] = {
          activities: sampleActivities.map(activity => ({
            name: activity.name,
            completed: Math.random() < 0.5
          })),
          mood: Math.floor(Math.random() * 10) + 1,
          notes: `Sample notes for ${dateString}`
        };
      }
    }

    // Merge new sample logs with existing logs
    const updatedLogs = { ...existingLogs, ...sampleLogs };
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(updatedLogs));
  },

  clearAllData: async () => {
    await AsyncStorage.clear();
  }
};