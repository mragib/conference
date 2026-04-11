import { getProfile } from "@/lib/data-service";
import ProfileForm from "./ProfileForm";

const ProfilePage = async () => {
  const profile = await getProfile();

  const email = profile.statusCode === 404 ? profile.user.email : profile.email;

  return (
    <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
      <ProfileForm userEmail={email} user={profile.data} />
    </div>
  );
};

export default ProfilePage;
