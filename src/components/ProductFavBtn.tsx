import useFav from "@/composable/useFav";
import { FavContext } from "@/context/FavContext";
import Icons from "@heroicons/react/24/outline";
import { useContext, useMemo } from "react";

export default function ProductFavBtn({
  sideSizes,
  productId,
  absolute,
}: {
  sideSizes: number;
  productId: string;
  absolute: boolean;
}) {
  const { addFav } = useFav();
  const [favProducts] = useContext(FavContext);
  const isFav = useMemo(() => {
    if (favProducts?.length) {
      const fav = favProducts?.find((id: string) => id === productId);
      return fav === productId;
    }
    return false;
  }, [favProducts, productId]);

  return (
    <button
      onClick={(e) => addFav(e, productId)}
      style={{ width: sideSizes, height: sideSizes }}
      className={`${
        absolute ? "absolute z-10" : ""
      } flex justify-center items-center p-0 rounded-full hover:bg-slate-300 duration-300 bg-slate-100 bottom-2 right-2`}
    >
      <Icons.HeartIcon
        className={`${
          isFav ? " fill-red-800 stroke-red-800" : ""
        } w-3/5 h-3/5 duration-300`}
      />
    </button>
  );
}
