import Image from "next/image"
import Link from "next/link"

export default function Nav () {
    return (
        <nav className=" w-full absolute z-50 top-0 left-0 py-7">
            <div className=" w-full px-14 flex gap-10">
                <Logo />
                <Links />
            </div>
        </nav>
    )
}

function Logo () {
    return (
        <div >
            <Image src="/images/logo.png" alt="logo" width={100} height={100}/>
        </div>
    )
}

function Links () {
    return (
        <div className=" w-1/2 flex gap-4 font-bold text-base uppercase text-sm">
            <Link href="/">Accueil</Link>
            <Link href="/catalogue">catalogue</Link>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
    )
}

