import React, {useState, useEffect} from 'react';
import {
    useParams,
    Redirect,
    NavLink,
    Link,
    useHistory,
    useLocation
} from 'react-router-dom';
import './Gallery.css'

function Gallery({list, prevList}) {
    const history = useHistory()
    const [index, setIndex] = useState(0)

    // const rescrollTop = () => {
    //     let hit = document.getElementsByClassName('one')
    //     return hit[0].scrollTop = 0
    // }


    const updateIndex = (newIndex) => {
        // console.log(newIndex)
        if(newIndex <= 0) {
            newIndex = 0
        }
        else if (newIndex >= (list.length + prevList.length)) {
            newIndex = ((list.length + prevList.length) - 1)
        }
        // console.log(newIndex)
        setIndex(newIndex)
    }

    return (

        <div className='userOtherWorks'>
            <div className='userOtherWorksCarousel'>
                <div className='userOtherWorksCarouselInner' style={{"transform": `translateX(-${index * 100}%)`}}>
                    <div className='userOtherWorksCarouselList' >
                        {list.map((each) => (
                            // <Link style={{"borderRadius": "4px"}} to={`/gallery/${each.id}`}>
                            //     <img className='userOtherWorksImg' src={each.images[0]} onClick={history.replace({pathname: `/gallery/${each.id}`})}/>
                            // </Link>
                                <img className='userOtherWorksImg' src={URL.createObjectURL(each)}/>

                        ))}
                        {
                            prevList.map((each) => (
                                <img className='userOtherWorksImg' src={each}/>
                            ))
                        }
                    </div>
                </div>
            </div>
                <i class="moveCarouselLeft fa-solid fa-circle-arrow-left" onClick={() => { updateIndex( index - 1 )}}/>   
                <i class="moveCarouselRight fa-solid fa-circle-arrow-right" onClick={() => { updateIndex( index + 1 )}}/>
        </div>

    );
}
export default Gallery;
