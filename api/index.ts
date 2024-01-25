import "react-native-url-polyfill/auto"
import * as SecureStore from "expo-secure-store"
import { createClient } from "@supabase/supabase-js"
import axios from "axios"

import { isPlatform } from "../utils"

export const api = axios.create({
  baseURL: isPlatform("android")
    ? "http://10.0.2.2:8080/"
    : "https://bac5-2804-d45-3650-eb00-c2f-1f4f-d20c-aaf.ngrok-free.app"
})

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key)
}

export const supabase = createClient(
  "https://jnlfiaithtwymoiibqis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubGZpYWl0aHR3eW1vaWlicWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4NzM5NTUsImV4cCI6MjAxOTQ0OTk1NX0.Rfd4aPnaZEUt6hxWWp4lGCm5KBXrxOtCogii-K0Hb84",
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true
    }
  }
)
