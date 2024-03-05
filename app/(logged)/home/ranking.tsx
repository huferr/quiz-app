import { View } from "react-native";

import { LoadingScreen, PageHeader, SafeView, Typography } from "@/components";
import { useGetGlobalRanking } from "@/hooks";
import styled from "styled-components/native";

export default function Ranking() {
  const { data: ranking, isLoading } = useGetGlobalRanking();

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeView>
      <PageHeader
        title="Ranking Global"
      />
      <Page>
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
      </Page>

    </SafeView>
  );
}

const Page = styled.View`
  padding: 0px 16px;
`
