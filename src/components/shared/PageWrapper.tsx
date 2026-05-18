import type { ReactNode } from "react";
import Navbar from "../Navbar";

interface Props {
    children: ReactNode;
}

const PageWrapper = ({ children }: Props) => (
    <>
        <Navbar />
        <main
            style={{
                minHeight: "calc(100vh - 64px)",
                background: "var(--bg-main)",
                paddingTop: "1.5rem",
                paddingBottom: "3rem",
            }}>
            {children}
        </main>
    </>
);

export default PageWrapper;
