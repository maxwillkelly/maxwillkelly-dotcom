"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, SendHorizontal } from "lucide-react";
import { Ripple } from "m3-ripple";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import "m3-ripple/ripple.css";
import {
  ContactMessage,
  contactMessageSchema,
} from "@/schemas/contact-message";

export const ContactForm = () => {
  const isIdle = true;
  const isPending = false;
  const isError = false;
  const isSuccess = false;

  const { control, handleSubmit, reset } = useForm<ContactMessage>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subtitle: "",
      message: "",
    },
    resolver: zodResolver(contactMessageSchema),
  });

  const onSubmit: SubmitHandler<ContactMessage> = async (data) => {
    // await mutateAsync({ contactMessage: data });
    console.log("Do something with contact message:", data);
    reset();
  };

  return (
    <div>
      {isSuccess ? (
        <div className="flex flex-col gap-4">
          <div className=""></div>
        </div>
      ) : (
        <form
          className="flex flex-col flex-wrap"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6 md:flex">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    className="px-3 md:mb-0 md:w-1/2"
                    name="firstName"
                    isInvalid={Boolean(fieldState.error)}
                  >
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      {...field}
                      aria-label="First Name"
                      id="firstName"
                      type="text"
                      placeholder="John"
                    />
                    <FieldError>{fieldState.error?.message}</FieldError>
                  </TextField>
                </>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    className="px-3 md:mb-0 md:w-1/2"
                    name="lastName"
                    isInvalid={Boolean(fieldState.error)}
                  >
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      {...field}
                      aria-label="Last Name"
                      id="lastName"
                      type="text"
                      placeholder="Smith"
                    />
                    <FieldError>{fieldState.error?.message}</FieldError>
                  </TextField>
                </>
              )}
            />
          </div>
          <div className="mb-6 md:flex">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    className="px-3 md:mb-0 md:w-1/2"
                    name="email"
                    isInvalid={Boolean(fieldState.error)}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...field}
                      aria-label="Email"
                      id="email"
                      type="email"
                      placeholder="john.smith@email.com"
                    />
                    <FieldError>{fieldState.error?.message}</FieldError>
                  </TextField>
                </>
              )}
            />
            <Controller
              name="subtitle"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    className="px-3 md:w-1/2"
                    name="subtitle"
                    isInvalid={Boolean(fieldState.error)}
                  >
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      {...field}
                      aria-label="Subtitle"
                      id="subtitle"
                      type="text"
                      placeholder="Hello"
                    />
                    <FieldError>{fieldState.error?.message}</FieldError>
                  </TextField>
                </>
              )}
            />
          </div>
          <Controller
            name="message"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                className="mb-6 px-3"
                name="message"
                isInvalid={Boolean(fieldState.error)}
              >
                <Label htmlFor="message">Message</Label>
                <TextArea
                  {...field}
                  className="resize-none"
                  aria-label="Message"
                  id="message"
                  placeholder="Let's rock 'n' roll"
                  rows={6}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </TextField>
            )}
          />
          <div className="flex flex-row-reverse">
            <Button
              className="w-full"
              type="submit"
              variant="danger"
              isPending={isPending}
              isDisabled={isPending || isSuccess}
            >
              <Ripple />
              {isIdle && "Send message"}
              {isPending && "Sending..."}
              {isError && "Failed to send message, click to retry"}
              {isSuccess && "Sent"}
              {isSuccess ? <Check /> : <SendHorizontal />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
