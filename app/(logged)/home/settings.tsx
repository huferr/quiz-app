import { Typography, SafeView } from "@/components"
import { supabase } from "@/api"
import { Pressable } from "react-native"
import { PageHeader } from "@/components/PageHeader"
import styled from "styled-components/native"
import { router } from "expo-router"

export default function Settings() {

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      alert("Signed out!")
    }
    if (error) {
      alert(error.message)
    }
  }

  const goToProfile = () => {
    router.push("/home/profile")
  }

  return (
    <SafeView>
      <PageHeader title="Configurações" onPressGoBack={goToProfile} />
      <Page>
        <Pressable onPress={logout}>
          <Typography>Logout</Typography>
        </Pressable>
      </Page>
    </SafeView>
  )
}

const Page = styled.View`
  padding: 0px 16px;
`
