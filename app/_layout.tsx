import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot screenOptions={{ headerShown: false }} />
      </SafeScreen>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
    </ClerkProvider>
  );
}
