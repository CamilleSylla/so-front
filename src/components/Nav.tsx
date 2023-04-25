import Image from "next/image";
import Link from "next/link";
import Icons from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import { Popover } from "@headlessui/react";

export default function Nav() {
  return (
      <nav className="py-5 px-20 flex-1 mx-auto flex items-center gap-10">
        <Logo />
        <Links />
        <Action />
      </nav>
  );
}

function Action() {
  const [cookies] = useCookies(["favProducts"]);

  return (
    <div className="">
      <Popover className="relative ">
        <Popover.Button>
          <div className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-slate-300 duration-300 bg-slate-100 bottom-2 right-2">
            <Icons.HeartIcon
              className={`${
                cookies.fav_products.length ? " fill-red-800 stroke-red-800" : ""
              } w-3/5 h-3/5 duration-300`}
            />
          </div>
        </Popover.Button>
        <Popover.Panel className="absolute">
          <p>A</p>
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function Logo() {
  return (
    <div className="relative h-10">
      <Image className=" object-cover" src="/images/logo.png" alt="logo" fill />
    </div>
  );
}

function Links() {
  return (
    <div className=" flex flex-grow  gap-4 font-medium uppercase text-sm">
      <Link href="/">Accueil</Link>
      <Link href="/catalogue">catalogue</Link>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  );
}
