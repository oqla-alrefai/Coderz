import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../Redux/userSlice";

import { Container, TextField, Button, Select, InputLabel, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")

  const dispatch = useDispatch()
  const signup = () => {
    dispatch(signupUser({name, email, gender, status : "active"})).then(() => {

      setTimeout(()=>{
        navigate("/home")
      }, 3000
      )
    })
    .catch(err => {
      console.log(err);
    })
  }
  

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);
  return (
    <ContainerStyled showAnimation={showAnimation}>
      <SignupForm>
        <Title>Create an Account</Title>
        <Form>
          <TextField label="Full Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField type="email" label="Email Address"  fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputLabel id="demo-simple-select-label" >Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="female">female</MenuItem>

          </Select>
          <Button variant="contained" color="primary" fullWidth onClick={()=>signup()} >
            Sign Up
          </Button>
        </Form>
        <Terms>
          You Already Have An Account <Link to="/">Login</Link>
        </Terms>
      </SignupForm>
    </ContainerStyled>
  );
};
const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContainerStyled = styled(Container)(({ showAnimation }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  animation: showAnimation ? `${slideInAnimation} 0.5s ease-in` : "",
}));

const SignupForm = styled("div")`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled("h2")`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Terms = styled("p")`
  font-size: 12px;
  text-align: center;
`;


export default Signup;
