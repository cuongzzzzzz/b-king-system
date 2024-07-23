import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/authRequest";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required().min(6),
    email: yup.string().required(),
    phoneNumber: yup.string().required().min(10),
    confirmPassword: yup
      .string()
      .required("Vui long xac nha nmat khau")
      .oneOf([yup.ref("password")], "Mat khau xac nhan khong khop"),
  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      registerUser(data, dispatch, navigate);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <p className="text-xl font-bold">Register</p>

              <form
                action="#"
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>

                  <input
                    {...register("username")}
                    type="text"
                    id="FirstName"
                    className="mt-1 w-full rounded-md p-3 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors?.username && (
                    <p className="text-red-500">{errors?.username.message}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>

                  <input
                    {...register("phoneNumber")}
                    type="text"
                    id="LastName"
                    className="mt-1 w-full rounded-md p-3 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors?.phoneNumber && (
                    <p className="text-red-500">
                      {errors?.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    {...register("email")}
                    type="email"
                    id="Email"
                    className="mt-1 w-full rounded-md p-3 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors?.email && (
                    <p className="text-red-500">{errors?.email.message}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    {...register("password")}
                    type="password"
                    id="Password"
                    className="mt-1 w-full rounded-md p-3 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors?.password && (
                    <p className="text-red-500">{errors?.password.message}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>

                  <input
                    {...register("confirmPassword")}
                    type="password"
                    id="PasswordConfirmation"
                    className="mt-1 w-full rounded-md p-3 border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {errors?.confirmPassword && (
                    <p className="text-red-500">
                      {errors?.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline">
                      {" "}
                      terms and conditions{" "}
                    </a>
                    and
                    <a href="#" className="text-gray-700 underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="#" className="text-gray-700 underline">
                      Log in
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default Register;
