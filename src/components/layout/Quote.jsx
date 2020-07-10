import React, { useState, useEffect } from 'react';
import { fetchQuote } from './fetchQuote';

export default function Quote({number, initialText = '', timeout = 9000}) {

  const [text, setText] = useState(initialText);

  useEffect(() => {
    let timerId
    async function fetcher () {
      const response = await fetchQuote('dummy' + number);
      if (response.status === "OK") {
        setText(response.quoteText);
      } else if (response.status === "ERR") {
        console.log(response.error);
        setText('ничего умного не придумалось');
      }
    }
    fetcher();
    timerId = setTimeout(() => {
      fetcher();      
    }, timeout);
    
    return () => {
      clearInterval(timerId)
    }
  }, []);

  return (
    <div className={'allblack text-light crazy crazy' + number}>
      {text}
    </div>
  )
}
