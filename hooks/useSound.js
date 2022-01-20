import React, {useState, useEffect} from 'react';
import useSoundReact from 'use-sound';

const useSound = (soundPath) => {
  const [sound, setSound] = useState([() => {}]);
  const [play] = useSoundReact(soundPath, { volume: 0.25 });
  useEffect(() => {
    const isDisabled = JSON.parse(localStorage.getItem("disableSound"));
    if (!isDisabled) {
      setSound([play]);
    }
  }, [play]);

  return sound;
};

export default useSound;
