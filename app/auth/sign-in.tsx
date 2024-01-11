import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { Typography, SafeView } from "../../components";
import { useState } from "react";
import { supabase } from "@/api";
import { TextInput } from "react-native-gesture-handler";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error && !data.user) {
      setLoading(false);
      alert("Check your email for the login link!");
    }
    if (error) {
      setLoading(false);
      alert(error.message);
    }

    router.push("/home");
  }
  return (
    <SafeView>
      <Typography>Sign In</Typography>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={(e) => setEmail(e)} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={(e) => setPassword(e)} />

      <Pressable onPress={login}>
        <Typography>Sign In</Typography>
      </Pressable>

      <Pressable onPress={() => router.push("/auth/sign-up")}>
        <Typography>Register</Typography>
      </Pressable>
    </SafeView>
  );
}
