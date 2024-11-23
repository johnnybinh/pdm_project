import React, { useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "../../../components/ui/form";
import { Link, useNavigate } from "react-router-dom";

import { title } from "process";
import { ToastAction } from "../../../components/ui/toast";
import { useToast } from "../../../hooks/use-toast";
import { checkLogin, login } from "../../../util/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "not valid email" }).min(5),
  password: z.string().min(12, "password too short"),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (checkLogin() === false) {
      navigate("/home");
    }
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      //login logic
      await login(data);
      toast({
        title: "Login Succesfully",
        description: "yay",
      });
      navigate("/home");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: JSON.stringify(error.response.data.description),
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-2">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight ">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" justify-center w-1/4 flex flex-col gap-2 h-1/4"
          action=""
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="supersecretpassword"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="justify-self-end" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <hr className="border-b-2  w-1/4 border-border" />
      <div className="flex justify-center items-center">
        <h1 className="text-xl">don't have an account?</h1>
        <Link to={"/auth/register"}>
          <Button size={"sm"} className="text-lg" variant={"link"}>
            Sign up here
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
