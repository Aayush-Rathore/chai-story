import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Logo from "@/assets/Logo.png";
import { Menu } from "lucide-react";
import { NavbarLinks } from "@/constantsVariables/fixedVariables";
import useStore from "@/store/zustand.store";
import DialogBox from "./Dialog";
import Dropdown from "./Dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useStore((e: any) => e.user);
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 justify-between sticky top-0 bg-background shadow-xl z-10 mb-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-28" />
            <span className="sr-only">Company Logo</span>
          </Link>
          <div className="grid gap-2 py-6">
            {NavbarLinks.map((link, index) => {
              return (
                <Link
                  to={link.linkTo}
                  className="flex w-full items-center py-2 text-lg font-semibold hover:text-primary"
                  key={index}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
      <Link to="#" className="mr-6 hidden lg:flex">
        <img src={Logo} alt="Logo" className="w-28" />
        <span className="sr-only">Company Logo</span>
      </Link>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {NavbarLinks.map((link, index) => {
            return (
              <NavigationMenuLink asChild key={index}>
                <Link
                  to={link.linkTo}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                >
                  {link.name}
                </Link>
              </NavigationMenuLink>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      {!user?.token ? (
        <DialogBox>
          <Button>Login</Button>
        </DialogBox>
      ) : (
        <Dropdown username={user.username}>
          <Avatar>
            <AvatarImage src={user.img} alt="User Avatar" />
            <AvatarFallback>profile</AvatarFallback>
          </Avatar>
        </Dropdown>
      )}
      {/* <ModeToggle /> */}
    </header>
  );
};

export default Navbar;
