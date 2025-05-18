import { FaRegCopy } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import GridBackground from "./components/GridBackground";
import useWindow from "./hooks/useWindow";
import { useState } from "react";

function App() {

  const {width,height} = useWindow()

  const [Data, setData] = useState({
    fullUrl:'',
    shortUrl:'',
    shortFull:''
  })

    return (
      <main className="dark px-4 bg-gradient-bg text-white gap-8 md:gap-10 flex flex-col justify-center items-center w-screen h-screen overflow-hidden">
        <GridBackground />
        <div className="headings z-20 relative w-full flex flex-col justify-between items-center">
          <h1 className="text-[3rem] sm:text-[5rem] lg:text-[7.5rem] leading-none">Good Afternoon</h1>
          <h1 className="text-[2.75rem] sm:text-[5rem] lg:text-[7.2rem] leading-none">Shorten your link</h1>
        </div>
        <div className="Url-Input z-20 relative sm:gap-none gap-4 flex flex-col sm:flex-row w-[95%] lg:w-[70%] h-32 sm:h-16 rounded-md">
          <div className="input rounded-md w-full sm:w-[80%] h-1/2 sm:h-full flex bg-white/90 text-dark3">
            <input
              type="text"
              className="w-full h-full border-none outline-none p-2"
              placeholder="Enter a long URL"
            />
          </div>
          <div className="button rounded-md w-full sm:w-[20%] h-1/2 sm:h-full bg-dark3">
            <button className="w-full h-full border-none outline-none text-2xl text-semibold">
              Shorten
            </button>
          </div>
        </div>

        <div className="boxes z-20 relative text-white/70 flex justify-between items-center w-[95%] sm:w-[70%] h-[auto]">
          <div className="box relative w-[32%] rounded-md aspect-square sm:max-h-[150px] sm:aspect-none bg-dark3">
            <div className="icon h-[90%] w-full flex justify-center items-center">
              <FaRegCopy size={width > 800 ? 64 : 34} />
            </div>
            <p className="text-sm md:text-2xl absolute bottom-2 left-1/2 -translate-x-1/2">
              Copy
            </p>
          </div>
          <div className="box relative w-[32%] rounded-md aspect-square sm:max-h-[150px] bg-dark3">
            <div className="icon h-[90%] w-full flex justify-center items-center">
              <FaArrowTrendUp size={width > 800 ? 64 : 34} />
            </div>
            <p className="text-sm md:text-2xl absolute bottom-2 left-1/2 -translate-x-1/2">
              Track
            </p>
          </div>
          <div className="box relative w-[32%] rounded-md aspect-square sm:max-h-[150px] bg-dark3">
            <div className="icon h-[90%] w-full flex justify-center items-center">
              <MdOutlineWatchLater size={width > 800 ? 64 : 34} />
            </div>
            <p className="text-sm md:text-2xl absolute bottom-2 left-1/2 -translate-x-1/2">
              Expiry
            </p>
          </div>
        </div>
      </main>
    );
}

export default App;
