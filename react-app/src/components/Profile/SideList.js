import React, { useState, useEffect, useContext, memo } from 'react';
import { useSelector } from 'react-redux'
import UserInfo from '../UserInfo';
import { useParams } from 'react-router-dom';
import { ShuffleContext } from '../../context/shuffle';

const areEqual = (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps);

const SideList = ({ items }) => {
    const [shuffledItems, setShuffledItems] = useState(items);

    const session = useSelector((state) => state.session)
    const { shuffle, timeSince } = useContext( ShuffleContext)
    const { usertag }  = useParams();
//   const [shuffledItems, setShuffledItems] = useState(items);
    console.log('reeeeeeeeeeeee')
    console.log(items)

  const shuffleItems = () => {
    const shuffled = shuffle([...items]);
    setShuffledItems(shuffled)
  };

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

export default SideList