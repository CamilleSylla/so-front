import Image from "next/image";

export default function PageSlogan({ value }: { value: string }) {
  return (
    <section className="relative w-full py-32 space-y-1">
      <figure className="mx-auto w-2/4 relative text-center">
        <blockquote className=" font-Handwright text-8xl">
          <p className="">
            <span className="absolute -left-8 top-0">"</span>
            {value}
            <span className="absolute -right-8 top-0">"</span>
          </p>
        </blockquote>
      </figure>
      <div className=" w-48 h-48 mx-auto relative">
        <Image
          fill
          src="/static/assets/img/logo.png"
          alt="sosaintquentin-logo"
          className="object-contain"
        />
      </div>
    </section>
  );
}
