import { MapPin } from "lucide-react";
import { FaRegCircleDot } from "react-icons/fa6";
import { Place } from "../App";
import SearchTile from "./SearchTile";

interface OriginDestinationFieldsProps {
  inputLocation: string;
  label: string;
  place: string;
  places: Place[];
  setLocation: React.Dispatch<React.SetStateAction<L.LatLng>>;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  setInputLocation: React.Dispatch<React.SetStateAction<string>>;
}

const OriginDestinationFields: React.FC<OriginDestinationFieldsProps> = ({
  inputLocation,
  setInputLocation,
  setLocation,
  setPlace,
  label,
  place,
  places,
  setPlaces,
}) => {
  return (
    <div className="flex flex-col relative">
      <label htmlFor={label}>{label}</label>

      <div className="relative">
        <input
          type="text"
          value={inputLocation}
          onChange={(e) => {
            setInputLocation(e.target.value);
            setPlace(e.target.value);
          }}
          placeholder={label}
          className="p-2 pl-8 border rounded-md border-gray-400 w-full"
        />
        {label === "Destination" ? (
          <MapPin size={16} className="absolute left-2 top-3.5" />
        ) : (
          <FaRegCircleDot color="green" className="absolute left-2 top-3.5" />
        )}
      </div>
      {inputLocation && place === inputLocation && (
        <div
          className={`w-full bg-white border rounded-md z-50 top-16 absolute`}
        >
          {places.map((item, i) => (
            <SearchTile
              item={item}
              key={i}
              setLocation={setLocation}
              setInputLocation={setInputLocation}
              setPlace={setPlace}
              setPlaces={setPlaces}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OriginDestinationFields;
