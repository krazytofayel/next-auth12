"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
    isAdmin: false, // Adding isAdmin to the initial state
    isTeacher:false
  });
  const registerUser = async (e) => {
    e.preventDefault();
    // Log the data just before making the API call
    console.log("Data to be sent:", data);
    try {console.log('robinjkhvai',JSON.stringify(data));
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const userInfo = await response.json(); // Parsing JSON from response body
      console.log('robinvai',userInfo);
      router.push("/login");
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  // const handleRoleSelection = (selectedRole) => {
  //   const isAdmin = selectedRole === "isAdmin"; // Check if the selected role is 'isAdmin'
  //   setData({ ...data, isAdmin }); // Update the isAdmin value in the state
  // };
  const handleRoleSelection = (selectedRole) => {
    if (selectedRole === "isAdmin") {
      setData({ ...data, isAdmin: true, isTeacher: false }); // Update isParent to true and isTeacher to false
    } else if (selectedRole === "isTeacher") {
      setData({ ...data, isAdmin: false, isTeacher: true }); // Update isParent to false and isTeacher to true
    }
  };
  
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser} action="#" >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div>
                {/* Role selection buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => handleRoleSelection("isAdmin")}
                    className={`rounded-md px-4 py-2 border border-gray-300 ${data.isAdmin ? "bg-indigo-500 text-white" : ""}`}
                  >
                    Tutor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelection("isTeacher")}
                    className={`rounded-md px-4 py-2 border border-gray-300 ${!data.isAdmin ? "bg-indigo-500 text-white" : ""}`}
                  >
                    Parent
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
              </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
