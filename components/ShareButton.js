import { useState } from 'react'

const ShareBtn = (props) => {
  const [copyMsg, setCopyMsg] = useState('Share')

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMsg('Copied!');
      setTimeout(() => setCopyMsg('Share'), 1000);
    })
    .catch((error) => {
      console.error(error);
    })
  }
  return <button className="share btn" onClick={() => copy(props.url)}>{copyMsg}</button>
}

export default ShareBtn
