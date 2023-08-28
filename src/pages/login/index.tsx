import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "shared/config/firebase";
import { Form } from "shared/ui/form";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      // @ts-ignore
      setErrorMessage(error.message ?? "Unknown error");
      setOpenError(true);
    }
  };

  return (
    <Form
      title="Login"
      onSubmit={login}
      buttons={
        <>
          <Button
            variant="outlined"
            sx={{ boxShadow: "none" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
          <Button variant="contained" sx={{ boxShadow: "none" }} type="submit">
            Submit
          </Button>
        </>
      }
    >
      <TextField
        required
        id="outlined-email-input"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        id="outlined-password-input"
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

export default Login;
