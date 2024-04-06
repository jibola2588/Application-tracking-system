import { useState } from "react";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PiLockKeyBold } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import Input from "../../components/input";
import { validateData, validateInput } from "../../utils/helper";
import { toast } from "react-toastify";
import authService from "../../services/auth-service";
import LogoComponent from "../../components/logo";
import RightAuthScreen from "../../components/rightSection";

const Register = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    let valid = true;
    if (name === "password") {
      valid = validateInput(name, value);
    } else {
      valid = validateData(updatedData);
    }
    setDisabled(!valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.onRegister(formData);
      if (response) {
        setLoading(false);
        toast.success(response?.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
    }

    // var decoded = jwt_decode(result.token);
    // const exp = decoded.exp * 1000;
    // localStorage.setItem("jwtExpiry", exp);
  };

  return (
    <div className="h-screen w-full grid md:grid-cols-2">
      <div className="w-full h-[100%] md:hidden">
        <RightAuthScreen />
      </div>
      <section className="mt-6">
        <div className="max-w-[400px] mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <LogoComponent />
              <h3 className="text-black text-lg font-semibold text-center">
                Sign up
              </h3>
              <p className="mt-2 break-words text-center px-4">
                Welcome! Please proceed by creating an account with us using the
                form below.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <Input
                    value={formData.firstName}
                    onChange={handleChange}
                    label="First Name"
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    customclassname="bg-transparent"
                  />
                </div>
                <div>
                  <Input
                    value={formData.lastName}
                    onChange={handleChange}
                    label="Last Name"
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    customclassname="bg-transparent"
                  />
                </div>
                <div>
                  <Input
                    value={formData.email}
                    onChange={handleChange}
                    label="Email Address"
                    id="email-item"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    iconleft={MdOutlineEmail}
                    customclassname="bg-transparent"
                  />
                </div>
                <div>
                  <Input
                    value={formData.password}
                    onChange={handleChange}
                    label="Password"
                    id="password-item"
                    type="password"
                    switchtype="text"
                    name="password"
                    placeholder="Enter your password"
                    iconleft={PiLockKeyBold}
                    customclassname="py-1 px-5 bg-transaprent"
                    iconright={AiFillEye}
                    iconrightswitch={AiFillEyeInvisible}
                  />
                  <p
                    className={`text-sm ${
                      !formData.password.length
                        ? " text-[#b5b3b3]"
                        : formData.password.length >= 8
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    Must be atleast 8 characters
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button
                label="Proceed"
                type="submit"
                color="primary"
                size="large"
                disabled={disabled}
                loading={loading}
              />
            </div>
            <p className="text-sm text-[#1c0808] text-center mt-2">
              Already have an account?{" "}
              <span
                onClick={goToLogin}
                className="text-primary300 font-bold cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </section>
     <div className=" hidden md:block "> 
       <RightAuthScreen />
     </div>
    </div>
  );
};

export default Register;
