import PageSlogan from "@/components/PageSlogan";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function About() {

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.utils.toArray(".about-paralax").forEach((image) => {
            gsap.to(image, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 4,
                  },
                  y: 200
            })
        })
    }, [])
  return (
    <div className=" pt-20 w-full mx-auto">
      <HeroBanner />
      <PageSlogan value="Rechercher LA pièce qui vous inspirera" />
      <Content />
    </div>
  );
}

function HeroBanner() {

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
            gsap.to(".hero-paralax", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 4,
                  },
                  y: 100
            })
    }, [])
  return (
    <div
    ref={container}
      className="w-[90%] mx-auto h-[85vh] relative"
    >
      <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
        <Image
        fill
        src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="sosaintquentin-logo"
        className="object-cover hero-paralax scale-125"
        />

      </div>
      <div className="w-full h-full bg-black opacity-10 absolute"></div>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 flex justify-between items-center  text-white">
        <span className="block font-Handwright text-9xl first-letter:uppercase">
          so'
        </span>
        <span className="block font-Handwright text-7xl first-letter:uppercase">
          Pret à porter féminin
        </span>
      </h1>
      <div className="h-80 w-80 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          fill
          src="/static/assets/img/logo.png"
          alt="sosaintquentin-logo"
          className="object-contain invert"
        />
      </div>
    </div>
  );
}

function Content() {
    
    
  return (
    <div>
    <div className="w-full  h-32 bg-gray-100"/>
    <section className="w-full relativebg-gray-800 bg-gray-800 grid grid-cols-5 grid-rows-[7]">
      <div
        style={{ gridArea: "1 / 1 / 3 / 3" }}
        className="relative w-full h-full overflow-hidden"
      >
        <Image
          fill
          src="https://images.unsplash.com/photo-1585728748176-455ac5eed962?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          alt="sosaintquentin-logo"
          className="about-paralax object-cover scale-150"
        />
      </div>
      <div
        style={{ gridArea: "1 / 3 / 2 / 6" }}
        className="w-full ml-auto px-10 bg-gray-100  space-y-5 flex flex-col justify-center py-32"
      >
        <h2 className=" text-6xl font-medium tracking-tighter">
          Salut! Moi c'est Sonia 👋
        </h2>
        <p className="text-xl font-thin font-Poppins w-3/5">
          Gande passionnée de mode ayant réalisé un de mes rêves les plus fous :
          ouvrir ma propre boutique, grâce à mon entourage et ma famille.{" "}
        </p>
      </div>
      <div
        style={{ gridArea: "2 / 3 / 5 / 6" }}
        className="relative w-full h-[1200px] overflow-hidden"
      >
        <Image
          fill
          src="https://images.unsplash.com/photo-1638443883232-18ab7f985541?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="sosaintquentin-logo"
          className="about-paralax object-cover scale-150"
        />
      </div>
      <div
        style={{ gridArea: "3 / 1 / 5 / 3" }}
        className="bg-gray-800 w-full h-full"
      >
        <div
          style={{ gridArea: "3 / 1 / 5 / 3" }}
          className="flex items-center gap-10  text-white w-11/12 mx-auto h-full"
        >
          <h2 className=" text-4xl font-medium tracking-tighter w-1/2">
            Nouvelle collection tous les mois pour votre plus grand plaisir.
          </h2>
          <p className="w-1/2 text-2xl font-thin font-Poppins">
            Chaque mois, je vous propose une nouvelle collection choisie avec
            amour et détails, je suis toujours à la recherche de LA pièce qui
            vous inspirera à combler votre dose nécessaire de shopping
            mensuelle, tout en primant sur la qualité de chacune d'entre elles !
          </p>
        </div>
      </div>
      <div
        style={{ gridArea: "5 / 1 / 8 / 3" }}
        className="w-full flex justify-center items-center bg-gray-800 text-white"
      >
        <div className="w-9/12 space-y-5">
          <h2 className=" text-4xl font-medium tracking-tighter">
            Ma famille SO' : une communauté bienveillante construite sur la
            transparence
          </h2>
          <p className="text-2xl font-thin font-Poppins">
            SO’ est pour moi une vraie famille, je n'ai jamais arrêté de vous
            partager au maximum mon quotidien au sein de ce travail acharné, qui
            dure depuis , via les réseaux et c'est la raison pour laquelle j'ai
            réussi à construire une communauté si bienveillante : la
            transparence!
          </p>
        </div>
      </div>
      <div
        style={{ gridArea: "5 / 3 / 8 / 5" }}
        className="relative w-full h-[725px] overflow-hidden translate-x-20 -translate-y-20"
      >
        <Image
          fill
          src="https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="sosaintquentin-logo"
          className="about-paralax object-cover scale-150"
        />
      </div>
    </section>
    </div>
  );
}

function SocialMedia() {
    return (
        <div>

        </div>
    )
}
