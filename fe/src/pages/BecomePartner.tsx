import { instance } from "@/configs/axios";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BecomePartner() {
    const navigate = useNavigate()

    const schema = Joi.object({
        address: Joi.string().required().messages({
            'string.empty': 'Địa chỉ không được để trống',
            'any.required': 'Địa chỉ là trường bắt buộc'
        }),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.email': 'Email không hợp lệ',
            'string.empty': 'Email không được để trống',
            'any.required': 'Email là trường bắt buộc'
        }),
        name: Joi.string().required().messages({
            'string.empty': 'Tên không được để trống',
            'any.required': 'Tên là trường bắt buộc'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
            'string.empty': 'Mật khẩu không được để trống',
            'any.required': 'Mật khẩu là trường bắt buộc'
        }),
        phoneNumber: Joi.string().pattern(/^\d{10}$/).required().messages({
            'string.pattern.base': 'Số điện thoại phải có 10 chữ số',
            'string.empty': 'Số điện thoại không được để trống',
            'any.required': 'Số điện thoại là trường bắt buộc'
        }),
        rePassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Mật khẩu nhập lại không khớp',
            'string.empty': 'Vui lòng nhập lại mật khẩu',
            'any.required': 'Vui lòng nhập lại mật khẩu'
        })
    }).options({ abortEarly: false });

    // Sử dụng schema với react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    });

    const onSubmit = async (data) => {
        console.log(data)
        try {

            const newCarrier = await instance.post("/carrier", {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phoneNumber,
                contactInfo: {
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    email: data.email
                }
            })
            toast("Đăng ký thành công!")
            navigate("/login")

        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <h1 className="text-3xl text-blue-500 text-center my-5">Become our partner today!</h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@flowbite.com"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="carrierName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Carrier Name
                </label>
                <input
                    type="text"
                    id="carrierName"
                    className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="your carrier name"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    className={`bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="your address"
                    {...register("address")}
                />
                {errors.address && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Phone number
                </label>
                <input
                    type="text"
                    id="phone"
                    className={`bg-gray-50 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="your phone number"
                    {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.phoneNumber.message}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("password")}
                />
                {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="mb-5">
                <label
                    htmlFor="rePassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Repassword
                </label>
                <input
                    type="password"
                    id="rePassword"
                    className={`bg-gray-50 border ${errors.rePassword ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    {...register("rePassword")}
                />
                {errors.rePassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.rePassword.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Register
            </button>
        </form>

    </>);
}

export default BecomePartner;

// "stack": "TypeError: Cannot destructure property 'password' of 'foundUser' as it is null.\n    at login (C:\\Users\\mtdta\\Desktop\\typescript\\typescript\\typescript\\asm\\be\\src\\services\\access.service.js:27:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async login (C:\\Users\\mtdta\\Desktop\\typescript\\typescript\\typescript\\asm\\be\\src\\controllers\\access.controller.js:11:20)",