import { getProfile } from "@/lib/data-service";
import ProfileForm from "./ProfileForm";

const ProfilePage = async () => {
  const profile = await getProfile();
  return (
    <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
      <ProfileForm userEmail={profile.user.email} />
    </div>
  );
};

export default ProfilePage;
