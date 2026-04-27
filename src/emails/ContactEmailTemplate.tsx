import { type ContactMessage } from "@/schemas/contact-message";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface Props {
  contactMessage?: ContactMessage;
  nodeEnv?: "development" | "production";
}

const ContactEmailTemplate = ({
  contactMessage = {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@gmail.com",
    subtitle: "Hello",
    message: "Let's rock 'n' roll",
  },
  nodeEnv = "development",
}: Props) => {
  const {
    firstName,
    lastName,
    email,
    subtitle,
    message: messageBody,
  } = contactMessage;
  const isDevelopment = nodeEnv === "development";
  const mailtoLink = `mailto:${email}?subject=Re: ${subtitle}`;

  return (
    <Html>
      <Head />
      <Preview>
        {isDevelopment ? "DEVELOPMENT: " : ""}You have received a message from{" "}
        {firstName} {lastName}
      </Preview>
      <Tailwind
        config={{
          theme: {
            // Most email clients do not support REM units, so we use pixels instead
            // https://react.email/docs/components/tailwind#tailwind-configuration-with-px-instead-of-rem
            fontSize: {
              xs: ["12px", { lineHeight: "16px" }],
              sm: ["14px", { lineHeight: "20px" }],
              base: ["16px", { lineHeight: "24px" }],
              lg: ["18px", { lineHeight: "28px" }],
              xl: ["20px", { lineHeight: "28px" }],
              "2xl": ["24px", { lineHeight: "32px" }],
              "3xl": ["30px", { lineHeight: "36px" }],
              "4xl": ["36px", { lineHeight: "36px" }],
              "5xl": ["48px", { lineHeight: "1" }],
              "6xl": ["60px", { lineHeight: "1" }],
              "7xl": ["72px", { lineHeight: "1" }],
              "8xl": ["96px", { lineHeight: "1" }],
              "9xl": ["144px", { lineHeight: "1" }],
            },
            spacing: {
              px: "1px",
              0: "0",
              0.5: "2px",
              1: "4px",
              1.5: "6px",
              2: "8px",
              2.5: "10px",
              3: "12px",
              3.5: "14px",
              4: "16px",
              5: "20px",
              6: "24px",
              7: "28px",
              8: "32px",
              9: "36px",
              10: "40px",
              11: "44px",
              12: "48px",
              14: "56px",
              16: "64px",
              20: "80px",
              24: "96px",
              28: "112px",
              32: "128px",
              36: "144px",
              40: "160px",
              44: "176px",
              48: "192px",
              52: "208px",
              56: "224px",
              60: "240px",
              64: "256px",
              72: "288px",
              80: "320px",
              96: "384px",
            },
            // NextUI colours
            extend: {
              colors: {
                white: "#FFFFFF",
                black: "#000000",
                blue: {
                  50: "#e6f1fe",
                  100: "#cce3fd",
                  200: "#99c7fb",
                  300: "#66aaf9",
                  400: "#338ef7",
                  500: "#006FEE",
                  600: "#005bc4",
                  700: "#004493",
                  800: "#002e62",
                  900: "#001731",
                },
              },
            },
          },
        }}
      >
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-10 w-96 rounded border border-solid border-[#eaeaea] p-4">
            <Section>
              <Heading as="h1">You have received a message</Heading>
            </Section>
            <Section>
              <Text>Hello Max,</Text>
              <Text>
                You have received a message from{" "}
                <strong>
                  {firstName} {lastName}
                </strong>{" "}
                (<Link href={mailtoLink}>{email}</Link>).
              </Text>
              {isDevelopment ? (
                <Text>
                  This was sent in a <strong>Development</strong> environment.
                </Text>
              ) : null}
              <Heading as="h3">{subtitle}</Heading>
              <Text>{messageBody}</Text>
            </Section>
            <Section className="text-center">
              <Button
                className="min-w-20 rounded-xl bg-[#f31260] px-4 py-2 text-sm font-normal text-white subpixel-antialiased shadow-lg shadow-danger/40 outline-none"
                href={mailtoLink}
              >
                Reply
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmailTemplate;
