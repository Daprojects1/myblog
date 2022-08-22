import { Formik, useFormik } from "formik";
import Appbutton from "../../reusableComps/Appbutton";
import Input from "../../reusableComps/Input";
import Router, { useRouter } from "next/router";
import * as Yup from "yup";
import useLogin from "../../hooks/useLogin";
import { toast } from "react-toastify";
import useAuthContext from "../../hooks/useAuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { signIn, loading, errors: loginErrors } = useLogin();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      Router.push("/");
    }
  }, [user]);
  const initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (val) => {
      const { username, password } = val;
      try {
        await signIn(username, password);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
      password: Yup.string().required("Please enter your password"),
    }),
  });

  const { handleBlur, handleChange, values, errors, touched, handleSubmit } =
    formik;
  const handleReRoute = (path) => {
    router.push(path);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form className="formBody">
      <h3>Log In</h3>
      <div className="formBody__inputs login__inputs">
        <Input
          type="text"
          title="Username"
          name="username"
          id="uName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          errors={errors.username}
          touched={touched.username}
        />
        <Input
          type="password"
          title="Password"
          name="password"
          id="pwd"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          errors={errors.password}
          touched={touched.password}
        />
      </div>
      <Appbutton
        type="button"
        className="appButton"
        title="Login"
        onClick={handleLogin}
        disabled={loading}
      />
      <div className="createAccount">
        <p>Dont have an accout yet ?</p>
        <p className="createAccLink" onClick={() => handleReRoute("/register")}>
          Create an account
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
