"use client";

import Image from "next/image";

const Hero = () => {
    return (
        <section className="h-dvh flex items-end justify-between flex-col">
            <div className=" w-[22rem] pe-4 z-10">
                <p className="text-2xl text-bg text-end ">
                    Your daily dose of
                    <br />
                    caffeine and positivity
                </p>
            </div>

            <Image
                alt="Hero Image"
                src="/images/coffee.webp"
                width={900}
                height={900}
                className=" object-cover absolute top-0 left-0 w-full h-full"
            ></Image>
            <div className=" object-cover absolute top-0 left-0 w-full h-full bg-primary opacity-90"></div>
            <div className="absolute top-0 left-0 flex items-end w-full h-full">
                <div className="w-full h-auto sticky bottom-96 rounded-xl flex items-center justify-between flex-wrap z-10">
                    {/* <Image
                        alt="Hero Image"
                        src="/images/logo.svg"
                        width={200}
                        height={200}
                        className=" object-cover rounded-xl"
                    ></Image> */}
                    <h1 className="text-8xl text-secondary font-extrabold">
                        Mood Coffee
                    </h1>
                    <div className="w-auto text-justify">
                        <p className="text-lg text-bg">
                            <strong>Our oping hours are</strong>
                            <br /> 8 AM to 8 PM, Monday to Friday
                            <br /> 9 AM to 9 PM on weekends
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
