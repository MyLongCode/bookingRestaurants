import { redirect, RedirectType } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Loader from "@/components/shared/loader/Loader";

const DashboardRestaurantPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.currentRestaurant) {
    redirect("/restaurants", RedirectType.replace);
  }

  redirect(
    `/restaurants/restaurant/${session.user.currentRestaurant}`,
    RedirectType.replace,
  );
};

export default DashboardRestaurantPage;
