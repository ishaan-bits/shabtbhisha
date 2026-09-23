import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { colors, spacing, typography, card } from "../theme";

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaTitle: string;
  ctaText: string;
  founderName: string;
  founderBio: string;
  phone: string;
  email: string;
  address: string;
}

const defaultContent: SiteContent = {
  heroTitle: "Welcome to Our Site",
  heroSubtitle: "Discover something amazing",
  aboutText: "We are a company dedicated to excellence.",
  ctaTitle: "Get Started",
  ctaText: "Sign up today and begin your journey.",
  founderName: "John Doe",
  founderBio: "Passionate entrepreneur with a vision.",
  phone: "+1 (555) 123-4567",
  email: "contact@example.com",
  address: "123 Main St, City, State 12345",
};

const fieldLabels: Record<keyof SiteContent, string> = {
  heroTitle: "Hero Title",
  heroSubtitle: "Hero Subtitle",
  aboutText: "About Text",
  ctaTitle: "CTA Title",
  ctaText: "CTA Text",
  founderName: "Founder Name",
  founderBio: "Founder Bio",
  phone: "Phone",
  email: "Email",
  address: "Address",
};

const multilineFields: (keyof SiteContent)[] = [
  "aboutText",
  "ctaText",
  "founderBio",
  "address",
];

type SectionKey =
  | "hero"
  | "about"
  | "cta"
  | "founder"
  | "contact";

interface SectionDef {
  key: SectionKey;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  fields: (keyof SiteContent)[];
}

const sections: SectionDef[] = [
  {
    key: "hero",
    title: "Hero Section",
    icon: "flash-outline",
    fields: ["heroTitle", "heroSubtitle"],
  },
  {
    key: "about",
    title: "About",
    icon: "information-circle-outline",
    fields: ["aboutText"],
  },
  {
    key: "cta",
    title: "Call to Action",
    icon: "megaphone-outline",
    fields: ["ctaTitle", "ctaText"],
  },
  {
    key: "founder",
    title: "Founder",
    icon: "person-outline",
    fields: ["founderName", "founderBio"],
  },
  {
    key: "contact",
    title: "Contact Info",
    icon: "call-outline",
    fields: ["phone", "email", "address"],
  },
];

export default function ContentScreen() {
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const db = getFirebaseDb();
    const ref = doc(db, "site", "content");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setContent({ ...defaultContent, ...snap.data() } as SiteContent);
      }
    });
    return unsub;
  }, []);

  const handleChange = (key: keyof SiteContent, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const db = getFirebaseDb();
      const ref = doc(db, "site", "content");
      await updateDoc(ref, content as any);
      Alert.alert("Saved", "Content updated successfully.");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      Alert.alert("Error", message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Content</Text>
          <Text style={styles.headerSubtitle}>Edit site content</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {sections.map((section) => (
            <View key={section.key} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name={section.icon}
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              <View style={styles.card}>
                {section.fields.map((field) => {
                  const isMulti = multilineFields.includes(field);
                  return (
                    <View key={field} style={styles.fieldWrap}>
                      <Text style={styles.fieldLabel}>
                        {fieldLabels[field]}
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          isMulti && styles.inputMulti,
                        ]}
                        value={content[field]}
                        onChangeText={(v) => handleChange(field, v)}
                        multiline={isMulti}
                        numberOfLines={isMulti ? 4 : 1}
                        textAlignVertical={isMulti ? "top" : "center"}
                        placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: insets.bottom + spacing.sm },
          ]}
        >
          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.8}
          >
            <Ionicons
              name={saving ? "hourglass-outline" : "checkmark-circle-outline"}
              size={22}
              color="#fff"
            />
            <Text style={styles.saveBtnText}>
              {saving ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f8f6f3",
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold as any,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold as any,
    color: colors.text,
  },
  card: {
    ...card,
    padding: spacing.md,
    gap: spacing.md,
  },
  fieldWrap: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0ddd8",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  inputMulti: {
    minHeight: 100,
    paddingTop: spacing.sm,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f6f3",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0ddd8",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold as any,
    color: "#fff",
  },
});
