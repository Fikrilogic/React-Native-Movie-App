import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async <T>(key: string, data: T) => {
  try {
    const formatting = typeof data === 'string' ? data : JSON.stringify(data);
    await AsyncStorage.setItem(key, formatting);
  } catch (error) {
    throw error;
  }
};

const getData = async <T>(key: string): Promise<T | string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value == null ? '' : JSON.parse(value);
  } catch (error) {
    throw error;
  }
};

const LocalStorage = () => ({
  StoreData: storeData,
  GetData: getData,
});

export default LocalStorage;
