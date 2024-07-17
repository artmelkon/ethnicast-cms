import React, { createContext, useState } from "react";

const MediaContext = createContext();

const MediaProvider = ({ children }: any) => {
  const [currentMedia, setCurrentMedia] = useState();

  function playMedia(media) {
    console.log("media ", media);
    setCurrentMedia(media);
  }

  return (
    <MediaContext.Provider value={{ currentMedia, playMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
