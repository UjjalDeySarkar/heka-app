import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import allopathy from "../assets/Allopathy.png";
import homeopathy from "../assets/Homeopathy.png";
import ayurvedic from "../assets/Ayurvedic.png";
import moreThan from "../assets/moreThan.png"
import roundArrow from "../assets/roundarrow.png"

import ic1 from "../assets/heartrate.png"
import ic2 from "../assets/nurse-male.png"
import ic3 from "../assets/nurse-female.png"

const services = [
    { title: "Nursing Asst.", sub: "Female", image: ic3, route: "/choose-city/hospitals" },
    { title: "Nursing Asst.", sub: "Male", image: ic2, route: "/choose-city/hotels" },
    { title: "Health", sub: "technician", image: ic1, route: "/choose-city/rooms" },

];

const categories = [
    { title: "Allopathy", icon: allopathy },
    { title: "Homeopathy", icon: homeopathy },
    { title: "Ayurvedic", icon: ayurvedic },
];



export default function JoinUs() {
    const [selectedCategory, setSelectedCategory] = useState("Allopathy");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const filteredServices = services;

    const handleCardClick = (c) => {
        if (c.isPopup) {
            setShowPopup(true);
        } else {
            navigate(c.route);
        }
    };

    useEffect(() => {
        AOS.init({})
        AOS.refresh()
    }, [])

    return (
        <div className="font-dmsans w-full bg-white flex flex-col gap-20 items-center p-4 rounded-[24px] mb-28">
            <div className="bg-white flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                        <h1 className="text-[34px] font-semibold text-[#4B9B6E] tracking-tighter">To Join Us</h1>
                        <img src={roundArrow} alt="" className="h-[36px] w-[36px]" />
                    </div>
                    {/* <p className="text-[#4B9B6E] text-xs leading-[15px] max-w-[170px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p> */}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-x-6 px-1 gap-y-5 w-full">
                    {services.map((item, index) => (
                        <a
                            href="tel:6289924753"
                            key={index}
                            className="flex flex-col gap-2 items-center text-center focus:outline-none active:scale-95 transition-transform duration-150"
                        >
                            <div className="bg-[#93D8B1] p-2 rounded-[12px]">
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
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

