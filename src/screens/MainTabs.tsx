import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import TasksScreen from './TasksScreen';
import HomeScreen from './HomeScreen';
import { CheckCircle, Home } from 'react-native-feather';

type MainTabsRoutes = {
  Home: undefined;
  Tasks: undefined;
};

const Tab = createBottomTabNavigator<MainTabsRoutes>();

function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CheckCircle color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
