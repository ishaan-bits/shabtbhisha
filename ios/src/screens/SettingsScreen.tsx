import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { colors, spacing, typography, card, cardShadow } from "../theme";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={36} color={colors.white} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileEmail}>{user?.email || "No email"}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>Admin</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
                <Ionicons name="person-circle-outline" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Signed in as</Text>
                <Text style={styles.settingValue}>{user?.email || "Not signed in"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <View style={styles.signOutLeft}>
              <View style={styles.signOutIconContainer}>
                <Ionicons name="log-out-outline" size={20} color="#e53935" />
              </View>
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#e53935" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
                <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.settingLabel}>App Version</Text>
                <Text style={styles.settingValue}>1.0.0</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.settingLabel}>Application</Text>
                <Text style={styles.settingValue}>Shatabhisha Admin</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Ionicons name="heart" size={14} color="#e53935" />
          <Text style={styles.footerText}>Made with heart by Ishaan Parimal</Text>
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: typography.sizes.h1,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: card.borderRadius,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    ...cardShadow,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  profileEmail: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginBottom: 4,
  },
  roleBadge: {
    backgroundColor: colors.primary + "15",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  roleText: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: card.borderRadius,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...cardShadow,
  },
  sectionTitle: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  settingValue: {
    fontSize: typography.sizes.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderWidth: 1.5,
    borderColor: "#e53935",
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  signOutLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  signOutIconContainer: {
    marginRight: spacing.sm,
  },
  signOutText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    color: "#e53935",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
  },
  footerText: {
    fontSize: typography.sizes.caption,
    color: colors.textSecondary,
    marginLeft: 6,
  },
});
