"use client";

import NavBar from "@/components/common/navbar";
import UserAvatar from "@/components/common/user-avatar";
import ProfileInfo from "@/components/profile-page/profile-info";
import ProfileMenu from "@/components/profile-page/profile-menu";
import ProfileSignOut from "@/components/profile-page/profile-signout";

export default function ProfileContent() {
  return (
    <>
      <UserAvatar className="mx-auto size-20" />
      <ProfileInfo />
      <ProfileMenu />
      <ProfileSignOut />
      <NavBar />
    </>
  );
}
