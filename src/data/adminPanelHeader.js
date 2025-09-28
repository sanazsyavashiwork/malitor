import { ROUTES } from "@/constValues/Routes";
import { faSitemap } from "@fortawesome/free-regular-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyRound } from "lucide-react";
import { Users2 } from "lucide-react";
import { User2 } from "lucide-react";
import { UserPlus2 } from "lucide-react";
import { UserPlus } from "lucide-react";
import { Children } from "react";
import { Package } from "react-feather";
import { Eye } from "react-feather";
import { Users } from "react-feather";
import { Key } from "react-feather";
import { Book } from "react-feather";
import { Link } from "react-feather";
import { Edit } from "react-feather";
import { Plus } from "react-feather";
import { PenTool } from "react-feather";
import { File } from "react-feather";
import { Monitor } from "react-feather";
import {
  Activity,
  BarChart,
  BarChart2,
  GitBranch,
  Home,
  List,
  LogOut,
  User,
} from "react-feather";

export const adminPanelHeader = {
  headerItems: [
    {
      key: "profile",
      title: "اطلاعات کاربر",
      icon: <User size={16} />,
      link: ROUTES.PRIVATE.MY_PROFILE,
    },
    {
      key: "changePassword",
      title: "تغییر رمز عبور",
      icon: <KeyRound size={16} />,
      link: ROUTES.PRIVATE.CHANGE_PASSWORD,
    },
    {
      key: "logout",
      title: "خروج",
      icon: <LogOut size={16} />,
      link: "#",
    },
  ],

  menuItemsSidebar: [
    // {
    //   key: "dashboard",
    //   title: "پیشخوان",
    //   path: "#",
    //   icon: <Home size={16} />,
    //   shouldHaveMovadi: false,
    // },
    {
      key: "dashboard",
      title: "میز کار",
      path: ROUTES.PRIVATE.DASHBOARD,
      icon: <Monitor size={16} />,
      shouldHaveMovadi: false,
    },
    {
      key: "userInformation",
      title: "اطلاعات کاربر",
      path: ROUTES.PRIVATE.MY_PROFILE,
      icon: <User size={16} />,
      shouldHaveMovadi: false,
    },
    // {
    //   key: "plus",
    //   title: "ثبت صورت حساب",
    //   path: ROUTES.PRIVATE.INVOICE_ADD,
    //   icon: <Plus size={16} />,
    //   shouldHaveMovadi: true,
    // },
    // {
    //   key: "File",
    //   title: "ثبت صورت حساب اکسل",
    //   path: "#",
    //   icon: <File size={16} />,
    //   shouldHaveMovadi: true,
    // },

    {
      key: "UserMo",
      title: "مودیان",
      path: ROUTES.PRIVATE.MOVADIAN_LIST,
      icon: <Users size={16} />,
    },
    {
      key: "customer",
      title: "مشتریان",
      path: ROUTES.PRIVATE.CUSTOMERS_LIST,
      icon: <Users2 size={16} />,
      shouldHaveMovadi: true,
    },
    {
      key: "items",
      title: "شناسه کالا و خدمات",
      path: ROUTES.PRIVATE.ITEMS_LIST,
      icon: <Package size={16} />,
      shouldHaveMovadi: true,
    },
    {
      key: "List",
      title: "لیست صورت حساب ها",
      path: ROUTES.PRIVATE.INVOICE,
      icon: <List size={16} />,
      shouldHaveMovadi: true,
    },
    // {
    //   key: "Link",
    //   title: "لینک های مفید",
    //   path: "#",
    //   icon: <Link size={16} />,
    //   subSet: [
    //     {
    //       key: "Key",
    //       title: "csrدریافت کلید ها و",
    //       path: "#",
    //       // icon: <Key size={16} />,
    //     },
    //   ],
    // },
  ],
};
