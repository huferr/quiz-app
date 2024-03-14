import { Database } from "./api"

type DBType<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export interface GeneralProps {
  mb?: number
  mt?: number
  ml?: number
  mr?: number
}

export type User = DBType<"profiles">

export type Question = DBType<"questions">

export type Battle = DBType<"battles">

export enum QuestionTypes {
  history = "history",
  science = "science",
  geo = "geo",
  math = "math"
}
