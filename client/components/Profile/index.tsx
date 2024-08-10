import classes from "./index.module.scss";
import ChangePassword from "./change-password";

const UserProfile = () => {

  if (status === "loading") return <p>Loading...!</p>;

  async function changPasswordHandler(passwordData: any) {
    const result = await fetch(`/api/users/reset-password`, {
      method: "POST",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("profile resule ", result);

    const data = await result.json();
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ChangePassword onChangePassword={changPasswordHandler} />
    </section>
  );
};

export default UserProfile;
