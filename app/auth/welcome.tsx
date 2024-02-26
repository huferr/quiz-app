import { router } from "expo-router"
import { Typography, SafeView } from "../../components"
import { Button } from "@/components/Button"

export default function Welcome() {
  const signInWithEmail = async () => {
    router.push("/auth/sign-in")
  }

  return (
    <SafeView paddingHorizontal={16}>
      <Typography
        textAlign="center"
        marginBottom={24}
        marginTop={24}
        fontSize={24}
      >
        Welcome
      </Typography>

      <Button marginBottom={16}>
        <Typography color="#fff">Entrar usando Google</Typography>
      </Button>

      <Button marginBottom={16}>
        <Typography color="#fff">Entrar usando Apple</Typography>
      </Button>

      <Button onPress={signInWithEmail}>
        <Typography color="#fff">Entrar usando email</Typography>
      </Button>
    </SafeView>
  )
}
