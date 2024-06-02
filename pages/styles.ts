import {base,dark} from "@theme-ui/presets";
import { merge,useColorMode} from "theme-ui";
import { useCallback } from "react";

export const theme = merge(base, {
    colors : {
        ...base.colors,
        modes: {
            dark:dark.colors
        }
    }
});

enum ColorMode {
    Default = "default",
    Dark = "dark",
}


export function useToggleColorMode(){
    const [mode, setColorMode] = useColorMode();

    return useCallback(() =>{
    //modeがdefaultだったらdarkを返す
    const newMode =
        mode === ColorMode.Default ? ColorMode.Dark : ColorMode.Default;
        setColorMode(newMode);
    },[]);
}
