import GridBackground from "./../components/GridBackground";
import UrlForm from "./../components/UrlForm";
import { useState } from "react";

function Home() {
  
  const [Data, setData] = useState({
    fullUrl:'',
    shortUrl:'',
    shortFull:''
  })


    return (
       <main className="dark px-4 pt-20 bg-gradient-bg text-white flex flex-col justify-start items-center min-h-screen">
        <GridBackground />
        <div className="headings z-20 relative w-full flex flex-col justify-between items-center">
          <h1 className="text-[2.75rem] sm:text-[5rem] lg:text-[4.6rem] leading-[3rem] sm:leading-[5.5rem] lg:leading-[5rem]">Shorten your link</h1>
        </div>
        <UrlForm Data={Data} setData={setData} />
      </main>
    );
}

export default Home;
