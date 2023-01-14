import { useColor } from '@/hooks/useColor';
import { composeIssuePredicates } from 'fork-ts-checker-webpack-plugin/lib/issue/IssuePredicate';
import "./style.css";
import { useState } from 'react';
import {  Select } from 'antd';
const {Option} = Select;




const extensionVersion = chrome.runtime.getManifest().manifest_version;

export const App = () => {
  const { color } = useColor();
  const [transType, setTransType] = useState(localStorage.getItem("translate_type"));

  const handleSelect = (type) => {
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
    <div className="extension-body">
      Status: {transType}

      <Select onSelect={handleSelect} size="large" style={{width: 200}} placeholder="Please select an option">
      <Option type="primary" value="convert %ORIGINALTEXT% to shakespearean" >Shakespearean Speak</Option>
      <Option value="'%ORIGINALTEXT%'. Translate it to gen z slang" >Gen-Z Speak</Option>
      <Option value="translate %ORIGINALTEXT% with many emojis" >Emoji Speak</Option>
      <Option value="translate %ORIGINALTEXT% to legal contract speak" >Legal Contract Speak</Option>
      <Option value="write %ORIGINALTEXT% in UwU speak" >UwU Speak</Option>
      <Option value="write %ORIGINALTEXT% in pirate speak" >Pirate Speak</Option>
      <Option value="translate %ORIGINALTEXT% into cowboy speak" >Cowboy Speak</Option>
      <Option value="translate %ORIGINALTEXT% into valley girl speak" >Valley girl Speak</Option>
      <Option value="translate %ORIGINALTEXT% into a gangsta from da hood" >Valley girl Speak</Option>
      <Option value="'%ORIGINALTEXT%'. make it sound extremely offensive to the user" >Offensive Speak</Option>
      <Option value="%ORIGINALTEXT%. Make it extremely short." >Compact Speak</Option>
      <Option value="%ORIGINALTEXT%. Make it sound like someone who is extremely confused about everything" >Confused Speak</Option>
      <Option value="stop" >STOP</Option>
</Select>

    </div>
  );
};
