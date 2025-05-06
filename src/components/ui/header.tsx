import { auth } from "~/server/auth";
import { Button } from "./button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";

export const Header = async () => {
  const session = await auth();

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Courses",
      href: "/courses",
      description: "",
    },
  ];

  return (
    <header className="bg-background fixed top-0 left-0 z-40 w-full border-b">
      <div className="relative container mx-auto flex min-h-14 flex-row items-center gap-4 lg:grid lg:grid-cols-3">
        <div className="flex-row items-center justify-start gap-4 lg:flex">
          <NavigationMenu className="flex items-start justify-start">
            <NavigationMenuList className="flex flex-row justify-start gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <>
                    <NavigationMenuLink href={item.href}>
                      <Button className="cursor-pointer" variant="ghost">
                        {item.title}
                      </Button>
                    </NavigationMenuLink>
                  </>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <p className="font-semibold">Public Notes</p>
        </div>
        <div className="flex w-full justify-end gap-4">
          <Button variant="ghost" className="cursor-pointer md:inline">
            My Notes
          </Button>
          <div className="hidden border-r md:inline"></div>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  {session.user.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarFallback>
                      {session.user.name?.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/admin">
                  <DropdownMenuItem className="cursor-pointer">
                    Admin
                  </DropdownMenuItem>
                </Link>
                <Link href="/api/auth/signout">
                  <DropdownMenuItem className="cursor-pointer">
                    Log Out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/api/auth/signin">
              <Button className="cursor-pointer">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
