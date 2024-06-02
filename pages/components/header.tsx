import { IconButton } from "theme-ui";
import { IoMdSunny } from "react-icons/io"
import {  useToggleColorMode } from "../styles"
//カスタムフックすをとってくる
export function Header() {
    const toggleColorMode = useToggleColorMode();
    return (
        <header>
            <h1>Next.js blog</h1>
            <IconButton aria-label="Toggle dark mode">
                <IoMdSunny size={28} />
            </IconButton>
        </header>
    )

}