"use client";

import HeaderUser from "@/components/common/header/header-user";
import NavBar from "@/components/common/navbar";
import ProfileInfo from "@/components/profile-page/profile-info";
import ProfileMenu from "@/components/profile-page/profile-menu";
import ProfileSignOut from "@/components/profile-page/profile-signout";

export default function ProfileContent() {
  return (
    <>
      <HeaderUser className="mx-auto size-20" />
      <ProfileInfo />
      <ProfileMenu />
      <ProfileSignOut />
      <NavBar />
    </>
  );
}
