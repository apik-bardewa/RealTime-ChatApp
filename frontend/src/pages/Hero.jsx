import React, { useState, useEffect } from 'react';

function Hero() {
  const fullText = "Welcome to Real Chat Application";
  const [displayedText, setDisplayedText] = useState("");
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    // Stop completely after 5 loops
    if (loopCount >= 2) return;

    let index = 0;
    setDisplayedText(""); // Reset text completely before typing starts

    const typingInterval = setInterval(() => {
      // Use index + 1 to ensure the current character is immediately captured
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        
        // Wait 1.5 seconds at the end of the sentence, then restart
        setTimeout(() => {
          setLoopCount((prevCount) => prevCount + 1);
        }, 1500); 
      }
    }, 90); // Slightly adjusted speed for ultra-smooth rendering

    return () => clearInterval(typingInterval);
  }, [loopCount]); 

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] mt-20 md:mt-32 px-4 text-center select-none">
      {/* Container with a fixed minimum height prevents layout shifting */}
      <div className="flex items-center justify-center w-full min-h-[4rem]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
          <span>{displayedText}</span>
          {/* Active Blinking Cursor */}
          <span className="inline-block w-[3px] h-[2rem] sm:h-[2.6rem] md:h-[3.2rem] ml-1 bg-indigo-500 animate-pulse">
            |
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Hero