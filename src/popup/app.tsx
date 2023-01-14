import { useColor } from '@/hooks/useColor';
import { composeIssuePredicates } from 'fork-ts-checker-webpack-plugin/lib/issue/IssuePredicate';
import { useState } from 'react';
import { Button } from 'antd';




const extensionVersion = chrome.runtime.getManifest().manifest_version;

export const App = () => {
  const { color } = useColor();
  const [transType, setTransType] = useState(localStorage.getItem("translate_type"));

  const handleClick = (e) => {
    var type = e.target.value;
    setTransType(type);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const curId = tabs[0].id;
      if (curId) {
        
    chrome.tabs.executeScript(curId, { code: `localStorage.setItem("translate_type", "${type}"); window.location.reload()` });
      }
    });
  };

  if (!color) {
    return <div>Init color not found</div>;
  }

  return (
    <div>
      Status: {transType}
      <Button type="primary" value="convert %ORIGINALTEXT% to shakespearean" onClick={handleClick}>Shakespearean Speak</Button>
      <Button value="'%ORIGINALTEXT%'. Translate it to gen z slang" onClick={handleClick}>Gen-Z Speak</Button>
      <Button value="translate %ORIGINALTEXT% with many emojis" onClick={handleClick}>Emoji Speak</Button>
      <Button value="translate %ORIGINALTEXT% to legal contract speak" onClick={handleClick}>Legal Contract Speak</Button>
      <Button value="write %ORIGINALTEXT% in UwU speak" onClick={handleClick}>UwU Speak</Button>
      <Button value="write %ORIGINALTEXT% in pirate speak" onClick={handleClick}>Pirate Speak</Button>
      <Button value="translate %ORIGINALTEXT% into cowboy speak" onClick={handleClick}>Cowboy Speak</Button>
      <Button value="translate %ORIGINALTEXT% into valley girl speak" onClick={handleClick}>Valley girl Speak</Button>
      <Button value="translate %ORIGINALTEXT% into a gangsta from da hood" onClick={handleClick}>Valley girl Speak</Button>
      <Button value="'%ORIGINALTEXT%'. make it sound extremely offensive to the user" onClick={handleClick}>Offensive Speak</Button>
      <Button value="%ORIGINALTEXT%. Make it extremely short." onClick={handleClick}>Compact Speak</Button>
      <Button value="%ORIGINALTEXT%. Make it sound like someone who is extremely confused about everything" onClick={handleClick}>Confused Speak</Button>
      <Button value="stop" onClick={handleClick}>STOP</Button>
    </div>
  );
};
