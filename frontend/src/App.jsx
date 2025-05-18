import GridBackground from "./components/GridBackground";
import UrlForm from "./components/UrlForm";
import useWindow from "./hooks/useWindow";
import { useEffect, useState } from "react";

function App() {

  const {width,height} = useWindow()

  const [Data, setData] = useState({
    fullUrl:'',
    shortUrl:'',
    shortFull:''
  })
  

    return (
      <main className="dark px-4 bg-gradient-bg text-white flex flex-col justify-start items-center">
        <GridBackground />
        <div className="headings z-20 relative w-full flex flex-col justify-between items-center">
          <h1 className="text-[3rem] sm:text-[5rem] lg:text-[4.5rem] leading-[3rem] sm:leading-[5.5rem] lg:leading-[5rem]">Good Afternoon</h1>
          <h1 className="text-[2.75rem] sm:text-[5rem] lg:text-[4.6rem] leading-[3rem] sm:leading-[5.5rem] lg:leading-[5rem]">Shorten your link</h1>
        </div>
        <UrlForm Data={Data} setData={setData} />
      </main>
    );
}

export default App;
