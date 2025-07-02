import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, LayoutChangeEvent, TouchableOpacity, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import GuideScreen from './src/screens/GuideScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Guide: ['book', 'book-outline'],
  Home: ['home', 'home-outline'],
  Messages: ['chatbubbles', 'chatbubbles-outline'],
  Emergency: ['warning', 'warning-outline'],
  Profile: ['person', 'person-outline'],
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);
  const [tabBarWidth, setTabBarWidth] = useState(0);

  // Initialize animated values when routes change
  useEffect(() => {
    const newAnimatedValues = state.routes.map((_, i) => new Animated.Value(state.index === i ? 1 : 0));
    setAnimatedValues(newAnimatedValues);
  }, [state.routes.length]);

  useEffect(() => {
    if (animatedValues.length > 0) {
      animatedValues.forEach((anim, i) => {
        if (anim) {
          Animated.spring(anim, {
            toValue: state.index === i ? 1 : 0,
            useNativeDriver: true,
            speed: 20,
            bounciness: 8,
          }).start();
        }
      });
    }
  }, [state.index, animatedValues]);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setTabBarWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={{
      backgroundColor: 'transparent',
    }}>
      <View
        style={[styles.tabBar, { paddingBottom: insets.bottom || 0 }]}
        onLayout={onTabBarLayout}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const [filledIcon, outlineIcon] = ICONS[route.name as keyof typeof ICONS] || ['help', 'help-outline'];
          const iconName = isFocused ? filledIcon : outlineIcon;
          const animatedValue = animatedValues[index];
          const scale = animatedValue ? animatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] }) : 1;
          const color = isFocused ? '#06B6D4' : '#9CA3AF';
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            >
              <View style={styles.tabItem}>
                <Animated.View
                  style={{
                    transform: [{ scale }],
                  }}
                >
                  <Ionicons name={iconName as any} size={28} color={color} />
                </Animated.View>
                {isFocused && <Animated.View style={styles.activeDot} />}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#111827',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Tab.Screen 
            name="Guide" 
            component={GuideScreen}
            options={{ title: 'Guide' }}
          />
          <Tab.Screen 
            name="Messages" 
            component={MessagesScreen}
            options={{ title: 'Messages' }}
          />
          <Tab.Screen 
            name="Home" 
            children={({ navigation }) => <HomeScreen navigation={navigation} />}
            options={({ navigation }) => ({
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#0f172a',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    shadowColor: '#06B6D4',
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                  }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#06B6D4' }}>🕸️</Text>
                  </View>
                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: '#06B6D4',
                    letterSpacing: 1,
                    textShadowColor: '#0ea5e9',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 3,
                  }}>
                    SpiderNet
                  </Text>
                </View>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{ marginRight: 16 }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="person-circle" size={32} color="#06B6D4" />
                </TouchableOpacity>
              ),
            })}
          />
          <Tab.Screen 
            name="Emergency" 
            component={EmergencyScreen}
            options={{ title: 'Emergency' }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderTopColor: '#374151',
    borderTopWidth: 1,
    position: 'relative',
    paddingBottom: 0,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    zIndex: 2,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#06B6D4',
    marginTop: 4,
  },
});
