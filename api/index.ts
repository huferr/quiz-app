import axios from "axios";
import { Platform } from "react-native";
import { isPlatform } from "../utils";

export const api = axios.create({
  baseURL: isPlatform("android")
    ? "http://10.0.2.2:8080/"
    : "http://localhost:8080/",
});
