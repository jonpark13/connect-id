import { createContext } from "react";

export const ShuffleContext = createContext()

export function ShuffleProvider({children}) {
  const timeSince = (date) => {
    date = new Date(date);

    let seconds = Math.floor((new Date() - date) / 1000);
    let intervalType;
  
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
  
    if (interval > 1 || interval === 0) {
        if(interval <= 0 && intervalType == "second"){
            return "now"
        }
        else {
            intervalType += 's';
        }
    }
  
    return interval + ' ' + intervalType;
  }

    function shuffle(array) {
        let newArr = array.slice()
        let currentIndex = newArr.length, randomIndex;
    
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
    
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            // And swap it with the current element.
            [newArr[currentIndex], newArr[randomIndex]] = [
                newArr[randomIndex], newArr[currentIndex]];
        }
    
        return newArr;
      }
  
    return (
        <ShuffleContext.Provider value={{shuffle, timeSince}}>
          {children}
        </ShuffleContext.Provider>
    )
  }