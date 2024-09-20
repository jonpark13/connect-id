import React, { useState, useEffect, useContext, useCallback, memo } from 'react';
import { useSelector } from 'react-redux'
import UserInfo from '../UserInfo';
import { useParams } from 'react-router-dom';
import { ShuffleContext } from '../../context/shuffle';

const SideList = ({ items }) => {
    const [shuffledItems, setShuffledItems] = useState(items);

    const session = useSelector((state) => state.session)
    const { shuffle, timeSince } = useContext( ShuffleContext)
    const { usertag }  = useParams();
//   const [shuffledItems, setShuffledItems] = useState(items);

  const shuffleItems = useCallback(() => {
    const shuffled = shuffle([...items]);
    setShuffledItems(shuffled)
    
  }, [items]);

  useEffect(() => {
    shuffleItems()
  }, [items]);

  return (
    <div className='sideContainer'>
        <div className='sideContainerTitle'>
            People also viewed
        </div>
        {!!items && shuffledItems.map(e => <div className='sideContainerItem'><UserInfo user={e} time={null}/></div>).slice(1,7)}
    </div>
  );
};

export default memo(SideList)