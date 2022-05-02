import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import authApi from "../../apis/authApi";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

type RegisterFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Formato de correo inválido").required("Requerido"),
  firstName: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  phoneNumber: Yup.string().required("Requerido"),
  password: Yup.string().required("Requerido"),
  confirmPassword: Yup.string().required("Requerido"),
});

const validateRegisterForm = (values: RegisterFormValues) => {
  let errors = {};
  if (values.password !== values.confirmPassword) {
    errors = {
      ...errors,
      password: "Las contraseñas no coinciden",
      confirmPassword: "Las contraseñas no coinciden",
    };
  }

  return errors;
};

const RegisterScreen = () => {
  const navigate = useNavigate();

  const handleRegister = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    authApi
      .post("/users/register", {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
        password: values.password,
      })
      .then((response) => {
        toast.success("Éxito! revise su correo para activar su cuenta");
        navigate("/login", { replace: true });
      })
      .catch((error: AxiosError) => {
        if (
          error.response?.data?.email?.at(0) ===
          "user with this email address already exists."
        )
          toast.error("Ya existe un usuario con este correo.");
        else toast.error("Error al crear la cuenta");
      });

    setSubmitting(false);
  };

  return (
    <div className="login-box animate__animated animate__fadeIn">
      <div className="login-content">
        <h3 className="login-header mb-4">Crear cuenta</h3>

        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          validate={validateRegisterForm}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Nombres"
                  className="form-control"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Apellidos"
                  className="form-control"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder="Número de teléfono"
                  className="form-control"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Constraseña"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                className="primary-button"
                disabled={isSubmitting}
              >
                Registrar
              </button>
            </Form>
          )}
        </Formik>
        <Link to="/login">¿Ya tienes cuenta?</Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
