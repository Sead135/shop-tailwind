import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const LoginScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Авторизация">
      <form
        className="mx-auto w-full p-8 sm:w-1/2 md:w-1/3 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl text-center">Авторизация</h1>
        <div className="mb-4">
          <label htmlFor="email" className="">
            Электронная почта
          </label>
          <input
            {...register("email", {
              required: "Пожалуйста введите электронную почту.",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Введите корректный адрес электронной почты.",
              },
            })}
            type="email"
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="">
            Пароль
          </label>
          <input
            {...register("password", {
              required: "Пожалуйста введите пароль.",
              minLength: {
                value: 8,
                message: "Пароль должен содержать больше 8 символов",
              },
            })}
            type="password"
            className="w-full"
            id="password"
            autoFocus
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Войти</button>
        </div>
        <div className="mb-4">
          <p className="">
            Нет аккаунта? <Link href="/register">Регистрация</Link>
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;