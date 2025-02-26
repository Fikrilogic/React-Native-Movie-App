import Toast from 'react-native-toast-message';

export const showToastSuccess = (message: string) => {
  // Toast.success(message, "bottom")
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
  });
};

export const showToastError = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Failed',
    text2: message,
  });
};
