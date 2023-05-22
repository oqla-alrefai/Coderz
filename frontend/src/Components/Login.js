import React, { useEffect, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import { loginUser } from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [id, setId] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

const login = () =>{
    console.log(id);
    dispatch(loginUser({id})).then(() => {
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
        <Title>Login</Title>
        <Form>
          <TextField label="ID" fullWidth value={id} onChange={(e)=> setId(e.target.value)}/>


          <Button variant="contained" color="primary" fullWidth onClick={() => login()}>
            Login
          </Button>
        </Form>
        <Terms>
          You Don't Have An Account <Link to="/signup">Signup</Link>
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


export default Login;
