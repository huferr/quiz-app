import { router } from "expo-router"
import { Typography, SafeView } from "../../components"
import { useState } from "react"
import { supabase } from "@/api"
import { TextField } from "@/components/TextField"
import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import styled from "styled-components/native"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function login() {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (!error && !data.user) {
      setLoading(false)
      alert("Check your email for the login link!")
    }

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    router.push("/home")
  }

  const onGoBack = () => {
    router.push("/auth/welcome")
  }

  return (
    <SafeView>
      <PageHeader title="Entrar com E-mail" onPressGoBack={onGoBack} mb={24} />
      <Page>
        <TextField
          label="E-mail"
          value={email}
          onChangeText={(e) => setEmail(e)}
          marginBottom={24}
          placeholder="Digite seu E-mail"
          returnKeyType="next"
        />

        <TextField
          label="Senha"
          secureTextEntry
          value={password}
          onChangeText={(e) => setPassword(e)}
          placeholder="Digite sua senha"
        />

        <Button marginTop={24} onPress={login}>
          <Typography color="#fff" fontWeight="600">
            Continuar
          </Typography>
        </Button>

        <Button
          marginTop={16}
          onPress={() => router.push("/auth/sign-up")}
          type="secondary"
        >
          <Typography color="#fff" fontWeight="600">
            Criar nova conta
          </Typography>
        </Button>
      </Page>
    </SafeView>
  )
}

export const Page = styled.View`
  padding-right: 16px;
  padding-left: 16px;
`
