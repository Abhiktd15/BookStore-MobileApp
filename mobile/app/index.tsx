import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to Bookstore App!</Text>
      <Link href="/(auth)" style={{ marginTop: 20, fontSize: 18, color: 'blue' }}>
        Go to Login
      </Link>
      <Link href="/(auth)/signup" style={{ marginTop: 20, fontSize: 18, color: 'blue' }}>
        Go to Signup
      </Link>
    </View>
  );
}
