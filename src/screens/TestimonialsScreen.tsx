import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TextInput,
  Switch,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { colors, spacing, typography, card } from "../theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  service: string;
  featured: boolean;
  visible: boolean;
}

export default function TestimonialsScreen() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    text: "",
    service: "",
    rating: "5",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(getFirebaseDb(), "testimonials"), (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Testimonial[]);
    });
    return () => unsub();
  }, []);

  const toggleField = async (id: string, field: "featured" | "visible") => {
    const item = items.find((t) => t.id === id);
    if (item) {
      await updateDoc(doc(getFirebaseDb(), "testimonials", id), { [field]: !item[field] });
      setSelected((prev) => (prev && prev.id === id ? { ...prev, [field]: !prev[field] } : prev));
    }
  };

  const handleAdd = async () => {
    if (!form.name || !form.text) {
      Alert.alert("Error", "Name and testimonial text are required");
      return;
    }
    const id = `TM${Date.now()}`;
    await setDoc(doc(getFirebaseDb(), "testimonials", id), {
      name: form.name,
      role: form.role,
      location: form.location,
      text: form.text,
      service: form.service,
      rating: parseInt(form.rating) || 5,
      featured: false,
      visible: true,
    });
    setForm({ name: "", role: "", location: "", text: "", service: "", rating: "5" });
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Testimonial", "Are you sure you want to remove this testimonial permanently?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(getFirebaseDb(), "testimonials", id));
          setSelected(null);
        },
      },
    ]);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? "star" : "star-outline"}
        size={14}
        color={i < rating ? colors.accent : colors.border}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const renderItem = ({ item }: { item: Testimonial }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelected(item)} activeOpacity={0.7}>
      <View style={styles.cardTop}>
        <View style={styles.quoteIcon}>
          <Ionicons name="chatbubble" size={16} color={colors.primary} />
        </View>
        <View style={styles.badges}>
          {item.featured && (
            <View style={[styles.badge, styles.badgeFeatured]}>
              <Ionicons name="star" size={10} color={colors.warning} />
              <Text style={[styles.badgeText, { color: colors.warning }]}>Featured</Text>
            </View>
          )}
          {!item.visible && (
            <View style={[styles.badge, styles.badgeHidden]}>
              <Ionicons name="eye-off" size={10} color={colors.danger} />
              <Text style={[styles.badgeText, { color: colors.danger }]}>Hidden</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.cardIdentity}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardRole}>
          {item.role}
          {item.location ? ` · ${item.location}` : ""}
        </Text>
      </View>
      <Text style={styles.cardText} numberOfLines={2}>
        {item.text}
      </Text>
      <View style={styles.cardFooter}>
        <View style={styles.starsRow}>{renderStars(item.rating)}</View>
        {item.service ? <Text style={styles.cardService}>{item.service}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="chatbubble-ellipses-outline" size={56} color={colors.border} />
      </View>
      <Text style={styles.emptyTitle}>No Testimonials Yet</Text>
      <Text style={styles.emptySubtitle}>Add customer testimonials to build trust and showcase your work.</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Testimonials</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)} activeOpacity={0.7}>
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          items.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={!!selected} transparent animationType="slide" statusBarTranslucent>
        <Pressable style={styles.overlay} onPress={() => setSelected(null)}>
          <Pressable style={[styles.bottomSheet, { paddingBottom: insets.bottom + spacing.xl }]} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dragHandle} />
            {selected && (
              <View style={styles.sheetContent}>
                <View style={styles.sheetHeader}>
                  <View style={styles.sheetHeaderLeft}>
                    <View style={styles.sheetAvatar}>
                      <Ionicons name="person" size={20} color={colors.primary} />
                    </View>
                    <View>
                      <Text style={styles.sheetName}>{selected.name}</Text>
                      <Text style={styles.sheetRole}>
                        {selected.role}
                        {selected.location ? ` · ${selected.location}` : ""}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => setSelected(null)} hitSlop={12}>
                    <Ionicons name="close" size={22} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                <View style={styles.sheetDivider} />

                <Text style={styles.sheetQuote}>"{selected.text}"</Text>

                <View style={styles.sheetInfoRow}>
                  <View style={styles.sheetInfoItem}>
                    <Ionicons name="briefcase-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.sheetInfoText}>{selected.service || "—"}</Text>
                  </View>
                  <View style={styles.sheetInfoItem}>
                    <View style={styles.starsRow}>{renderStars(selected.rating)}</View>
                  </View>
                </View>

                <View style={styles.sheetDivider} />

                <View style={styles.toggleRow}>
                  <View style={styles.toggleLeft}>
                    <Ionicons name="star-outline" size={18} color={colors.warning} />
                    <Text style={styles.toggleLabel}>Featured</Text>
                  </View>
                  <Switch
                    value={selected.featured}
                    onValueChange={() => toggleField(selected.id, "featured")}
                    trackColor={{ false: colors.border, true: colors.primaryLight }}
                    thumbColor="#fff"
                  />
                </View>
                <View style={styles.toggleRow}>
                  <View style={styles.toggleLeft}>
                    <Ionicons name="eye-outline" size={18} color={colors.info} />
                    <Text style={styles.toggleLabel}>Visible</Text>
                  </View>
                  <Switch
                    value={selected.visible}
                    onValueChange={() => toggleField(selected.id, "visible")}
                    trackColor={{ false: colors.border, true: colors.primaryLight }}
                    thumbColor="#fff"
                  />
                </View>

                <View style={styles.sheetDivider} />

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(selected.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.danger} />
                  <Text style={styles.deleteBtnText}>Delete Testimonial</Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={showAdd} transparent animationType="slide" statusBarTranslucent>
        <Pressable style={styles.overlay} onPress={() => setShowAdd(false)}>
          <Pressable style={[styles.bottomSheet, { paddingBottom: insets.bottom + spacing.xl }]} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dragHandle} />
            <View style={styles.sheetContent}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>New Testimonial</Text>
                <TouchableOpacity onPress={() => setShowAdd(false)} hitSlop={12}>
                  <Ionicons name="close" size={22} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <View style={styles.sheetDivider} />

              <Text style={styles.inputLabel}>Name *</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(v) => setForm({ ...form, name: v })}
                placeholder="Customer name"
                placeholderTextColor={colors.textMuted}
              />

              <Text style={styles.inputLabel}>Role</Text>
              <TextInput
                style={styles.input}
                value={form.role}
                onChangeText={(v) => setForm({ ...form, role: v })}
                placeholder="e.g. Homeowner"
                placeholderTextColor={colors.textMuted}
              />

              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                value={form.location}
                onChangeText={(v) => setForm({ ...form, location: v })}
                placeholder="e.g. Austin, TX"
                placeholderTextColor={colors.textMuted}
              />

              <Text style={styles.inputLabel}>Testimonial *</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={form.text}
                onChangeText={(v) => setForm({ ...form, text: v })}
                placeholder="What did the customer say?"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <Text style={styles.inputLabel}>Service</Text>
              <TextInput
                style={styles.input}
                value={form.service}
                onChangeText={(v) => setForm({ ...form, service: v })}
                placeholder="e.g. Interior Painting"
                placeholderTextColor={colors.textMuted}
              />

              <Text style={styles.inputLabel}>Rating (1-5)</Text>
              <TextInput
                style={styles.input}
                value={form.rating}
                onChangeText={(v) => setForm({ ...form, rating: v })}
                placeholder="5"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                maxLength={1}
              />

              <TouchableOpacity style={styles.saveBtn} onPress={handleAdd} activeOpacity={0.7}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.saveBtnText}>Save Testimonial</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.title,
    fontSize: 28,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: 12,
    gap: spacing.xs,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  listContentEmpty: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    ...card,
    gap: 0,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  quoteIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.warningLight,
    alignItems: "center",
    justifyContent: "center",
  },
  badges: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  badgeFeatured: {
    backgroundColor: colors.warningLight,
  },
  badgeHidden: {
    backgroundColor: colors.dangerLight,
  },
  badgeText: {
    ...typography.badge,
  },
  cardIdentity: {
    marginBottom: spacing.sm,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  cardRole: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardService: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
  },
  emptyIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.88,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sheetContent: {
    paddingHorizontal: spacing.xl,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sheetHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  sheetAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.warningLight,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  sheetRole: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 1,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.lg,
  },
  sheetQuote: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 23,
    fontStyle: "italic",
  },
  sheetInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.lg,
  },
  sheetInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  sheetInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  toggleLabel: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md + 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dangerLight,
    backgroundColor: colors.dangerLight,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  deleteBtnText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: spacing.md,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md + 2,
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
