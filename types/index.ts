import { Database } from "./api"

export interface GeneralProps {
  mb?: number
  mt?: number
  ml?: number
  mr?: number
}

export type Question = Database["public"]["Tables"]["questions"]["Row"]

export type User = Database["public"]["Tables"]["profiles"]["Row"]

export type Battle = Database["public"]["Tables"]["battles"]["Row"]
