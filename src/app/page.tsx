"use client";
import axios from "axios";
import React, { useEffect, useState, useMemo, memo } from "react";

interface Feature {
  img: string;
  title: string;
  desc: string;
}

interface ComponentData {
  content: string;
  about: Feature[];
}

const WhyChooseUs: React.FC = memo(() => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [componentData, setComponentData] = useState<ComponentData | null>(
    null
  );

  useEffect(() => {
    // Fetch data from the Strapi API
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://outsource-backend.onrender.com/api/whyuses?populate=*"
        );
        setComponentData(data.data[0].attributes);
        console.log(data.data[0].attributes);
      } catch (error) {
        console.error("Error fetching data from Strapi:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  // Memoize the features array to avoid unnecessary recalculations
  const features = useMemo(() => componentData?.about || [], [componentData]);

  if (!componentData) {
    return <p>Loading...</p>; // Or any loading indicator
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-black text-sm uppercase">Why Choose Us</h2>
          <h1 className="text-3xl font-bold mt-2">
            We Are Different From Others
          </h1>
          <p className="text-gray-600 mt-4 md:mx-20 mx-10">
            {componentData.content}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="relative w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <div className="rounded-full h-64 w-64 lg:h-80 lg:w-80 md:bg-red-400 bg-red-500/50 opacity-90 absolute z-10 lg:right-[30vw] md:right-[40vw] sm:right-[30vw]">
              <div className="text-white p-8 flex flex-col justify-center items-center text-center h-full">
                <h3 className="text-lg font-bold">
                  {features[selectedIndex].title}
                </h3>
                <p className="text-sm mt-2">{features[selectedIndex].desc}</p>
              </div>
            </div>
            <img
              src={features[selectedIndex].img}
              alt={features[selectedIndex].title}
              className="rounded-full h-64 w-64 lg:h-80 lg:w-80 object-cover z-0"
              loading="eager"
            />
          </div>
          <div className="flex flex-col items-center lg:ml-12">
            {features.map((feature: any, index: number) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`flex w-[80vw] md:w-[50vw] lg:w-[30vw] sm:gap-[6rem] items-center justify-between py-2 px-5 my-2 text-left border rounded-l-full ${
                  selectedIndex === index
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <span>{"<"}</span>
                <span className="ml-2">{feature.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhyChooseUs;
