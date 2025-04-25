import { createContext, useReducer, ReactNode, Dispatch } from "react";

// --- Types and Interfaces ---

// Your user object type (customize based on your backend response)
interface User {
  _id: string;
  Email: string;
  name?: string; // <-- add this
  address?: string; // <-- and this
}

// Auth state
interface AuthState {
  user: User | null;
  token: string | null;
}

// Auth action types
type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" };

// Context value type
interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// Props for AuthContextProvider
interface AuthProviderProps {
  children: ReactNode;
}

// --- Reducer ---

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

// --- Context ---

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  dispatch: () => {},
});

// --- Context Provider ---

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  // Check if the stored user is a valid JSON string before parsing
  const initialState: AuthState = {
    user:
      storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
    token: storedToken ?? null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
