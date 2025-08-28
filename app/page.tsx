import { EmailComponent } from "./emailComponent";

export default function Home() {
  return (
    <div className="p-5 md:p-20 flex flex-row justify-center">
      <div className="max-w-2xl">
        <EmailComponent />
      </div>
    </div>
  );
}
