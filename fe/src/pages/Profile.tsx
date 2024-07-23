
import { useForm } from "react-hook-form";

function Profile() {

    const { formState: { errors }, register, handleSubmit } = useForm()
    const getuserInfo = async () => {

    }
    const onSubmit = (data) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>

        <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Phone number
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    disabled
                    value={"0944444444"}

                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="dateOfBitrh"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Date Of Bitrh
                </label>
                <input
                    type="date"
                    id="dateOfBitrh"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                />
            </div>

            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                update
            </button>
        </form>

    </>);
}

export default Profile;