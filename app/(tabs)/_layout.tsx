import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const greenColor = '#4CAF50'; 

  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: greenColor,
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: Platform.select({
      ios: {
        position: 'absolute',
        marginHorizontal: 20, // Add spacing on left and right
        marginBottom: 20, // Lift it up from the bottom
        borderRadius: 20, // Rounded corners
        backgroundColor: 'white', // Background color
        shadowColor: '#000', // Shadow for elevation effect
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      default: {
        position: 'absolute',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        borderTopColor: 'transparent',
        elevation: 5, // Add shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
    }),
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    }}
  />

  <Tabs.Screen
    name="explore"
    options={{
      title: 'Explore',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    }}
  />
</Tabs>

  );
}