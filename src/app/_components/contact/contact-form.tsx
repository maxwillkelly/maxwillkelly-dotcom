"use client";

import { Button, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, SendHorizontal } from "lucide-react";
import { Ripple } from "m3-ripple";
import { startTransition, useActionState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import "m3-ripple/ripple.css";
import { sendContactEmail } from "@/app/actions/send-contact-email";
import { ControllerTextArea } from "@/components/ui/controller-text-area";
import { ControllerTextField } from "@/components/ui/controller-text-field";
import {
  type ContactMessage,
  contactMessageSchema,
} from "@/schemas/contact-message";

type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const getSubmitButtonContent = (
  state: ContactFormState,
  isPending: boolean,
) => {
  if (isPending) {
    return { label: "Sending...", icon: <Spinner color="current" size="sm" /> };
  }

  if (state.status === "success") {
    return { label: "Sent", icon: <Check /> };
  }

  if (state.status === "error") {
    return { label: state.message, icon: <SendHorizontal /> };
  }

  return { label: "Send message", icon: <SendHorizontal /> };
};

export const ContactForm = () => {
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

  const [state, action, isPending] = useActionState<
    ContactFormState,
    ContactMessage
  >(
    async (_prev, data) => {
      const result = await sendContactEmail(data);

      if (result.success) {
        reset();
        return { status: "success" };
      }

      return { status: "error", message: result.message };
    },
    { status: "idle" },
  );

  const onSubmit: SubmitHandler<ContactMessage> = (data) => {
    startTransition(() => action(data));
  };

  const isSuccess = state.status === "success" && !isPending;
  const submitButtonContent = getSubmitButtonContent(state, isPending);

  return (
    <form
      className="flex flex-col flex-wrap gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-6 md:flex md:gap-0">
        <ControllerTextField
          control={control}
          name="firstName"
          label="First Name"
          placeholder="John"
          className="px-3 md:w-1/2"
        />
        <ControllerTextField
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Smith"
          className="px-3 md:w-1/2"
        />
      </div>
      <div className="grid gap-6 md:flex md:gap-0">
        <ControllerTextField
          control={control}
          name="email"
          label="Email"
          placeholder="john.smith@email.com"
          type="email"
          className="px-3 md:w-1/2"
        />
        <ControllerTextField
          control={control}
          name="subtitle"
          label="Subtitle"
          placeholder="Hello"
          className="px-3 md:w-1/2"
        />
      </div>
      <ControllerTextArea
        control={control}
        name="message"
        label="Message"
        placeholder="Let's rock 'n' roll"
        className="px-3"
      />
      <div className="flex flex-row-reverse">
        <Button
          className="w-full"
          type="submit"
          variant="primary"
          isPending={isPending}
          isDisabled={isPending || isSuccess}
        >
          <Ripple />
          {submitButtonContent.label}
          {submitButtonContent.icon}
        </Button>
      </div>
    </form>
  );
};
