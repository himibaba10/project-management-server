import { Resend } from "resend";
import config from "../config";

const sendMail = async (email: string, subject: string, body: string) => {
  const resend = new Resend(config.RESEND_API_KEY);

  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "himibaba10@gmail.com",
    subject,
    html: body,
  });

  console.log("Mail sent:", response);
};

export default sendMail;
