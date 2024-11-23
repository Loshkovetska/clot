import FavContent from "@/components/fav-page";
import ProfileWrapper from "@/components/profile-page/profile-wrapper";

export default async function Page() {
  return (
    <ProfileWrapper title="Wishlist">
      <FavContent />
    </ProfileWrapper>
  );
}
