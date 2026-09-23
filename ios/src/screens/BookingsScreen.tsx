import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { colors, spacing, typography, card } from "../theme";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const statusColors: Record<Booking["status"], string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  completed: "#10b981",
  cancelled: "#ef4444",
};

const statuses: Booking["status"][] = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Booking["status"] | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const db = getFirebaseDb();
    const unsub = onSnapshot(collection(db, "bookings"), (snap) => {
      const list: Booking[] = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Booking[];
      setBookings(list);
    });
    return unsub;
  }, []);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const openModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalVisible(false);
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const db = getFirebaseDb();
    await updateDoc(doc(db, "bookings", id), { status });
    closeModal();
  };

  const deleteBooking = async (id: string) => {
    Alert.alert("Delete Booking", "Are you sure you want to delete this booking?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const db = getFirebaseDb();
          await deleteDoc(doc(db, "bookings", id));
          closeModal();
        },
      },
    ]);
  };

  const renderFilterChip = (label: string, value: Booking["status"] | "all") => (
    <TouchableOpacity
      key={value}
      style={[styles.chip, filter === value && styles.chipActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.chipText, filter === value && styles.chipTextActive]}>
        {label}
      </Text>
      <View style={[styles.chipBadge, filter === value && styles.chipBadgeActive]}>
        <Text style={[styles.chipBadgeText, filter === value && styles.chipBadgeTextActive]}>
          {counts[value]}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderBooking = ({ item }: { item: Booking }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)} activeOpacity={0.7}>
      <View style={styles.cardLeft}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={colors.primary} />
        </View>
      </View>
      <View style={styles.cardCenter}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardService}>{item.service}</Text>
        <Text style={styles.cardDateTime}>
          {item.date} at {item.time}
        </Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] + "20" }]}>
          <Text style={[styles.statusText, { color: statusColors[item.status] }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Ionicons name="calendar-outline" size={64} color={colors.textSecondary || "#999"} />
      <Text style={styles.emptyTitle}>No Bookings</Text>
      <Text style={styles.emptySubtitle}>
        {filter === "all" ? "No bookings yet" : `No ${filter} bookings`}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookings</Text>
      </View>

      <FlatList
        horizontal
        data={statuses.map((s) => ({ key: s, label: s.charAt(0).toUpperCase() + s.slice(1), value: s }))}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => renderFilterChip(item.label, item.value)}
        ListHeaderComponent={renderFilterChip("All", "all")}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={filtered.length === 0 ? styles.listEmpty : styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dragHandle} />

            {selectedBooking && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalAvatar}>
                    <Ionicons name="person" size={28} color={colors.primary} />
                  </View>
                  <Text style={styles.modalName}>{selectedBooking.name}</Text>
                  <View style={[styles.modalStatusBadge, { backgroundColor: statusColors[selectedBooking.status] + "20" }]}>
                    <Text style={[styles.modalStatusText, { color: statusColors[selectedBooking.status] }]}>
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.contactRow}>
                  <Ionicons name="mail-outline" size={16} color={colors.textSecondary || "#666"} />
                  <Text style={styles.contactText}>{selectedBooking.email}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Ionicons name="call-outline" size={16} color={colors.textSecondary || "#666"} />
                  <Text style={styles.contactText}>{selectedBooking.phone}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                  <Ionicons name="briefcase-outline" size={18} color={colors.primary} />
                  <Text style={styles.detailLabel}>Service</Text>
                  <Text style={styles.detailValue}>{selectedBooking.service}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={18} color={colors.primary} />
                  <Text style={styles.detailLabel}>Date & Time</Text>
                  <Text style={styles.detailValue}>{selectedBooking.date} at {selectedBooking.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={18} color={colors.primary} />
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{selectedBooking.duration}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="cash-outline" size={18} color={colors.primary} />
                  <Text style={styles.detailLabel}>Price</Text>
                  <Text style={[styles.detailValue, styles.priceValue]}>{selectedBooking.price}</Text>
                </View>

                {selectedBooking.message ? (
                  <View style={styles.messageBox}>
                    <Ionicons name="chatbubble-outline" size={16} color={colors.textSecondary || "#666"} />
                    <Text style={styles.messageText}>{selectedBooking.message}</Text>
                  </View>
                ) : null}

                <Text style={styles.statusLabel}>Change Status</Text>
                <View style={styles.statusGrid}>
                  {statuses.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[
                        styles.statusButton,
                        { borderColor: statusColors[s] },
                        selectedBooking.status === s && { backgroundColor: statusColors[s] },
                      ]}
                      onPress={() => updateStatus(selectedBooking.id, s)}
                    >
                      <Text
                        style={[
                          styles.statusButtonText,
                          { color: statusColors[s] },
                          selectedBooking.status === s && { color: "#fff" },
                        ]}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteBooking(selectedBooking.id)}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  <Text style={styles.deleteText}>Delete Booking</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f3",
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  filters: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border || "#e5e5e5",
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.body,
    fontSize: 13,
    color: colors.text,
  },
  chipTextActive: {
    color: "#fff",
  },
  chipBadge: {
    marginLeft: spacing.xs,
    backgroundColor: colors.border || "#e5e5e5",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  chipBadgeActive: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  chipBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textSecondary || "#666",
  },
  chipBadgeTextActive: {
    color: "#fff",
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  listEmpty: {
    flex: 1,
  },
  card: {
    ...card,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardLeft: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  cardCenter: {
    flex: 1,
  },
  cardName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 2,
  },
  cardService: {
    ...typography.body,
    color: colors.textSecondary || "#666",
    fontSize: 13,
  },
  cardDateTime: {
    ...typography.body,
    color: colors.textSecondary || "#999",
    fontSize: 12,
    marginTop: 2,
  },
  cardRight: {
    alignItems: "flex-end",
  },
  cardPrice: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary || "#999",
    marginTop: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
    maxHeight: Dimensions.get("window").height * 0.85,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border || "#ddd",
    alignSelf: "center",
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  modalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  modalName: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  modalStatusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalStatusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
    paddingLeft: spacing.sm,
  },
  contactText: {
    ...typography.body,
    color: colors.textSecondary || "#666",
    marginLeft: spacing.sm,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border || "#eee",
    marginVertical: spacing.lg,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary || "#666",
    marginLeft: spacing.sm,
    width: 90,
    fontSize: 14,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  priceValue: {
    color: colors.primary,
    fontWeight: "700",
  },
  messageBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    flexDirection: "row",
  },
  messageText: {
    ...typography.body,
    color: colors.textSecondary || "#666",
    marginLeft: spacing.sm,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  statusLabel: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statusButton: {
    width: "48%",
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "600",
    marginLeft: spacing.sm,
    fontSize: 14,
  },
});
