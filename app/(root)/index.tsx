import { styles } from "@/assets/styles/home.styles";
import PageLoader from "@/components/PageLoader";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransaction } from "@/hooks/useTransaction";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { transaction, summary, loading, loadData, deleteTransaction } =
    useTransaction(user?.id);

  const router = useRouter();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/** Header */}
        <View style={styles.header}>
          {/** Left Header */}
          <View style={styles.headerLeft}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/** Right Header */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
      </View>
    </View>
  );
}
