import { Transition } from "@headlessui/react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HomeHeroBanner() {
  const [letterWidth, setLetterWidth] = useState<number>();
  const titleArray = "sosaintquentin".split("");
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (sectionRef.current) {
      const width = sectionRef.current.offsetWidth;
      const division = titleArray.length;
      setLetterWidth(Math.round((width / division) * 1.25));
    }
  }, [sectionRef, sectionRef?.current?.offsetWidth]);
  return (
    <section ref={sectionRef} className=" relative h-screen w-full">
      {/* <div className=" absolute -z-10 top-0 left-0 h-full w-full" style={{
                backgroundSize: 'cover',
                backgroundImage: "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)"}} 
                /> */}
      {/* <div className=" absolute top-0 left-0 h-full w-full  flex justify-center items-center">
        <Title />
      </div> */}
      <Carousel />
      <h1
        style={{ fontSize: `${letterWidth}px` }}
        className=" absolute z-10 w-full bottom-0 translate-y-1/2 flex justify-between uppercase font-semibold text-orange-300"
      >
        {titleArray.map((letter) => (
          <span>{letter}</span>
        ))}
      </h1>
    </section>
  );
}

function Title() {
  return (
    <div className="w-[1044]">
      <div className=" flex flex-col gap-4 py-28 w-2/3">
        <span className="font-bold text-base uppercase">été 2023</span>
        <h1>Un cadeau spécial chez SO'</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim
          libero non erat eleifend vulputate. Cras ac tempus felis, nec
          tincidunt justo.
        </p>
        <button className="default-btn bg-blue-500 text-white">
          un bouton
        </button>
      </div>
    </div>
  );
}

function Carousel() {
  const [active, setActive] = useState(0);
  const carouselData = [
    {
      label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imgSrc:
        "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imgSrc:
        "https://images.unsplash.com/photo-1499781267481-c08f58e58be4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      if (carouselData.length < active + 2) {
        setActive(0);
      } else {
        setActive(active + 1);
      }
    }, 3000);
  }, [active]);
  return (
    <div className="absolute  top-0 left-0 h-full w-full">
      {carouselData.map((item, index) => (
        <div className={`${index === active ? "" : "opacity-0"} duration-300 ease-in`}>
          <div className="w-full h-full bg-black absolute z-10 opacity-5" />
          <Image
            fill
            className=" object-cover"
            alt="CarouselA"
            src={item.imgSrc}
          />
          <div className=" absolute bottom-0 z-20 w-2/5 left-1/2 -translate-x-1/2 mt-auto text-center space-y-10 pb-40">
            <span className="block text-white text-4xl font-semibold">
              {item.label}
            </span>
            <button className=" text-white font-semibold text-xl py-4 px-20 border-white border-2 rounded-md inline-block">
              Consulter{" "}
              <span>
                <ArrowUpRightIcon className="ml-2 inline w-5" />
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
