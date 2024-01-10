import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { SafeView, Typography } from "@/components";

export default function Marathon() {
  return (
    <SafeView>
      <Typography>Marathon</Typography>

      <TouchableOpacity onPress={() => router.push("/home")}>
        <Typography fontWeight="700">Voltar</Typography>
      </TouchableOpacity>
    </SafeView>
  );
}
