import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
    title: "Mood Coffee",
    description:
        "A coffee shop located in the heart of Troy, michigan. We serve a variety of coffee drinks, pastries, and light meals. Our cozy atmosphere is perfect for studying, working, or catching up with friends.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-bg">
            <body className="w-[100%] max-w-[1450px] mx-auto">{children}</body>
        </html>
    );
}
