import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { colors } from "./src/theme";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import BookingsScreen from "./src/screens/BookingsScreen";
import TestimonialsScreen from "./src/screens/TestimonialsScreen";
import ServicesScreen from "./src/screens/ServicesScreen";
import ContactsScreen from "./src/screens/ContactsScreen";
import ContentScreen from "./src/screens/ContentScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<string, { focused: IoniconsName; default: IoniconsName }> = {
  Dashboard: { focused: "grid", default: "grid-outline" },
  Bookings: { focused: "calendar", default: "calendar-outline" },
  Testimonials: { focused: "chatbubble", default: "chatbubble-outline" },
  Services: { focused: "flash", default: "flash-outline" },
  Contacts: { focused: "mail", default: "mail-outline" },
  Content: { focused: "document-text", default: "document-text-outline" },
  Settings: { focused: "settings", default: "settings-outline" },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused, size }) => {
          const icon = TAB_ICONS[route.name];
          const iconName = focused ? icon.focused : icon.default;
          return <Ionicons name={iconName} size={size} color={focused ? colors.primary : colors.textMuted} />;
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.borderLight,
          borderTopWidth: 0.5,
          height: 88,
          paddingTop: 8,
          paddingBottom: 28,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Testimonials" component={TestimonialsScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Content" component={ContentScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return user ? <TabNavigator /> : <LoginScreen />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="dark" />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background },
});
