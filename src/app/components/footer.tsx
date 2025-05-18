"use client";

import Image from "next/image";

const Footer = () => {
    return (
        <footer className="h-[25rem] bg-bg flex flex-col items-center justify-center gap-5">
            <Image
                alt="Hero Image"
                src="/images/logo.svg"
                width={200}
                height={200}
                className=" object-cover rounded-xl mt-auto"
            ></Image>
            <div className="flex flex-col items-center justify-center *:text-primary mt-auto">
                <p>Phone number: 248 940 5521</p>
                <p>Adresse: 5385 Crooks Rd Troy,Michigan 48098</p>
                <p>Mood Coffee LLC</p>
                <p className="text-white text-lg my-2">
                    © {new Date().getFullYear()} Mood Coffee
                </p>
            </div>
        </footer>
    );
};

export default Footer;
