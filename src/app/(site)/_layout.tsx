import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { useColorModeValue } from 'native-base';
// import { useColorScheme } from 'react-native';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

function MaterialTabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

function IoniTabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const color = useColorModeValue('#2287ff', '#2287ff');

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: color }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IoniTabBarIcon
              name={focused ? 'ios-home' : 'home-outline'}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <MaterialTabBarIcon
              name={focused ? 'account-circle' : 'account-circle-outline'}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <IoniTabBarIcon
              name={focused ? 'settings-sharp' : 'settings-outline'}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
