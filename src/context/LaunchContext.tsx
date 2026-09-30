import type {Launch} from "../types/types.ts";
import {createContext} from "react";


type LaunchContextType = {
    selectLaunch: (launch: Launch) => void;
};

export const LaunchContext = createContext<LaunchContextType | null>(null)