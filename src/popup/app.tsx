import { useColor } from '@/hooks/useColor';
import "./style.css";
import { useEffect, useState } from 'react';
import { Select, Typography, Switch, Spin, Button } from 'antd';
import Link from 'antd/es/typography/Link';
const { Option } = Select;
const { Title } = Typography;

export const App = () => {
  const { color } = useColor();
  const [transType, setTransType] = useState(localStorage.getItem("translate_type"));
  const [shouldTrans, setShouldTrans] = useState(localStorage.getItem("translate_type") !== null && localStorage.getItem("translate_type") !== "stop");
  const [shouldSpin, setShouldSpin] = useState(false);

  useEffect(() => {
    chrome.tabs.onActivated.addListener(function(activeInfo) {
      console.log(activeInfo.tabId);
  });
  }, [])

  const handleSelect = (type) => {
    setTransType(type);
    localStorage.setItem("translate_type", type)
    
  };

  const Confirm = () => {
    setShouldSpin(true);
    setTimeout(
      function () {
        setShouldSpin(false);
      }, 6000);

      
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const curId = tabs[0].id;

      if (curId) {

        chrome.tabs.executeScript(curId, { code: `localStorage.setItem("translate_type", "${transType}"); window.location.reload()` });
      }
    });
  }

  const Revert = () => {
    setTransType("stop");
    localStorage.setItem("translate_type", "stop")
    setShouldSpin(true);
    setTimeout(
      function () {
        setShouldSpin(false);
      }, 6000);

      
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const curId = tabs[0].id;

      if (curId) {

        chrome.tabs.executeScript(curId, { code: `localStorage.setItem("translate_type", "stop"); window.location.reload()` });
      }
    });
  }

  return (
    <Spin spinning={shouldSpin}>
      <div className="extension-body">
        {/* <img className='logo' src="https://i.ibb.co/wpGPgbJ/DALL-E-2023-01-14-23-36-10-an-impressionist-painting-of-a-hoodie-clad-teenager-shakespeare-sitting-o.png"></img> */}
        <img className="logo" src="https://i.ibb.co/89dtXdt/DALL-E-2023-01-15-02-22-07-add-a-transparent-background.png"></img>
        <div className='title'>Changuage</div>
        <br />
        <br />
        <Select value={transType} onSelect={handleSelect} size="large" style={{ width: 250 }} placeholder="Please select an option">
          <Option value="stop" >Please select an option</Option>
          <Option value="convert %ORIGINALTEXT% to shakespearean" >Shakespearean Language</Option>
          <Option value="'%ORIGINALTEXT%'. Translate it to gen z slang" >Gen Z Slang</Option>
          <Option value="translate %ORIGINALTEXT% with many emojis" >Emoji Spam</Option>
          <Option value="translate %ORIGINALTEXT% to legal contract speak" >Legal Contract Language</Option>
          <Option value="write %ORIGINALTEXT% in UwU speak" >UwU Speak</Option>
          <Option value="write %ORIGINALTEXT% in pirate speak" >Pirate Talk</Option>
          <Option value="translate %ORIGINALTEXT% into cowboy speak" >Cowboy Speak</Option>
          <Option value="translate %ORIGINALTEXT% into valley girl speak" >Valley Girl Speak</Option>
          <Option value="translate %ORIGINALTEXT% into a gangsta from da hood" >Gangsta from da hood</Option>
          <Option value="'%ORIGINALTEXT%'. make it sound extremely offensive to the user" >Make it offensive</Option>
          <Option value="%ORIGINALTEXT%. Make it extremely short." >TL;DR</Option>
          <Option value="%ORIGINALTEXT%. Make it sound like someone who is extremely confused about everything" >Make everything sound confused</Option>
        </Select>
        <br />
        <br/>
        <Button type="primary" onClick={Confirm}>Begin Translation</Button>
        <Link onClick={Revert}>Return to original</Link>
      
      </div>
    </Spin>

  );
};
