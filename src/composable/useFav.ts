import { FavContext } from "@/context/FavContext";
import { MouseEvent, useContext } from "react";
import { useCookies } from "react-cookie";

export default function useFav() {
  const [cookies, setCookie, removeCookie] = useCookies(["fav_products"]);
  const [favs] = useContext(FavContext);

  const addFav = (e: MouseEvent, id: string) => {
    e.preventDefault();
    setCookie("fav_products", JSON.stringify([...favs, id]), { path: "/" });
  };

  const removeFav = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const newFavs = favs.filter((fav) => fav !== id);
    setCookie("fav_products", JSON.stringify(newFavs), { path: "/" });
  };
  return { addFav, removeFav };
}
