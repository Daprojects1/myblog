import Router, { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../reusableComps/Input";
import Appbutton from "../../reusableComps/Appbutton";
import useRegister from "../../hooks/Auth/useRegister";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useAuthContext from "../../hooks/Auth/useAuthContext";

const RegisterPage = () => {
  const router = useRouter();
  const { register, loading, errors: registerErrors } = useRegister();
  const handleReRoute = (path) => {
    router.push(path);
  };
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      Router.push("/");
    }
  }, [user]);

  const initialValues = {
    username: "",
    email: "",
    confirmPassword: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (val) => {
      try {
        await register(val);
        router.push("/");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
      email: Yup.string()
        .required("Please enter your email")
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "Please enter a valid email"
        ),
      password: Yup.string()
        .required("Please enter your password")
        .min(5, "Your password must be longer than 5 characters")
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
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
  });

  const { handleBlur, handleChange, values, errors, touched, handleSubmit } =
    formik;

  const handleLogin = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form className="formBody formBody__register">
      <h3 className="registerH3">Create an account</h3>
      <div className="formBody__inputs">
        <Input
          type="email"
          title="Email"
          name="email"
          id="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          errors={errors.email}
          touched={touched.email}
        />
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
        <Input
          type="password"
          title="Confirm Password"
          name="confirmPassword"
          id="confirmPwd"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          errors={errors.confirmPassword}
          touched={touched.confirmPassword}
        />
      </div>
      <Appbutton
        type="button"
        className="appButton registerBtn"
        title="Sign up"
        onClick={handleLogin}
        disabled={loading}
      />
      <div className="createAccount">
        <p>
          Already have an account ?{" "}
          <span
            className="createAccLink"
            onClick={() => handleReRoute("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </form>
  );
};

export default RegisterPage;
