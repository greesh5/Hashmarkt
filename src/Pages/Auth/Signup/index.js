import { IdentificationIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import validations from './validations'
import styled from 'styled-components'

const StyledDiv=styled.div`
// border: 2px solid yellow;
display: flex;
margin-left:350px;
padding:30px;
margin-top:30px;
margin-right:350px;
flex-direction: column;
align-items: center;
text-align: center;
font-size: 16px;
`
const StyledLable=styled.label`
  font-size:40px;
  `
const StyledSpan=styled.span`
  margin-bottom:20px;
  margin-top:30px;`
const StyledForm=styled.form`
  align-items:center;
  width:100%;
  max-width:400px
  display:flex;
  flex-direction:column;`
const StyledInput=styled.input`
  padding:0.3rem;
  margin-top:10px;
  margin-bottom:10px;
  width:100%;
  border-radius:5px;
  color:black;
  &:focus{
    outline:none;}`
const StyledButton=styled.button`
  display:flex;
  align-items:center;
  text-align:center;
  border-radius:0.3rem;
  justify-content:center;
  color:black;
  margin-top:10px;
  background:yellow;
  width:100%;
  height:20px;
  padding:20px;`
const Signup = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    setErrors,
    setIsSubmitting
  } = useAuth()

  const navigate = useNavigate()
  
  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])

  const handleSignUpFormChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    setErrors(validations(currentUser, users)) 
    setIsSubmitting(true)
    localStorage.setItem('user', JSON.stringify(currentUser))
    localStorage.setItem('users', JSON.stringify(users))
  }

  return (
    <StyledDiv>
      <div>
        <div>
          <StyledLable>Sign Up</StyledLable>
        </div>
        <StyledForm 
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
        >
          <div >
            <div>
            {errors.firstName && <span>{errors.firstName}</span>}
              {/* <label >First Name</label> */}
              <StyledInput
                type="text"
                onChange={handleSignUpFormChange}
                value={currentUser.firstName}
                name="firstName"
                placeholder="First Name"
                required
              />
              
            </div>

            <div>
            {errors.lastName && <span>{errors.lastName}</span>}
              {/* <label>Last Name</label> */}
              <StyledInput
                type="text"
                onChange={handleSignUpFormChange}
                value={currentUser.lastName}
                name="lastName"
                placeholder="Last Name"
                required
              />
              
            </div>
            <div>
            {errors.email && <span >{errors.email}</span>}
              {/* <label>Email</label> */}
              <StyledInput
                type="email"
                onChange={handleSignUpFormChange}
                value={currentUser.email}
                name="email"
                placeholder="Email Address"
                required
              />
              
            </div>
            <div>
            {errors.password && <span >{errors.password}</span>}
              {/* <label >Password</label> */}
              <StyledInput
                type="Password"
                onChange={handleSignUpFormChange}
                value={currentUser.password}
                name="password"
                placeholder="Password"
                required
              />
              
            </div>
            <div>
            {errors.passwordConfirm && <span>{errors.passwordConfirm}</span>}
              {/* <label >Password Confirm</label> */}
              <StyledInput
                type="Password"
                onChange={handleSignUpFormChange}
                value={currentUser.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
                required
              />
              
            </div>
            <div >
              <div >
                <StyledSpan>
                  Already have an account? Login{" "}
                  <Link to="/signin" >
                    {" "}
                    here.
                  </Link>
                </StyledSpan>
              </div>
            </div>
            <div >
              <StyledButton type="submit" >
                {/* <IdentificationIcon
                  aria1-hidden="true"
                /> */}
                Sign Up
              </StyledButton>
            </div>
          </div>
        </StyledForm>
      </div>
    </StyledDiv>
  )
}

export default Signup
