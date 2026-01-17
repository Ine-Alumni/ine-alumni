import React from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router";
import { useAlert } from "../../SharedLayout.jsx";
import { resetPassword } from "@/services/auth-service.js";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema.js";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addAlert } = useAlert();
  const prefillEmail = location.state?.email || "";

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { email: prefillEmail, token: "", newPassword: "" },
      validationSchema: resetPasswordSchema,
      onSubmit: async (vals, actions) => {
        try {
          const res = await resetPassword(vals.email, vals.token, vals.newPassword);
          if (res.status === 200) {
            addAlert(true, res.data || "Your password has been reset successfully.");
            actions.resetForm();
            navigate("/se-connecter");
          } else {
            const msg = typeof res.data === "string" ? res.data : "Invalid or expired code.";
            addAlert(false, msg);
          }
        } catch (e) {
          addAlert(false, "Unable to process request. Please try again.");
        } finally {
          actions.setSubmitting(false);
        }
      },
    });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white">
              Reset password
            </h1>
            <form noValidate onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Email
                </label>
                <input
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@mail.com"
                  required
                />
                {errors.email && touched.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  Verification code
                </label>
                <input
                  value={values.token}
                  onChange={handleChange}
                  type="text"
                  name="token"
                  id="token"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter the code you received"
                  required
                />
                {errors.token && touched.token && (
                  <p className="text-red-400 text-sm mt-1">{errors.token}</p>
                )}
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                  New password
                </label>
                <input
                  value={values.newPassword}
                  onChange={handleChange}
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
                {errors.newPassword && touched.newPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full text-white bg-[#5691cb] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer hover:bg-[#0c5f95]"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
