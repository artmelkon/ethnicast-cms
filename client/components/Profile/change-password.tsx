import { useRouter } from "next/router";

interface Function {
  changPasswordHandler: (data: string) => Promise<void>;
}

const ChangePassword: React.FC<Function> = ({ changPasswordHandler }) => {
  const router = useRouter();
  // console.log("session ", session?.user?.user.email);
  async function onSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("change password emai: ", email);
    const result = await fetch(
      `${process.env.CMS_URI}/api/users/forgot-password`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (result.ok) router.push("/auth/success");
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type="hidden"
        name="email"
        id="email"
        // value={session?.user?.user?.email}
      />
      <button>Click to request password change</button>
    </form>
  );
};

export default ChangePassword;
