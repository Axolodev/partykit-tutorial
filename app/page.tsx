import { Poll } from "@/app/types";
import Balloon from "@/components/Balloon";
import PollMaker from "@/components/PollMaker";
import { redirect } from "next/navigation";
import { PARTYKIT_URL } from "./env";

const randomId = () => Math.random().toString(36).substring(2, 10);

export default function Home() {
  async function createPoll(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString() ?? "Anonymous poll";
    const options: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("option-") && value.toString().trim().length > 0) {
        options.push(value.toString());
      }
    }

    const id = randomId();
    const poll: Poll = {
      title,
      options,
    };

    await fetch(`${PARTYKIT_URL}/party/${id}`, {
      method: "POST",
      body: JSON.stringify(poll),
      headers: {
        "Content-Type": "application/json",
      },
    });

    redirect(`/${id}`);
  }

  console.log({ PARTYKIT_URL });

  return (
    <>
      <form action={createPoll}>
        <div className="flex flex-col space-y-6">
          <PollMaker />
        </div>
      </form>
      <Balloon />
    </>
  );
}
