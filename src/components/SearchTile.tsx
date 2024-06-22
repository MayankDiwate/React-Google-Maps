import { Place } from "../App";
import L from "leaflet";

const SearchTile = ({
  item,
  setPlace,
  setInputLocation,
  setLocation,
  setPlaces,
}: {
  item: Place;
  setLocation: React.Dispatch<React.SetStateAction<L.LatLng>>;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  setInputLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <button
      key={item.place_id}
      onClick={() => {
        setLocation(L.latLng(item.lat, item.lon));
        setInputLocation(item.display_name);
        setPlace("");
        setPlaces([]);
      }}
      className="text-start w-full hover:bg-gray-100 flex items-center gap-2 pl-2 p-2"
    >
      <img src="./marker-icon.png" className="h-4" />
      {item.display_name}
    </button>
  );
};

export default SearchTile;
