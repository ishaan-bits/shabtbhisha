import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { colors, spacing, typography, card, cardShadow } from "../theme";

const screenWidth = Dimensions.get("window").width;
const cardGap = spacing.md;
const cardWidth = (screenWidth - spacing.lg * 2 - cardGap) / 2;

interface StatItem {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  value: number;
  label: string;
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<Record<string, number>>({
    bookings: 0,
    pending: 0,
    testimonials: 0,
    services: 0,
    contacts: 0,
    unread: 0,
  });

  const db = getFirebaseDb();

  useEffect(() => {
    const unsubBookings = onSnapshot(collection(db, "bookings"), (snap) => {
      let total = 0;
      let pending = 0;
      snap.forEach((doc) => {
        total++;
        const data = doc.data();
        if (data.status === "pending") pending++;
      });
      setStats((prev) => ({ ...prev, bookings: total, pending }));
    });

    const unsubTestimonials = onSnapshot(collection(db, "testimonials"), (snap) => {
      setStats((prev) => ({ ...prev, testimonials: snap.size }));
    });

    const unsubServices = onSnapshot(collection(db, "services"), (snap) => {
      setStats((prev) => ({ ...prev, services: snap.size }));
    });

    const unsubContacts = onSnapshot(collection(db, "contacts"), (snap) => {
      let total = 0;
      let unread = 0;
      snap.forEach((doc) => {
        total++;
        const data = doc.data();
        if (!data.read) unread++;
      });
      setStats((prev) => ({ ...prev, contacts: total, unread }));
    });

    return () => {
      unsubBookings();
      unsubTestimonials();
      unsubServices();
      unsubContacts();
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const statCards: StatItem[] = [
    { key: "bookings", icon: "calendar", color: "#4a3728", value: stats.bookings, label: "Total Bookings" },
    { key: "pending", icon: "time", color: "#d97706", value: stats.pending, label: "Pending" },
    { key: "testimonials", icon: "chatbubble", color: "#059669", value: stats.testimonials, label: "Testimonials" },
    { key: "services", icon: "flash", color: "#7c3aed", value: stats.services, label: "Services" },
    { key: "contacts", icon: "mail", color: "#2563eb", value: stats.contacts, label: "Contacts" },
    { key: "unread", icon: "alert", color: "#dc2626", value: stats.unread, label: "Unread" },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.greeting}>Welcome back! Here's your overview.</Text>
        </View>

        <View style={styles.grid}>
          {statCards.map((item) => (
            <View key={item.key} style={[styles.statCard, { width: cardWidth }]}>
              <View style={[styles.iconCircle, { backgroundColor: item.color + "20" }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f3",
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  greeting: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: cardGap,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: card.borderRadius,
    padding: spacing.md,
    ...cardShadow,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
