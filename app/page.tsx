import Link from "next/link";
import { EmailComponent } from "./emailComponent";

export default function Home() {
  return (
    <div className="p-5 md:p-15 flex flex-row justify-center min-h-screen">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[600px]">
          <div className="flex flex-col justify-center bg-[#1A1A5D] space-y-5 h-full rounded-t-2xl md:rounded-t-none md:rounded-l-2xl p-5">
            <div className="text-3xl md:pb-5 font-semibold text-div-foreground flex items-center gap-3 text-white">
              Email Messaging System
            </div>
            <div className="text-white space-y-5">
              <ul>
                <div className="font-medium pb-2">Enable 2-Step Verification</div>
                <li className="text-sm pb-1">- Go to <Link className="underline" href="https://myaccount.google.com/security" target="_blank">Google Account Security</Link></li>
                <li className="text-sm pb-1">- {`Find "2-Step Verification" and turn it on.`}</li>
                <li className="text-sm pb-1">- Complete the verification (phone, etc.)</li>
                <li className="text-sm pb-1">- {`Without 2FA, App Passwords won't work.`}</li>
              </ul>
              <ul>
                <div className="font-medium pb-2">Generate App Password</div>
                <li className="text-sm pb-1">- Go to <Link className="underline" href="https://myaccount.google.com/apppasswords" target="_blank">Google App Password</Link></li>
                <li className="text-sm pb-1">- Under Select app, choose Other (Custom name) → e.g., Website SMTP.</li>
                <li className="text-sm pb-1">- Click Generate</li>
                <li className="text-sm pb-1">- Copy the 16-character password (this is your SMTP passkey)</li>
                <li className="text-sm pb-1">- Treat it like a secret. {`Don't`} share it.</li>
              </ul>
            </div>
          </div>
          <EmailComponent />
        </div>
      </div>
    </div>
  );
}