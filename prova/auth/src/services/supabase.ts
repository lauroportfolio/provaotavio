import "react-native-url-polyfill"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import App from "../../App";
import { AppState } from "react-native/types";

const supabaseUrl = "SUPABASE_URL";
const supabaseAnonKey = "SUPABASE_API_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

AppState.addEventListener("change", (state) => {
    if(state === "active") {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});