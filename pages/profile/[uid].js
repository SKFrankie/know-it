import { useRouter } from "next/router";
import ProfileContainer from "../../features/profile/Profile";

const ProfileWithId = () => {
  const router = useRouter();
  const { uid } = router.query;

  return <ProfileContainer userId={uid} px="1rem" />;
};

export default ProfileWithId;
