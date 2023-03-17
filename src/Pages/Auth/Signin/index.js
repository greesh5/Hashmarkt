import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import { LoginIcon } from '@heroicons/react/outline'
import styled from 'styled-components';
const StyledDiv = styled.div`
  border: 2px solid yellow;
  display: flex;
  margin-left:350px;
  padding:30px;
  margin-top:30px;
  margin-right:350px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 16px;s
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  margin-top:50px;
  font-size:50px;
  margin-bottom:30px;
`;
const StyledSpan=styled.span`
  margin-bottom:50px;`
const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom:20px;
  width: 100%;
  color:black;
  &:focus {
    outline: none;
    border: 1px solid blue;
    cursor:pointer;
  }
`;
const StyleIcon=styled.p`
    font-size:50px;`
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  background-color: yellow;
  color: black;
  padding:20px;
  margin-top:30px;
  border-radius: 5px;
  height:20px;
  // padding: 10rem;
  width: 100%;`

const Signin = () => {
  const { currentUser, login, setCurrentUser, setIsSubmitting, loggedIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      alert("Error!")
    }
    setIsSubmitting(false)
  }

  const navigate = useNavigate()
  
  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])

  return (
    <div>
      <StyledDiv>
        <div>
          <StyledLabel>Login</StyledLabel>
        </div>
        <StyledForm
          autoComplete="off"
          onSubmit={handleSignIn}
        >
          <StyledInputWrapper>
            <div>
              <label></label>
              <StyledInput
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              {/* <StyledLabel>Password</StyledLabel> */}
              <StyledInput
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div>
              <div>
                <StyledSpan>
                  Don't have an account? Sign up{" "}
                  <Link to="/signup">
                    {" "}
                    here.
                  </Link>
                </StyledSpan>
              </div>
            </div>
            <div>
              <StyledButton type="submit">
              <StyleIcon><LoginIcon aria1-hidden="true"/></StyleIcon>
                Login
              </StyledButton>
            </div>
          </StyledInputWrapper>
        </StyledForm>
      </StyledDiv>
    </div>
  )
}

export default Signin