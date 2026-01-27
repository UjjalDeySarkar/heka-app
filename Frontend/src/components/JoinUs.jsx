import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import roundArrow from "../assets/roundarrow.png";
import ic3 from "../assets/nurse-female.png";  // Use appropriate icons
import ic2 from "../assets/nurse-male.png";    // Use appropriate icons

// ✅ Only 2 courses now
const services = [
    { title: "Assistant", sub: "Nursing", image: ic3, route: "/admission-form" },
    { title: "Midwifery", sub: "Course", image: ic2, route: "/admission-form" },
];

export default function JoinUs() {
    const navigate = useNavigate();

    const handleCardClick = (c) => {
        const serviceLabel = `${c.title} ${c.sub}`;
        navigate(`/admission-form?service=${encodeURIComponent(serviceLabel)}`, {
            state: { selectedService: serviceLabel },
        });
    };

    useEffect(() => {
        AOS.init({});
        AOS.refresh();
    }, []);

    return (
        <div className="font-dmsans w-full bg-white flex flex-col gap-20 items-center p-4 rounded-[24px] mb-28">
            <div className="bg-white flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                        <h1 className="text-[34px] font-semibold text-[#4B9B6E] tracking-tighter">To Join Us</h1>
                        <img src={roundArrow} alt="" className="h-[36px] w-[36px]" />
                    </div>
                </div>

                {/* ✅ Updated grid for 2 items - centered */}
                <div className="grid grid-cols-2 gap-x-6 px-4 gap-y-5 w-full max-w-[300px] mx-auto">
                    {services.map((item, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => handleCardClick(item)}
                            className="flex flex-col gap-2 items-center text-center focus:outline-none active:scale-95 transition-transform duration-150 bg-transparent"
                        >
                            <div className="bg-[#93D8B1] p-3 rounded-[12px]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-[44px] w-[44px] object-contain"
                                />
                            </div>
                            <div className="font-dmsans tracking-tighter flex flex-col text-[16px] font-semibold text-[#4B9B6E] -space-y-2">
                                <p>{item.title}</p>
                                <p>{item.sub}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}