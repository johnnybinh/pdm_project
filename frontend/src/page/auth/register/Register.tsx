import React from "react";
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

import { useToast } from "../../../hooks/use-toast";
import { register } from "../../../util/auth";

const registerSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email({ message: "not valid email" }).min(5),
    password: z.string().min(12, "password too short"),
    confirmPassword: z.string().min(12, "password too short"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password != confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password don't match",
      });
    }
  });

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    try {
      //login logic
      await register({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        profilePicture: `https://api.dicebear.com/9.x/initials/svg?seed=${
          data.firstname + data.lastname
        }`,
      });
      toast({
        title: "Sign up successfull",
        description: "Please Login",
      });
      navigate("/auth/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: JSON.stringify(error),
      });
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen gap-2">
      <h1 className="scroll-m-20 text-4xl font-semibold  tracking-tight ">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="  m-4 justify-center w-1/4 flex flex-col gap-2 h-2/6"
          action=""
        >
          <div className="flex w-full gap-2 ">
            <div className="w-1/2">
              {" "}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
        <h1 className="text-xl">Already have an account?</h1>
        <Link to={"/auth/login"}>
          <Button size={"sm"} className="text-lg" variant={"link"}>
            Sign in here
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
