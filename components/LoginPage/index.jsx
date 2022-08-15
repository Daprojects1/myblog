import { Formik, useFormik } from "formik";
import Appbutton from "../../reusableComps/Appbutton";
import Input from "../../reusableComps/Input";
import * as Yup from "yup";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const initialValues = {
    username: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(val);
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
      password: Yup.string()
        .required("Please enter your password")
        .min(5, "Your password must be longer than 5 characters.")
        .max(25, "your password must be less than 25 characters ")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])/,
          "Must Contain One Uppercase, One Lowercase"
        )
        .matches(
          /^(?=.*[!@#\$%\^&\*])/,
          "Must Contain One Special Case Character"
        )
        .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
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
