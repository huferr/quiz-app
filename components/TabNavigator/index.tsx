import { BottomTabBarProps } from "@react-navigation/bottom-tabs/src/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { MedalIcon, ShoppingCartIcon } from "lucide-react-native";
import { HomeIcon, PlayIcon, User } from "lucide-react-native";
import { HOME_ROUTES } from "@/constants";

import styled from "styled-components/native";

export function TabNavigator(props: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const pathname = usePathname()

  const homeRoutes = props.state.routes.filter((route) =>
    HOME_ROUTES.some((homeRoute) => homeRoute.includes(route.name))
  )

  const homeRoute = homeRoutes.find((route) => route.name === "index")!;
  const playRoute = homeRoutes.find((route) => route.name === "play")!;
  const storeRoute = homeRoutes.find((route) => route.name === "store")!;
  const rankingRoute = homeRoutes.find((route) => route.name === "ranking")!;
  const profileRoute = homeRoutes.find((route) => route.name === "profile")!;

  const routes = [homeRoute, rankingRoute, playRoute, storeRoute, profileRoute];

  const icons: { [x: string]: (color: string) => React.JSX.Element } = {
    index: (color) => <HomeIcon color={color || "#000"} />,
    ranking: (color) => <MedalIcon color={color || "#000"} />,
    profile: (color) => <User color={color || "#000"} />,
    play: (color) => <PlayIcon color={color || "#000"} />,
    store: (color) => <ShoppingCartIcon color={color || "#000"} />,
  };

  const handleClick = (route: (typeof homeRoutes)[0]) => {
    const routeName = route.name === "index" ? "" : route.name;
    router.push("/home/" + routeName);
  };

  return (
    <Container bottom={bottom}>
      {routes.map((route) => {

        const path = route.name === "index" ? "/home" : "/home/" + route.name;
        return (
          <IconButton key={route.key} onPress={() => handleClick(route)}>
            {icons?.[route?.name]?.(
              pathname === path ? "#2A74E4" : "#000"
            )}
          </IconButton>
        );
      })}
    </Container>
  );
}

const Container = styled.View<{ bottom: number }>`
  padding: 16px 24px;
  padding-bottom: ${(props) => props.bottom || 16}px;
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #e7e7e7;
  background-color: #fff;
  position: relative;
  bottom: 0;
`;

const IconButton = styled.TouchableOpacity`
  border-radius: 50px;
  padding: 8px;
  align-items: center;
  justify-content: center;
`;
