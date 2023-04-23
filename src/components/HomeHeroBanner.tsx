export default function HomeHeroBanner() {
  return (
    <section className=" relative h-screen w-full">
      {/* <div className=" absolute -z-10 top-0 left-0 h-full w-full" style={{
                backgroundSize: 'cover',
                backgroundImage: "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)"}} 
                /> */}
      <div className=" absolute top-0 left-0 h-full w-full  flex justify-center items-center">
        <Title />
      </div>
    </section>
  );
}

function Title() {
  return (
    <div className="w-[1044]">
      <div className=" flex flex-col gap-4 py-28 w-2/3">
        <span className="font-bold text-base uppercase">été 2023</span>
        <h1>Un cadeau spécial chez SO'</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim libero non erat eleifend vulputate. Cras ac tempus felis, nec tincidunt justo.</p>
        <button className="bg-blue-500 text-white">un bouton</button>
      </div>
    </div>
  );
}
