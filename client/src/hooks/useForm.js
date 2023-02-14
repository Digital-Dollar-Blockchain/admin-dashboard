import { useEffect, useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    setError({
      email: "",
      password: ""
    });
  }, []);

  const validation = (e) => {
    const { name, value, required } = e.target;

    if (required && value === "") {
      setError(prev => ({ ...prev, [name]: "* This field is required." }));
    }
    else {
      if (name === "email") {

        if (value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
          setError(prev => ({ ...prev, email: "" }));
        }
        else {
          setError(prev => ({ ...prev, email: "Email is not valid." }));
        }
      }

      if (name === "password") {
        if (value.length < 4 || value.length > 16) {
          setError(prev => ({ ...prev, password: "The length of password is not valid." }));
        } else {
          setError(prev => ({ ...prev, password: "" }));
        }
      }
    }

    setValues({ ...values, [name]: value });
  }

  return [values, error, validation];
};
