import { redirect, RedirectType } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserService from "@/services/user/UserService";

const DashboardRestaurantPage = async () => {
  const session = await getServerSession(authOptions);

  if (session && !session.currentRestaurant && session.user) {
    const restaurant = await UserService.getRestaurant(session.user.id);

    session.currentRestaurant = restaurant.id;
  }

  if (!session?.currentRestaurant) {
    redirect("/restaurants", RedirectType.replace);
  }

  redirect(
    `/restaurants/restaurant/${session.currentRestaurant}`,
    RedirectType.replace,
  );
};

export default DashboardRestaurantPage;
