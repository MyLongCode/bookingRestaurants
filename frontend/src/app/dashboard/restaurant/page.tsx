import { redirect, RedirectType } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
