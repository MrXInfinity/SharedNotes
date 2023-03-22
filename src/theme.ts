import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
// When using TypeScript 4.x and above
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { useState } from "react";

const designPalette = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light' ? {
      primary: {
        main: "#F07534",
        contrastText: "#FFFFFF"
      },
      background: {
        default: "#FFFFFF",
        paper: "#F6F6F6",
            }
        } : {
      primary: {
        main: "#F09667",
        contrastText: "#000000"
      },
      background: {
        default: "#2A2A3B",
        paper: "#2E2E41",
                }
        }),
    }
})

const useCustomTheme = () => {
    const [mode, setMode] = useState<("light" | "dark")>("light")
    
      const changeTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

    const theme = createTheme(designPalette(mode))
    
    return {theme, changeTheme}
}

export default useCustomTheme