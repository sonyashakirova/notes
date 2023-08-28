import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "shared/config/firebase";
import { Form } from "shared/ui/form";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // @ts-ignore
      await updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
    } catch (error) {
      // @ts-ignore
      setErrorMessage(error.message ?? "Unknown error");
      setOpenError(true);
    }
  };

  return (
    <Form
      title="Register"
      onSubmit={register}
      buttons={
        <>
          <Button
            variant="outlined"
            sx={{ boxShadow: "none" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button variant="contained" sx={{ boxShadow: "none" }} type="submit">
            Submit
          </Button>
        </>
      }
    >
      <TextField
        required
        id="register-name"
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        required
        id="register-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        id="register-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openError}
        onClose={() => setOpenError(false)}
      >
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Form>
  );
};

export default Register;
