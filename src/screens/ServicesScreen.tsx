import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, Pressable, TextInput, Switch, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { colors, spacing, typography, card, cardShadow } from "../theme";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: "individual" | "package";
  features: string[];
  active: boolean;
}

const ServicesScreen = () => {
  const insets = useSafeAreaInsets();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState<"individual" | "package">("individual");
  const [newFeatures, setNewFeatures] = useState("");

  useEffect(() => {
    const db = getFirebaseDb();
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      const data: Service[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Service[];
      setServices(data);
    });
    return unsubscribe;
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }
    const db = getFirebaseDb();
    const featuresArray = newFeatures
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);
    await setDoc(doc(db, "services", Date.now().toString()), {
      name: newName,
      description: newDescription,
      duration: parseInt(newDuration) || 0,
      price: parseFloat(newPrice) || 0,
      category: newCategory,
      features: featuresArray,
      active: true,
    });
    setNewName("");
    setNewDescription("");
    setNewDuration("");
    setNewPrice("");
    setNewCategory("individual");
    setNewFeatures("");
    setShowAddModal(false);
  };

  const handleToggleActive = async (service: Service) => {
    const db = getFirebaseDb();
    await updateDoc(doc(db, "services", service.id), {
      active: !service.active,
    });
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Service", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const db = getFirebaseDb();
          await deleteDoc(doc(db, "services", id));
          setShowDetailModal(false);
          setSelectedService(null);
        },
      },
    ]);
  };

  const renderServiceCard = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={[styles.card, !item.active && styles.cardInactive]}
      onPress={() => {
        setSelectedService(item);
        setShowDetailModal(true);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="flash" size={20} color={colors.primary} />
        </View>
        <View style={styles.cardBadges}>
          <View style={[styles.badge, styles.categoryBadge]}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          {!item.active && (
            <View style={[styles.badge, styles.inactiveBadge]}>
              <Text style={styles.inactiveBadgeText}>Inactive</Text>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.cardName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.cardDescription} numberOfLines={1}>
        {item.description}
      </Text>
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.detailText}>{item.duration} min</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.detailText}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="flash-outline" size={48} color={colors.border} />
      </View>
      <Text style={styles.emptyTitle}>No Services</Text>
      <Text style={styles.emptySubtitle}>Add your first service to get started</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: "#f8f6f3" }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.headerTitle}>Services</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceCard}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          services.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={showDetailModal} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setShowDetailModal(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dragHandle} />
            {selectedService && (
              <>
                <View style={styles.sheetHeader}>
                  <View style={styles.sheetIconContainer}>
                    <Ionicons name="flash" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.sheetBadges}>
                    <View style={[styles.badge, styles.categoryBadge]}>
                      <Text style={styles.badgeText}>{selectedService.category}</Text>
                    </View>
                    {!selectedService.active && (
                      <View style={[styles.badge, styles.inactiveBadge]}>
                        <Text style={styles.inactiveBadgeText}>Inactive</Text>
                      </View>
                    )}
                  </View>
                </View>

                <Text style={styles.sheetName}>{selectedService.name}</Text>
                <Text style={styles.sheetDescription}>{selectedService.description}</Text>

                <View style={styles.detailRows}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailRowLeft}>
                      <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
                      <Text style={styles.detailRowLabel}>Duration</Text>
                    </View>
                    <Text style={styles.detailRowValue}>{selectedService.duration} min</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.detailRowLeft}>
                      <Ionicons name="cash-outline" size={18} color={colors.textSecondary} />
                      <Text style={styles.detailRowLabel}>Price</Text>
                    </View>
                    <Text style={styles.detailRowValue}>${selectedService.price}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <View style={styles.detailRowLeft}>
                      <Ionicons name="pricetag-outline" size={18} color={colors.textSecondary} />
                      <Text style={styles.detailRowLabel}>Category</Text>
                    </View>
                    <Text style={styles.detailRowValue}>{selectedService.category}</Text>
                  </View>
                </View>

                {selectedService.features.length > 0 && (
                  <View style={styles.featuresSection}>
                    <Text style={styles.featuresTitle}>Features</Text>
                    {selectedService.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabel}>Active</Text>
                  <Switch
                    value={selectedService.active}
                    onValueChange={() => handleToggleActive(selectedService)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor="#fff"
                  />
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(selectedService.id)}
                >
                  <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                  <Text style={styles.deleteButtonText}>Delete Service</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={showAddModal} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setShowAddModal(false)}>
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dragHandle} />
            <Text style={styles.sheetTitle}>Add Service</Text>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Service name"
              placeholderTextColor={colors.border}
            />

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Service description"
              placeholderTextColor={colors.border}
            />

            <Text style={styles.inputLabel}>Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              value={newDuration}
              onChangeText={setNewDuration}
              placeholder="60"
              placeholderTextColor={colors.border}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Price ($)</Text>
            <TextInput
              style={styles.input}
              value={newPrice}
              onChangeText={setNewPrice}
              placeholder="0.00"
              placeholderTextColor={colors.border}
              keyboardType="decimal-pad"
            />

            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.categorySelector}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  newCategory === "individual" && styles.categoryButtonActive,
                ]}
                onPress={() => setNewCategory("individual")}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    newCategory === "individual" && styles.categoryButtonTextActive,
                  ]}
                >
                  Individual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  newCategory === "package" && styles.categoryButtonActive,
                ]}
                onPress={() => setNewCategory("package")}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    newCategory === "package" && styles.categoryButtonTextActive,
                  ]}
                >
                  Package
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Features (comma-separated)</Text>
            <TextInput
              style={styles.input}
              value={newFeatures}
              onChangeText={setNewFeatures}
              placeholder="feature1, feature2, feature3"
              placeholderTextColor={colors.border}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: "#f8f6f3",
  },
  headerTitle: {
    ...typography.h1,
    color: colors.text,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: card.borderRadius,
    gap: spacing.xs,
  },
  addButtonText: {
    ...typography.body,
    color: "#fff",
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: card.borderRadius,
    padding: spacing.lg,
    ...cardShadow,
  },
  cardInactive: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBadges: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
  },
  badgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  inactiveBadge: {
    backgroundColor: "#fee",
  },
  inactiveBadgeText: {
    ...typography.caption,
    color: "#e74c3c",
    fontWeight: "600",
  },
  cardName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  cardDetails: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    maxHeight: Dimensions.get("window").height * 0.85,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sheetIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetBadges: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  sheetName: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sheetDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  detailRows: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  detailRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  detailRowLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailRowValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: "600",
  },
  featuresSection: {
    marginBottom: spacing.lg,
  },
  featuresTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  featureText: {
    ...typography.body,
    color: colors.text,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.background,
    marginBottom: spacing.md,
  },
  toggleLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: "600",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  deleteButtonText: {
    ...typography.body,
    color: "#e74c3c",
    fontWeight: "600",
  },
  sheetTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: card.borderRadius,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.md,
  },
  categorySelector: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: card.borderRadius,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  categoryButtonTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: card.borderRadius,
    alignItems: "center",
    marginTop: spacing.md,
  },
  saveButtonText: {
    ...typography.body,
    color: "#fff",
    fontWeight: "700",
  },
});

export default ServicesScreen;
