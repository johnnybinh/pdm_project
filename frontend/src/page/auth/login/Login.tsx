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

import { ToastAction } from "../../../components/ui/toast";
import { useToast } from "../../../hooks/use-toast";
import { checkLogin, login } from "../../../util/auth";
import { useUser } from "../../../util/UserContext"; // Import useUser

const loginSchema = z.object({
    email: z.string().email({ message: "not valid email" }).min(5),
    password: z.string().min(12, "password too short"),
});

const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { updateUser } = useUser(); // Access updateUser from UserContext

    useEffect(() => {
        if (checkLogin()) {
            navigate("/home");
        }
    }, [navigate]); // Only runs once on mount

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof loginSchema>) {
        try {
            const response = await login(data);
            console.log("Login Successful:", response); // Log response

            // Save token to localStorage (assuming the login function returns a token)
            if (response.token) {
                localStorage.setItem("token", response.token);
                updateUser(); // Manually update the user context
            }

            toast({
                title: "Login Successfully",
                description: "Welcome back!",
            });

            navigate("/home"); // Redirect to home
        } catch (error) {
            console.error("Login Error:", error); // Log error for debugging
            const errorMessage =
                error.response?.data?.description || "Failed to log in. Please try again.";
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
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