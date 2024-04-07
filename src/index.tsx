import { useEffect, useState } from "react";
import { Icon, Image, MenuBarExtra, open } from "@raycast/api";
import { getFavicon } from "@raycast/utils";

import { runAppleScript } from "@raycast/utils";

import { getDataJxa } from "./utils/getData";

type Bookmark = { name: string; url: string };

const useBookmarks = () => {
  const [state, setState] = useState<{ unseen: Bookmark[]; seen: Bookmark[]; isLoading: boolean }>({
    unseen: [],
    seen: [],
    isLoading: true,
  });
  useEffect(() => {
    (async () => {
      setState({
        unseen: [{ name: "Raycast Teams", url: "https://raycast.com/teams" }],
        seen: [
          { name: "Raycast Store", url: "https://raycast.com/store" },
          { name: "Twitter", url: "https://twitter.com" },
        ],
        isLoading: false,
      });
    })();
  }, []);
  return state;
};








function DeezerMenuBar() {
  const [currentPlayingData, setCurrentPlayingData] = useState({}) 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching data')
      try {
        const data = await runAppleScript(getDataJxa, [], {
          language: 'JavaScript'
        })
  
        console.log(JSON.parse(JSON.parse(data)), 'got data from applescript')
  
        setCurrentPlayingData(JSON.parse(JSON.parse(data)))
        setIsLoading(false)

      } catch (error) {
        console.log('error', error)
      }
      
    }
    
    // const interval = setInterval(() => {
      fetchData();
    // }, 1000)

    // return () => {
      // clearInterval(interval);
    // };
  }, []); 


  console.log('render')
  console.log('currentPlayingData', currentPlayingData.trackName)

  const icon = currentPlayingData.cover ? {
    source: currentPlayingData.cover,
    mask: Image.Mask.RoundedRectangle,
  } : Icon.Bookmark





  const { unseen: unseenBookmarks, seen: seenBookmarks } = useBookmarks();



  return (
    <MenuBarExtra icon={icon} isLoading={isLoading}
    title={!isLoading && `${currentPlayingData.trackName} — ${currentPlayingData.artistsNames}`.slice(0, 20)}>
      <MenuBarExtra.Item title={currentPlayingData.trackName || 'default'} />
      {unseenBookmarks.map((bookmark) => (
        <MenuBarExtra.Item
          key={bookmark.url}
          icon={getFavicon(bookmark.url)}
          title={bookmark.name}
          onAction={() => open(bookmark.url)}
        />
      ))}
      <MenuBarExtra.Separator />
      <MenuBarExtra.Item title="Seen" />
      {seenBookmarks.map((bookmark) => (
        <MenuBarExtra.Item
          key={bookmark.url}
          icon={getFavicon(bookmark.url)}
          title={bookmark.name}
          onAction={() => open(bookmark.url)}
        />
      ))}
    </MenuBarExtra>
  );
}

export default function Command(props: LaunchProps) {
  return (
    <>
      <DeezerMenuBar {...props} />
    </>
  );
}
