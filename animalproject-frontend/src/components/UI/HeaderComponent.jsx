import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div style={{ width: '100%', margin: 0, padding: 0, position: 'relative' }}>
      <header style={{ width: '100%', margin: 0, padding: 0, position: 'fixed', top: 0, left: 0, zIndex: 100 }}>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark' style={{ margin: 0, padding: '0 20px', width: '100%' }}>
          <a className="navbar-brand" href="groups" style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFD700' }}>Anmlpedia</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
              {/* Group Link */}
              <li className="nav-item">
                <NavLink 
                  className='nav-link' 
                  to='groups' 
                  style={({ isActive }) => ({
                    padding: '12px 20px',
                    color: isActive ? '#FFD700' : 'white', 
                    fontWeight: 'bold', 
                    fontSize: '16px', 
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase'
                  })}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#444'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Groups
                </NavLink>
              </li>

              {/* Species Link */}
              <li className="nav-item">
                <NavLink 
                  className='nav-link' 
                  to='species' 
                  style={({ isActive }) => ({
                    padding: '12px 20px',
                    color: isActive ? '#FFD700' : 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase'
                  })}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#444'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Species
                </NavLink>
              </li>

              {/* Animals Link */}
              <li className="nav-item">
                <NavLink 
                  className='nav-link' 
                  to='/animals' 
                  style={({ isActive }) => ({
                    padding: '12px 20px',
                    color: isActive ? '#FFD700' : 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase'
                  })}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#444'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Animals
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default HeaderComponent