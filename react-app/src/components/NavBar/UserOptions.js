import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import './NavBar.css'

function UserOptions({ user }) {

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if(e.target.className=="userOptionsContainer"){
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
    <div  className="navBarLinks" style={{height:"35px"}} onClick={openMenu}>


            <i className="fa-regular fa-circle-user"/><div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: "5px",fontSize:"12px"}}>Me <i className="meArrow fa-solid fa-angles-down" style={{marginLeft:"5px",fontSize:"10px"}}/></div>


      {showMenu && (
        <div className="userOptionsContainer">
          <div>{user.first_name} {user.last_name}
          </div>
          <div>
          <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOptions;
