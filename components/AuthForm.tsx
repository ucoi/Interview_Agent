"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email(),
    password: z.string().min(6),
})

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
    const isSignIn = type === "sign-in"

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
        toast.success(isSignIn ? "Signed in successfully" : "Account created successfully")
    }

    return (
        <div className="card-border lg:min-w-141.5">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2 className="text-primary-100">PrepPilot</h2>
                </div>

              <h3>Practice job interviews with AI </h3>

                <Card className="w-full sm:max-w-md">
                    <CardHeader>
                        <CardTitle>{isSignIn ? "Sign In" : "Create an Account"}</CardTitle>
                        <CardDescription>
                            {isSignIn
                                ? "Welcome back! Sign in to continue."
                                : "Sign up to get started with your interview prep."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                {!isSignIn && (
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({field, fieldState}) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="auth-form-name">
                                                    Full Name
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="auth-form-name"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="John Doe"
                                                    autoComplete="name"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )}
                                            </Field>
                                        )}
                                    />
                                )}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="auth-form-email">
                                                Email
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="auth-form-email"
                                                type="email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="auth-form-password">
                                                Password
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="auth-form-password"
                                                type="password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="••••••••"
                                                autoComplete={isSignIn ? "current-password" : "new-password"}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Field orientation="horizontal">
                            <Button type="submit" form="auth-form" className="w-full">
                                {isSignIn ? "Sign In" : "Sign Up"}
                            </Button>
                        </Field>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
 }
export default AuthForm