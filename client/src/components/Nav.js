import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader,
  SidebarContent,
  SidebarFooter,} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { BsCollectionPlay, BsFilm, BsHouseDoorFill } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';


export const Nav = () => {
  const {pathname} = useLocation()

  const styles = {
    activeLink : {
      backgroundColor: "#2d3c45",
      color: '#17a2b8',
      borderRight: 'solid 6px rgb(23, 162, 184)',
    },
    sideBar: {
      padding: '24px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '18px',
      letterSpacing: '1px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  }

  return (
    <>
    <ProSidebar  
      breakPoint="md"
      style={{backgroundColor: '#18243e', backgroundColor: 'transparent', fontFamily: 'Roboto Condensed'}}  
    >
      <SidebarHeader>
        <div
          style={styles.sideBar}
        >
          <b>movie</b> <span style={{color: 'red'}}>buzz</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<BsHouseDoorFill style={{backgroundColor: 'transparent'}}/>} style={pathname =='/' ? styles.activeLink : null}>
             <NavLink className="text-white" to='/'  style={{backgroundColor: 'transparent'}}>
               Home
              </NavLink>
          </MenuItem>
          <MenuItem icon={<BsFilm/>} style={pathname =='/movies' ? styles.activeLink : null}>
            <NavLink className="text-white" to='/movies' style={{backgroundColor: 'transparent'}}>
              Movie
            </NavLink>
          </MenuItem>
          <MenuItem icon={<BsCollectionPlay/>} style={pathname =='/TVSeries' ? styles.activeLink : null}>
            <NavLink className="text-white" to='/TVSeries' style={{backgroundColor: 'transparent'}}>
              TVSeries
            </NavLink>
          </MenuItem>
          <MenuItem icon={<BsCollectionPlay/>} style={pathname =='/favorites' ? styles.activeLink : null}>
            <NavLink className="text-white" to='/favorites' style={{backgroundColor: 'transparent'}}>
              Favorites
            </NavLink>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
      <div
          className="sidebar-btn-wrapper text-center"
          style={{
            padding:'20px 10px',
          }}
        >
          <a
            href="https://github.com/bimanathanael/entertainme"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-white"/>
            <span  className="text-white"> View Source </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
    </>
  )
}
