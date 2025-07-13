import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white 2xl:min-h-[40vh] md:min-h-[60vh] min-h-[45vh] px-6 md:px-0">
        <div className="font-bold flex gap-2 text-4xl 2xl:text-7xl justify-center items-center ">Buy Me a Chai<span><img className="invertImg" src="/tea.gif" width={66} alt="" /></span> </div>
        <p className="2xl:text-2xl">
          A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>
        <div className="mt-1 md:mt-0">
          <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus: ring-blue-300☐ dark:focus: ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>
          <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto md:pb-32 md:pt-14 pt-8 pb-10 px-12 md:px-0 ">
        <h2 className="md:text-3xl text-2xl font-bold text-center md:mb-14 mb-8">Your Fans can buy you a Chai</h2>
        <div className="flex flex-col md:flex-row gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center"> Your fans are available to help you </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center"> Your fans are available for you to help you </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center"> Your fans are available for you to help you </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto flex flex-col items-center justify-center md:pb-32 md:pt-14 pt-8 pb-14 px-12 md:px-0">
        <h2 className="md:text-3xl text-2xl font-bold text-center md:mb-14 mb-4">Learn more about us</h2>
        
        <iframe className=" md:block md:w-[560px] md:h-[315px] mt-2 md:mt-0"  src="https://www.youtube.com/embed/QtaorVNAwbI?si=5pgbmwtGzOlwQXtt" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        
      </div>
    </>
  );
}
