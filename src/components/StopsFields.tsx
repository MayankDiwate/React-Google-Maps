import L from "leaflet";
import { CirclePlus, Trash2 } from "lucide-react";
import React, { ChangeEvent } from "react";
import { FaCircleDot } from "react-icons/fa6";
import { Place } from "../App";

interface StopsFieldsProps {
  inputStops: string[];
  handleInputChange: ({
    index,
    event,
  }: {
    index: number;
    event: ChangeEvent<HTMLInputElement>;
  }) => void;
  stops: L.LatLng[];
  places: Place[];
  place: string;
  setStops: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  setInputStops: React.Dispatch<React.SetStateAction<string[]>>;
}

const StopsFields: React.FC<StopsFieldsProps> = ({
  inputStops,
  handleInputChange,
  places,
  place,
  stops,
  setStops,
  setPlace,
  setPlaces,
  setInputStops,
}) => {
  return (
    <div>
      <label htmlFor="stops">Stops</label>
      <div className="flex flex-col gap-4">
        {inputStops.map((input, i) => (
          <div className="flex gap-2 relative" key={i}>
            <input
              type="text"
              key={i}
              value={input}
              placeholder="Stop"
              onChange={(e) => handleInputChange({ index: i, event: e })}
              className="p-2 border rounded-md pl-8 border-gray-400 w-full"
            />
            <FaCircleDot size={16} className="absolute left-2 top-3.5" />
            {input && place === input && (
              <div className="w-full bg-white border rounded-md z-50 top-10 absolute">
                {places.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setStops((prev) => [
                        ...prev,
                        L.latLng(item.lat, item.lon),
                      ]);
                      inputStops[i] = item.display_name;
                      setInputStops([...inputStops]);
                      setPlace("");
                      setPlaces([]);
                    }}
                    className="text-start w-full hover:bg-gray-100 flex items-center gap-2 pl-2 p-2"
                  >
                    <img src="./marker-icon.png" className="h-4" />
                    {item.display_name}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                setInputStops(inputStops.filter((_, index) => index !== i));
                setStops(stops.filter((_, index) => index !== i));
              }}
            >
              <Trash2 color="red" />
            </button>
          </div>
        ))}
      </div>
      {/* Add Stop Button */}
      <div className="flex justify-end">
        <button
          className="p-2 flex items-center gap-1"
          onClick={() => setInputStops([...inputStops, ""])}
        >
          <CirclePlus size={16} /> Add stop
        </button>
      </div>
    </div>
  );
};

export default StopsFields;
