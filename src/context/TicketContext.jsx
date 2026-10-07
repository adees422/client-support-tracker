import { createContext, useContext, useEffect, useState } from "react";
import mockTickets from "../data/mockTickets";

const TicketContext = createContext();

export function TicketProvider({ children }) {

  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem("tickets");

    if (savedTickets) {
      return JSON.parse(savedTickets);
    }
//local storage can only store strings it can not store objects or arrays so we have to convert it into string using JSON.stringify() and when we want to retrieve it we have to parse it back into object or array using JSON.parse().
 
//क्योंकि LocalStorage का डिज़ाइन ही Key-Value String Store की तरह बनाया गया है। जब वेब ब्राउज़र्स के लिए HTML5 का यह फ़ीचर डिज़ाइन किया गया, तो डेवलपर्स ने इसे जानबूझकर बहुत हल्का, तेज़ और सुरक्षित रखने के लिए केवल UTF-16 String सपोर्ट तक सीमित रखा।
//अगर LocalStorage सीधे JavaScript Objects स्टोर करता, तो ब्राउज़र को मेमोरी में ऑब्जेक्ट्स के रेफरेंस (References), फंक्शन्स, प्रोटोटाइप्स (prototype chain) और सर्कुलर डिपेंडेंसीज़ को मैनेज करना पड़ता।

return mockTickets;
  });

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}