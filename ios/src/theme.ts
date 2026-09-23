import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const colors = {
  primary: "#4a3728",
  primaryLight: "#6b5240",
  primaryDark: "#2e2118",
  accent: "#c9a96e",
  background: "#f8f6f3",
  surface: "#ffffff",
  surfaceElevated: "#fefefe",
  white: "#ffffff",
  text: "#1a1a1a",
  textSecondary: "#666666",
  textMuted: "#999999",
  muted: "#999999",
  border: "#e8e4e0",
  borderLight: "#f0ece8",
  danger: "#dc2626",
  dangerLight: "#fef2f2",
  success: "#059669",
  successLight: "#ecfdf5",
  warning: "#d97706",
  warningLight: "#fffbeb",
  info: "#2563eb",
  infoLight: "#eff6ff",
  purple: "#7c3aed",
  purpleLight: "#f5f3ff",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const typography = {
  title: { fontSize: 24, fontWeight: "700" as const, color: colors.text, letterSpacing: -0.5 },
  h1: { fontSize: 24, fontWeight: "700" as const, color: colors.text },
  h2: { fontSize: 20, fontWeight: "700" as const, color: colors.text },
  h3: { fontSize: 16, fontWeight: "600" as const, color: colors.text },
  subtitle: { fontSize: 16, fontWeight: "600" as const, color: colors.text },
  body: { fontSize: 15, color: colors.text },
  bodyLarge: 16,
  bodySmall: 13,
  caption: { fontSize: 13, color: colors.textSecondary },
  muted: { fontSize: 12, color: colors.textMuted },
  badge: { fontSize: 11, fontWeight: "600" as const },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 16,
    xl: 18,
    xxl: 24,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  sizes: {
    xs: 11,
    sm: 13,
    caption: 13,
    body: 15,
    md: 15,
    lg: 16,
    xl: 18,
    h3: 16,
    h2: 20,
    h1: 24,
    xxl: 24,
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

export const cardShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 3,
};

export const card = {
  backgroundColor: colors.surface,
  borderRadius: 16,
  padding: spacing.lg,
};

export const screenPadding = spacing.xl;

export { SCREEN_WIDTH };
