import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css'

function SearchBar() {
    const history = useHistory()
    const [search, setSearch] = useState('')
    const [searchRes, setSearchRes] = useState({users:[]})
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const handleSearchMenu = async (query) => {
    if(query)
        {const response = await fetch(`/api/users/search?val=${query}`);
        const responseData = await response.json();
        setSearchRes(responseData)}
    else{
        setSearchRes({users:[]})
    }
  }

  const profilePage = (e, user) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/id/${user}`)
    setShowMenu(false)
}

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if(e.target.className=="searchDropdownContainer"){
            e.stopPropagation();
            e.preventDefault();
        }
        else {

            setShowMenu(false);
        }
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <label className="searchBar" style={{height:"35px"}} onClick={openMenu} onBeforeInput={openMenu}>

<i className="fa-solid fa-magnifying-glass" for='searchInput' />
    <input id="searchInput" value={search} onChange={e => {setSearch(e.target.value); handleSearchMenu(e.target.value)}}/>



      {showMenu && (
        <div className="searchDropdownContainer">
            {searchRes.users.length < 8 ?
            <>
            <div className='searchFiller'>
            <div className='searchDesc' style={{display:"flex",alignItems:"center",height:"48px"}}>
                Try searching for
            </div>

            </div>
            <div className='userSearchContainer' onClick={() => setSearch('demo')}>
                    <i className="fa-solid fa-magnifying-glass" />
                    <div className='searchName' style={{height:"48px"}}>
                        demo
                    </div>
            </div>
            </>
            :
            null
            }
            {
                
            }
            {searchRes.users.map(user => (
                 <div className='userSearchContainer' onClick={(e) => {profilePage(e, user.id)}}>
                    <i className="fa-solid fa-magnifying-glass" />
                    <div className='searchName'>
                        {user.first_name.toLowerCase()} {user.last_name.toLowerCase()}
                    </div>
                    •
                    <div className='searchDesc'>
                        {user.description}
                    </div>
                
                    {
                    user.profile_image ? 
                    <div className='userModIcon'>
                        <img className='userModProfileImage' src={user.profile_image} onError={e => e.target.src = "https://connectidbucket.s3.amazonaws.com/No_image_available.png"}/>
                    </div>
                    :
                    <div className='userModIcon'>
                        <div className='userIcon'><i className="fa-regular fa-circle-user" /></div>
                    </div>
                 }
                </div>
            )).slice(0,8)}

        </div>
      )}
    </label>
  );
}

export default SearchBar;
