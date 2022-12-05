import React, {useState} from 'react';
import './Gallery.css'

function Gallery({list, prevList, height, width}) {
    const [index, setIndex] = useState(0)

    if(prevList[0] === '' && prevList.length == 1) prevList = []

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

        <div className='userOtherWorks' style={{height: `${height}`}}>
            <div style={{width:`${width}`}} className='userOtherWorksCarousel'>
                <div className='userOtherWorksCarouselInner' style={{"transform": `translateX(-${index * 100}%)`}}>
                    <div className='userOtherWorksCarouselList' >
                        {list.map((each) => (
                                <img style={{width:`${width}`}} className='userOtherWorksImg' src={URL.createObjectURL(each)} onError={(e) => {e.target.src = "https://connectidbucket.s3.amazonaws.com/imgError.png"}}/>
                        ))}
                        {
                            prevList.map((each) => (
                                <img style={{width:`${width}`}} className='userOtherWorksImg' src={each} onError={e => e.target.src = "https://connectidbucket.s3.amazonaws.com/No_image_available.png"}/>
                            ))
                        }
                    </div>
                </div>
                {(list.length + prevList.length) > 1 && <><div className="moveCarouselLeft" >
                    <i className="fa-solid fa-circle-arrow-left" onClick={() => { updateIndex( index - 1 )}}/>   
                </div>
                <div className="moveCarouselRight" >
                    <i className="fa-solid fa-circle-arrow-right" onClick={() => { updateIndex( index + 1 )}}/>
                </div></>}
            </div>
        </div>

    );
}
export default Gallery;
