import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../Redux/userSlice";
import { toast } from "react-toastify";
import { styled } from "styled-components";

const UpdateForm = ({handleUpdateForm}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const update = () => {
    const id = JSON.parse(localStorage.getItem("userData")).id;
     dispatch(updateUser({ id,name, email, gender, status }))
      .then(() => {
        toast.success("user updated successfully");
        handleUpdateForm(false)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>

    <Form>
      <TextField
        label="Full Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        type="email"
        label="Email Address"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
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
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="status"
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="active">active</MenuItem>
        <MenuItem value="inactive">inactive</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={update}
      >
        Update
      </Button>
    </Form>
    </Container>

  );
};

export default UpdateForm;
const Form = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Container = styled("div")`
  width:40%;

`