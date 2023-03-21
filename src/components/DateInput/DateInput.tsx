/* eslint-disable react/require-default-props */
import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Input from '../Input';

interface DateInputProps {
  label?: string;
  value?: Date;
  placeholder?: string;
  placeholderTextColor?: string;
  errorText?: string;
  minDate?: Date;
  maxDate?: Date;
  onDateChange?: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  placeholder = '',
  placeholderTextColor,
  errorText,
  minDate,
  maxDate,
  onDateChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatedText = useMemo(() => {
    if (value) {
      return value.toLocaleDateString();
    }

    return '';
  }, [value]);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate && onDateChange) {
      onDateChange(selectedDate);
    }
  };

  const handlePress = () => {
    setShowPicker(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          disabled
          value={formatedText}
          error={errorText}
          label={label}
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DateInput;
