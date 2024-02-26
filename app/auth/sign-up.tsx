import { router } from "expo-router"
import { Typography, SafeView } from "../../components"
import { useState } from "react"
import { supabase } from "@/api"
import styled from "styled-components/native"
import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { TextField } from "@/components/TextField"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)

  async function register() {

    if(password !== confirmPassword) {
      alert("As senhas não coincidem")
      return
    }
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
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
    }

    if (data.user) {
      router.push("/home")
    }
  }

  const onGoBack = () => {
    router.push("/auth/sign-in")
  }
  return (
    <SafeView>
      <PageHeader
        title="Criar uma nova conta"
        onPressGoBack={onGoBack}
        mb={24}
      />

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
          marginBottom={24}
          onChangeText={(e) => setPassword(e)}
          placeholder="Digite sua senha"
        />

        <TextField
          label="Confirmar senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(e) => setConfirmPassword(e)}
          placeholder="Digite sua senha novamente"
        />

        <Button marginTop={24} onPress={register}>
          <Typography color="#fff" fontWeight="600">
            Continuar
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
