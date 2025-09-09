import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useTransaction = (userId: String | undefined) => {
  // Use 10.0.2.2 for Android emulator, localhost for iOS
  // const API_URL =
  //   Platform.select({
  //     android: "http://10.0.2.2:5001/api",
  //     ios: "http://localhost:5001/api",
  //   }) || "http://localhost:5001/api"; // fallback

  const API_URL = "https://rn-wallet-backend-cwz0.onrender.com/api";

  console.log(userId, "UserID in hook");

  const [transaction, setTransaction] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseText = await response.text(); // Get response as text first
      console.log("Summary Response:", responseText); // Log the raw response
      const data = JSON.parse(responseText); // Then parse it
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error, "UserId:", userId);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);

    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchSummary, fetchTransactions, userId]);

  const deleteTransaction = async (transactionId: number) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", "Failed to delete transaction");
    }
  };

  return { transaction, summary, loading, loadData, deleteTransaction };
};
