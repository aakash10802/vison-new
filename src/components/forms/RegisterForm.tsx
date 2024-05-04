import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../inputs/Input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

const registerSchema = z.object({
  name: z
    .string({
      required_error: "your name is required!",
    })
    .min(3, "minimum character is 3"),
  email: z
    .string({
      required_error: "your email is required!",
    })
    .email("email is not valid"),
  password: z
    .string({
      required_error: "your password is required!",
    })
    .min(6, "minimum character is 6"),
});
const loginSchema = z.object({
  email: z
    .string({
      required_error: "your email is required!",
    })
    .email("email is not valid"),
  password: z
    .string({
      required_error: "your password is required!",
    })
    .min(6, "minimum character is 6"),
});

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/profiles",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const RegisterForm = () => {
  const router = useRouter();

  const [isLoading, setloading] = useState(false);
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("REGISTER");

  const form = useForm({
    resolver: zodResolver(
      variant === "REGISTER" ? registerSchema : loginSchema
    ),
    defaultValues:
      variant === "REGISTER"
        ? {
            name: "",
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
          },
  });

  const toggleVariants = useCallback(() => {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }, [variant, setVariant]);

  const register = form.handleSubmit(
    async (values: z.infer<typeof registerSchema | typeof loginSchema>) => {
      try {
        setloading(true);
        await axios.post("/api/register", values).then((res) => {
          toast.success(res.data.message);
          login();
        });
      } catch (error: any) {
        console.log(error);
        if (error?.response.data.message) {
          toast.error(error?.response.data.message);
        }

        toast.error("something went wrong!");
      } finally {
        setloading(false);
      }
    }
  );
  const login = form.handleSubmit(
    async (values: z.infer<typeof registerSchema | typeof loginSchema>) => {
      try {
        setloading(true);
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/profiles",
        });
        toast.success("wellcome back");
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      } finally {
        setloading(false);
      }
    }
  );

  return (
    <div className="bg-black bg-opacity-70 px-16 py-10 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
      <h2 className="text-white text-4xl mb-8 font-semibold">
        {variant === "LOGIN" ? "Sign in" : "Register"}
      </h2>
      <div className="flex flex-col gap-4">
        {variant === "REGISTER" && (
          <Input
            name="name"
            type="text"
            label="Username"
            value={form.watch("name") as string}
            onChange={(e) => form.setValue("name", e.target.value)}
            register={form.register("name", {
              required: true,
            })}
            disabled={isLoading}
          />
        )}
        <Input
          disabled={isLoading}
          name="email"
          type="email"
          label="Email address or phone number"
          value={form.watch("email")}
          onChange={(e) => form.setValue("email", e.target.value)}
          register={form.register("email", {
            required: true,
          })}
        />
        <Input
          disabled={isLoading}
          register={form.register("password", {
            required: true,
          })}
          type="password"
          name="password"
          label="Password"
          value={form.watch("password")}
          onChange={(e) => form.setValue("password", e.target.value)}
        />
      </div>
      <button
        onClick={variant === "LOGIN" ? login : register}
        className="bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
        disabled={isLoading}
      >
        {variant === "LOGIN" ? "Login" : "Sign up"}
      </button>
      {/* <div className="flex flex-row items-center gap-4 mt-8 justify-center">
        <div
          onClick={() => signIn("google", { callbackUrl: "/profiles" })}
          className="w-10 h-10 border-[1px] border-transparent hover:border-red-600   rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
        >
          <FcGoogle size={32} />
        </div>
        <div
          onClick={() => signIn("github", { callbackUrl: "/profiles" })}
          className="w-10 h-10 border-[1px] border-transparent hover:border-red-600   rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
        >
          <FaGithub size={32} />
        </div>
      </div> */}
      <p className="text-neutral-500 mt-12 ">
        {variant === "LOGIN"
          ? "First time using Vision.io?"
          : "Already have an account?"}
        <span
          onClick={toggleVariants}
          className="text-white ml-1 hover:underline cursor-pointer hover:text-red-700 transition-all"
        >
          {variant === "LOGIN" ? "Create an account" : "Login"}
        </span>
        .
      </p>
    </div>
  );
};

export default RegisterForm;
