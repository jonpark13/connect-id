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

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div  className="navBarLinks" style={{margin:"10px 5px", width:"60px"}} onClick={openMenu}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:'black', textDecoration:'none'}}>

            <i className="fa-regular fa-circle-user" /><div>Me</div>
        </div>

      {showMenu && (
        <div>
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
