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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'black', 
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 20,
            backgroundColor: 'black', 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          default: {
            position: 'absolute',
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 20,
            backgroundColor: 'red', 
            borderTopColor: 'transparent',
            elevation: 5,
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
        name="MyFav"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="heart.fill"
              color={focused ? 'white' : 'black'} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Search"
        options={{
          title: 'SearchScreen',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              name="account-circle"
              color={focused ? 'white' : 'black'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
