import {Session, User} from "@supabase/supabase-js";
import {create} from "zustand";
import {supabase} from "@/lib/supabase";

type AuthState = {
    session: Session | null;
    user: User | null;
    setSession: (s: Session | null) => void;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    user: null,
    setSession: (s) => set({session: s, user: s?.user ?? null}),
    logout: async () => {
        await supabase.auth.signOut();
        set({session: null, user: null})
    }
}));