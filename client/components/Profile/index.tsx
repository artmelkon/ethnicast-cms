import classes from "./index.module.scss";
// import ProfileForm from "./profile-form";
import ChangePassword from "./change-password";


const UserProfile = () => {
  async function changPasswordHandler(passwordData: PatchInput) {
    const result = await fetch(`/api/users/reset-password`, {
      method: "POST",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("the resule ", result);

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
