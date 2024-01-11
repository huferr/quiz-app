import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { Typography, SafeView } from "../../components";
import { useState } from "react";
import { supabase } from "@/api";
import { TextInput } from "react-native-gesture-handler";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
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

    if (data.user) {
      router.push("/home");
    }
  }
  return (
    <SafeView>
      <Typography>Sign Up</Typography>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={(e) => setEmail(e)} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={(e) => setPassword(e)} />

      <Pressable onPress={register}>
        <Typography>Sign Up</Typography>
      </Pressable>
    </SafeView>
  );
}
