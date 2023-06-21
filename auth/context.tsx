"use client";

import { createContext } from "react";

export const AuthContext = createContext({
  tenant: null,
});
