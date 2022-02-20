import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { useLocation } from 'react-router-dom'
import '../styles/Navbar.scss'
import { Nav, Navbar as Navb, Form, Button} from 'react-bootstrap'
import axios from 'axios'

//returns locations from local storage, empty array if local storage has no item 'locations'
const getLocationsFromStorage = () => {
  const storedLocations = localStorage.getItem('locations')
  //stored locations empty
  if(!storedLocations) 
    return []
  return JSON.parse(storedLocations)
}

const Navbar = ({ passLocations }) => {
  //red text error message
  const [errorMessage, setErrorMessage] = useState('')
  //input textbox text
  const [text, setText] = useState('')
  //locations object list, gets default from local storage
  const [locations, setLocations] = useState(getLocationsFromStorage)
  
  //useLocation hook for checking current url
  const loc = useLocation()

  //gets locations list that match search text from api
  const handleSearch = () => {
    //get request to obtain locations list
    axios.get('http://localhost:5000/searchLocations/?searchValue=' + text)
    .then(res => {
        //truncating result array to length 5 if its >5
        if(res.data.locations.length > 5){
            res.data.locations.length = 5;
        }
        setLocations(res.data.locations)
    }).catch(err => {
        console.log(err)
    })
    
    //data to post
    var userAction = {
      userActionType: 'search',
      searchKeyword: text
    }
    //posts userAction to mongodb
    axios.post('http://localhost:5000/postUserAction', userAction)
  }

  const handleOnChange = (text) => {
    //regex allows only letters and space
    var RegExpression = /^[a-zA-Z\s]*$/;
    //validates input textbox text
    if (RegExpression.test(text)) {
      //clears text in div below input textbox
      setErrorMessage('')

      setText(text)
    } 
    else {
      //changes text in div below input textbox
      setErrorMessage('Only letters are allowed')
    }
  }

  //input textbox enter key pressed
  const handleEnterKey = ((event) => {
    //enter key code = 13
    if (event.charCode === 13) {
      //dont submit form
      event.preventDefault()
      //search for locations
      handleSearch()
    }
  })

  //locations variable changed
  useEffect(() => {
      //save locations in local storage
      localStorage.setItem('locations', JSON.stringify(locations))
      //pass locations to app.js
      passLocations(locations)
  }, [locations])

  return (
    <>
      <Navb bg="light" variant="light" sticky="top" expand="md" collapseOnSelect className='navbar'>
        <Navb.Brand>
          <a href='https://www.foreca.com/'><img src={logo}  className='logo'/></a>
        </Navb.Brand>

        <Navb.Toggle className="coloring" />
        <Navb.Collapse>
          <Nav className='me-auto'>
            <Nav.Link href="/">Home {loc.pathname === '/' && ('(current)')}</Nav.Link>
          </Nav>
          {loc.pathname === '/' && (
            <Nav>
              <Form>
                <Form.Group className='d-flex'>
                  <input className='search-input' type={text} placeholder='Search...' onKeyPress={handleEnterKey} onChange={(e) => handleOnChange(e.target.value)} />
                  <Button className='search-button' variant="primary" onClick={handleSearch} disabled={ errorMessage === '' ? false : true}>
                  🔍
                  </Button>
                </Form.Group>
                <div className='errorLabel'>{errorMessage}</div>
              </Form>
            </Nav>
          )}
        </Navb.Collapse>
      </Navb>
    </>
  )
}

export default Navbar