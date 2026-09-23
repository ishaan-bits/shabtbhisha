import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { colors, spacing, typography, card, cardShadow } from "../theme";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: any;
}

const statusColors: Record<Contact["status"], string> = {
  unread: "#e74c3c",
  read: "#f39c12",
  replied: "#27ae60",
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const db = getFirebaseDb();
    const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Contact[];
      data.sort((a, b) => {
        if (a.status === "unread" && b.status !== "unread") return -1;
        if (a.status !== "unread" && b.status === "unread") return 1;
        return 0;
      });
      setContacts(data);
    });
    return unsubscribe;
  }, []);

  const handleContactPress = async (contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
    if (contact.status === "unread") {
      try {
        const db = getFirebaseDb();
        await updateDoc(doc(db, "contacts", contact.id), { status: "read" });
      } catch (e) {
        console.error("Failed to mark as read:", e);
      }
    }
  };

  const handleMarkAsReplied = async () => {
    if (!selectedContact) return;
    try {
      const db = getFirebaseDb();
      await updateDoc(doc(db, "contacts", selectedContact.id), { status: "replied" });
      setSelectedContact({ ...selectedContact, status: "replied" });
    } catch (e) {
      console.error("Failed to mark as replied:", e);
    }
  };

  const handleDelete = () => {
    if (!selectedContact) return;
    Alert.alert("Delete Contact", "Are you sure you want to delete this contact?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const db = getFirebaseDb();
            await deleteDoc(doc(db, "contacts", selectedContact.id));
            setModalVisible(false);
            setSelectedContact(null);
          } catch (e) {
            console.error("Failed to delete contact:", e);
          }
        },
      },
    ]);
  };

  const formatDate = (date: any) => {
    if (!date?.toDate) return "";
    return date.toDate().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={[
        styles.contactCard,
        { borderLeftColor: item.status === "unread" ? colors.primary : "#e0ddd8" },
      ]}
      onPress={() => handleContactPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.contactIcon}>
        <Ionicons name="person" size={22} color="#fff" />
      </View>
      <View style={styles.contactContent}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.status === "unread" && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.contactSubject} numberOfLines={1}>
          {item.subject}
        </Text>
        <Text style={styles.contactMessage} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] + "18" }]}>
        <Text style={[styles.statusText, { color: statusColors[item.status] }]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="mail-open-outline" size={64} color="#c4c0b8" />
      <Text style={styles.emptyTitle}>No Contacts Yet</Text>
      <Text style={styles.emptySubtitle}>Contact submissions will appear here</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Text style={styles.headerCount}>{contacts.length} total</Text>
      </View>

      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={contacts.length === 0 ? styles.listEmpty : styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dragHandle} />
            {selectedContact && (
              <View style={styles.sheetContent}>
                <View style={styles.sheetHeader}>
                  <View style={styles.sheetIcon}>
                    <Ionicons name="person" size={28} color="#fff" />
                  </View>
                  <View style={styles.sheetHeaderInfo}>
                    <Text style={styles.sheetName}>{selectedContact.name}</Text>
                    <View style={[styles.statusBadgeSmall, { backgroundColor: statusColors[selectedContact.status] + "18" }]}>
                      <Text style={[styles.statusTextSmall, { color: statusColors[selectedContact.status] }]}>
                        {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={18} color="#888" />
                  <Text style={styles.infoText}>{selectedContact.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={18} color="#888" />
                  <Text style={styles.infoText}>{selectedContact.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={18} color="#888" />
                  <Text style={styles.infoText}>{formatDate(selectedContact.createdAt)}</Text>
                </View>

                <Text style={styles.subjectLabel}>Subject</Text>
                <Text style={styles.subjectText}>{selectedContact.subject}</Text>

                <Text style={styles.messageLabel}>Message</Text>
                <View style={styles.messageBox}>
                  <Text style={styles.messageText}>{selectedContact.message}</Text>
                </View>

                <View style={styles.actions}>
                  {selectedContact.status !== "replied" && (
                    <TouchableOpacity style={styles.repliedButton} onPress={handleMarkAsReplied} activeOpacity={0.7}>
                      <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                      <Text style={styles.repliedButtonText}>Mark as Replied</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.7}>
                    <Ionicons name="trash-outline" size={20} color="#e74c3c" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e5e0",
  },
  headerTitle: {
    ...typography.h1,
  },
  headerCount: {
    fontSize: 15,
    color: colors.textMuted,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  listEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: card.borderRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    ...cardShadow,
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  contactContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  contactHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.primary,
    marginLeft: spacing.xs,
  },
  contactSubject: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 2,
  },
  contactMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  emptyContainer: {
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.textMuted,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.85,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#d9d5cf",
    alignSelf: "center",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sheetContent: {
    paddingHorizontal: spacing.lg,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sheetIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  sheetHeaderInfo: {
    flex: 1,
  },
  sheetName: {
    ...typography.h2,
    marginBottom: 4,
  },
  statusBadgeSmall: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusTextSmall: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
  },
  infoText: {
    fontSize: 15,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  subjectLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  messageLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  messageBox: {
    backgroundColor: "#f8f6f3",
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "#e8e5e0",
    marginBottom: spacing.lg,
  },
  messageText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  repliedButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  repliedButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e74c3c12",
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  deleteButtonText: {
    color: "#e74c3c",
    fontSize: 15,
    fontWeight: "600",
  },
});
