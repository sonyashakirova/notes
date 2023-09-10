import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useAuth } from "features";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "shared/ui/form";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    register(
      formData,
      () => navigate("/"),
      (error) => {
        setErrorMessage(error ?? "Unknown error");
        setOpenError(true);
      }
    );
  };

  return (
    <Form
      title="Register"
      onSubmit={handleSubmit}
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
        name="name"
        label="Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        required
        id="register-email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        required
        id="register-password"
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
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
