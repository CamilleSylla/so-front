import Image from "next/image";

export default function FeaturedProduct() {
  return (
    <section className=" w-full h-screen flex justify-center items-center">
      <div className=" w-full flex h-3/4">
        <img
          className=" w-1/2 object-cover"
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          alt="logo"
        />
        <div className="w-1/2">

        </div>
      </div>
    </section>
  );
}
