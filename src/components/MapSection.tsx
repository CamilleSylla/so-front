import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { LegacyRef, RefObject, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";

export default function MapSection() {
  const container = useRef<HTMLDivElement>(null);
  const upDoor = useRef<HTMLDivElement>(null);
  const downDoor = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //     const tl = gsap.timeline();
  //     tl.to(upDoor.current,
  //         { y: "-100%" }
  //     )
  //     tl.to(downDoor.current,
  //         { y: "100%" }, "<"
  //     )
  //     ScrollTrigger.create({
  //         animation: tl,
  //         trigger: container.current,
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: 0.5,
  //         markers: true,
  //         pin: true
  //     })
  // }, [])

  return (
    <div ref={container} className="w-full h-screen mt-40">
      <div
        ref={upDoor}
        className="text-center h-1/2 w-full overflow-hidden flex items-end justify-center bg-red-500"
      >
        <span className=" text-9xl uppercase font-extrabold block translate-y-1/2">
          Nous Rencontrer
        </span>
      </div>
      <div
        ref={downDoor}
        className="text-center h-1/2 w-full overflow-hidden bg-black"
      >
        <span className=" text-9xl uppercase font-extrabold block text-red-500 -translate-y-1/2">
          Nous Rencontrer
        </span>
      </div>
      <MapView />
    </div>
  );
}

function MapView() {
  return (
    <div className="w-full h-screen">
      <Map
        initialViewState={{
          longitude: 3.291936598323619,
          latitude: 49.84437433413515,
          zoom: 17,
          bearing: 20,
          pitch: 80,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/iconicdev/clhnt0zaa01pb01pr1pvtbgfb"
        mapboxAccessToken="pk.eyJ1IjoiaWNvbmljZGV2IiwiYSI6ImNsaG5zazd4cDFwZWczanAxMnAzcjM2YTUifQ.eEXaZouONpPbMnHDv3MfDQ"
      >
         <Marker
        longitude={3.291936598323619}
        latitude={49.84437433413515}
      >
      </Marker>
      </Map>
    </div>
  );
}
