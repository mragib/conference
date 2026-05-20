import ReviewerHeader from "@/components/ReviewerHeader";
import { getProfile } from "@/lib/data-service";
import ProfileForm from "./ProfileForm";

const ProfilePage = async () => {
  const profile = await getProfile();

  const email = profile.statusCode === 404 ? profile.user.email : profile.email;

  const userName = profile.statusCode === 404 ? profile.user.name : null;

  return (
    <div className="overflow-y-hidden">
      <ReviewerHeader menuName="Profile" menuText="Manage My Profile" />
      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
        <ProfileForm
          userEmail={email}
          user={profile.data}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
