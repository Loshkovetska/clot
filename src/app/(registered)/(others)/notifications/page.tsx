import Header from "@/components/common/header";
import NavBar from "@/components/common/navbar";
import NotificationsContent from "@/components/notifications";

export default function Page() {
  return (
    <>
      <Header title="Notifications" />
      <NotificationsContent />
      <NavBar />
    </>
  );
}
