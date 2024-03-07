import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomSidebar = ({ navigation }) => {
  const navigateToScreen = (route) => () => {
    navigation.navigate(route);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 50 }}>
      <TouchableOpacity onPress={navigateToScreen('Home')}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 10, paddingHorizontal: 20 }}>
          Home
        </Text>
      </TouchableOpacity>
      {/* Add more items as needed */}
    </View>
  );
};

export default CustomSidebar;