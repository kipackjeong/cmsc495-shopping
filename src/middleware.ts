import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("middleware");
  // await session.save();
  // await session.destroy();

  // console.log("from middleware", { user });
}
export const config = {
  // excluding
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
