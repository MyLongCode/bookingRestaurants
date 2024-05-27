const authorizedRoutes = ["/profile"];

export const RoutesAccess = {
  owner: [
    ...authorizedRoutes,
    "/dashboard/bookings",
    "/dashboard/restaurant",
    "/dashboard/employees",
    "/favorite",
  ],
  employee: [
    ...authorizedRoutes,
    "/dashboard/restaurant",
    "/dashboard/bookings",
    "/favorite",
  ],
  user: [...authorizedRoutes, "/favorite"],
};
