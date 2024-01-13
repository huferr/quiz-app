import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { SafeView, Typography } from "@/components";

export default function Play() {
  return (
    <SafeView paddingHorizontal={24}>
      <Typography>Play</Typography>

      <Typography>Selecione o modo de jogo:</Typography>

      <TouchableOpacity
        onPress={() => router.push("/game/marathon/onboarding")}
      >
        <Typography fontWeight="700">Maratona</Typography>
      </TouchableOpacity>
    </SafeView>
  );
}
