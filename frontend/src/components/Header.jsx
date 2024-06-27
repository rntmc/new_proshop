import {useNavigate} from 'react-router-dom'
import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../slices/usersApiSlice'
import {logout} from '../slices/authSlice'
import SearchBox from './SearchBox'
import logo from '../assets/logo.png'
import {resetCart} from '../slices/cartSlice'

const Header = () => {
  const {cartItems} = useSelector((state) => state.cart) //state.cart is coming from cartSliceReducer
  const {userInfo} = useSelector((state) => state.auth) //state.cart is coming from cartSliceReducer

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart())
      navigate('/login');
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>  {/* colapsar par criar um menu hamburguer. Se quiser maior pode usar "lg" */}
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand >
              <img src={logo} alt="proshop"/>
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link><FaShoppingCart /> 
                  Cart 
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{marginLeft: '5px'}}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)} {/*accumulator, current. 0 is the default for the accumulator*/}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              { userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href='/login'><FaUser /> Sign In</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin &&(
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown> 
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header