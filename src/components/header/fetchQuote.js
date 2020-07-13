import fetchJsonp from 'fetch-jsonp';
// Takes nothing or lang "ru" or "en". Returns status and strings of quotes or error msg

export const fetchQuote = async (callback = 'pepe', lang = "ru") => {

  const settings = {
    jsonpCallbackFunction: callback,
    timeout: 7000
    }
  const url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=" + lang 
  + "&jsonp=" + callback;

  /** Response example
   * {"quoteText":"Большая сила у того человека, который умеет промолчать, хотя он прав.", 
   * "quoteAuthor":"Марк Катон", 
   * "senderName":"", 
   * "senderLink":"", 
   * "quoteLink":"http://forismatic.com/ru/01eb2d4334/"}
   */
  try {
    const response = await fetchJsonp(url, settings);
    console.log(response)
    const { quoteText, quoteAuthor } = await response.json();
    return { quoteText, quoteAuthor, status: "OK" }
  } catch (error) {
    return { error, status: "ERR" }
  }
}

