import { createContext } from "react";

export const ShuffleContext = createContext()

export function ShuffleProvider({children}) {

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
        <ShuffleContext.Provider value={{shuffle}}>
          {children}
        </ShuffleContext.Provider>
    )
  }