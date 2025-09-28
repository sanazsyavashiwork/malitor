import { NextResponse } from "next/server";
import { TOKEN_KEYS } from "./constValues/tokenKeys";
import { ROUTES } from "./constValues/Routes";

// Helper function to extract path from full URL
const getPathFromRoute = (route) => {
  try {
    const url = new URL(route);
    return url.pathname;
  } catch {
    // اگر route یک path ساده بود (مثل /user)
    return route;
  }
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Add cache control headers to prevent refetches for navigation
  const response = NextResponse.next();

  // Only apply these headers for navigation routes (not API routes or static assets)
  if (!pathname.startsWith("/api/") && !pathname.includes("._next")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  const accessToken = request.cookies.get(TOKEN_KEYS.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(TOKEN_KEYS.REFRESH_TOKEN)?.value;
  const isLoggedIn = !!(accessToken && refreshToken);

  // Extract paths from routes for comparison
  const privateRoutePaths = Object.values(ROUTES.PRIVATE).map(getPathFromRoute);
  const authRoutePaths = Object.values(ROUTES.AUTH).map(getPathFromRoute);
  const adminRoutePaths = Object.values(ROUTES.ADMIN).map(getPathFromRoute);

  const isPrivateRoute = privateRoutePaths.some((route) =>
    pathname.includes(route)
  );
  const isAuthRoute = authRoutePaths.some((route) => pathname.includes(route));
  const isAdminRoute = adminRoutePaths.some((route) =>
    pathname.includes(route)
  );

  console.log("Current pathname:", pathname);
  console.log("Admin routes:", adminRoutePaths);
  console.log("Is admin route:", isAdminRoute);

  // Redirect logged-in users away from auth routes
  if (isLoggedIn && isAuthRoute) {
    const dashboardPath = getPathFromRoute(ROUTES.PRIVATE.DASHBOARD);
    const dashboardUrl = new URL(dashboardPath, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow public routes
  if (!isPrivateRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to signin
  if (!isLoggedIn) {
    return redirectToSignin(request, pathname);
  }

  // Check admin role for admin routes
  if (isAdminRoute) {
    const userRole = request.cookies.get(TOKEN_KEYS.ROLE)?.value;
    console.log("User role:", userRole);

    if (!userRole || (userRole !== "admin" && userRole !== "ADMIN")) {
      // User is not admin, redirect to dashboard
      const dashboardPath = getPathFromRoute(ROUTES.PRIVATE.DASHBOARD);
      const dashboardUrl = new URL(dashboardPath, request.url);
      console.log("Redirecting non-admin user to dashboard");
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

function redirectToSignin(request, pathname) {
  const signinPath = getPathFromRoute(ROUTES.AUTH.SIGN_IN);
  const signinUrl = new URL(signinPath, request.url);
  return NextResponse.redirect(signinUrl);
}
