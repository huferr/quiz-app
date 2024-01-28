import { View } from "react-native";

import { SafeView, Typography } from "@/components";
import { useGetGlobalRanking } from "@/hooks";

export default function Ranking() {
  const { data: ranking } = useGetGlobalRanking();

  return (
    <SafeView paddingHorizontal={24}>
      <Typography fontWeight="400">Ranking</Typography>
      {ranking?.map((user) => {
        return (
          <View
            key={user.id}
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography>{user.username || user.id}</Typography>
            <Typography>{user.rank}</Typography>
          </View>
        );
      })}
    </SafeView>
  );
}
