import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
// import "lrm-graphhopper";

import React, { ChangeEvent, createRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CalculateRouteButton from "./components/CalculateRouteButton";
import DistanceAndDurationTile from "./components/DistanceAndDurationTile";
import Header from "./components/Header";
import MapComponent from "./components/MapComponents";
import OriginDestinationFields from "./components/OriginDestinationFields";
import StopsFields from "./components/StopsFields";

export interface Place {
  name: string;
  place_id: number;
  display_name: string;
  lat: number;
  lon: number;
}

const App: React.FC = () => {
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<{ hours: number; minutes: number }>({
    hours: 1,
    minutes: 1,
  });
  const [origin, setOrigin] = useState<L.LatLng>(
    new L.LatLng(19.228825, 72.987609)
  );
  const [destination, setDestination] = useState<L.LatLng>(
    new L.LatLng(-25.0270548, -67.4982328)
  );
  const [stops, setStops] = useState<L.LatLng[]>([]);
  const mapRef = createRef<L.Map | null>();

  const [inputOrigin, setInputOrigin] = useState<string>("");
  const [inputDestination, setInputDestination] = useState<string>("");
  const [inputStops, setInputStops] = useState<string[]>([]);

  const [places, setPlaces] = useState<Place[]>([]);
  const [place, setPlace] = useState<string>("");

  const [oldRoute, setOldRoute] = useState<L.Routing.Control | null>(null);

  const handleInputChange = ({
    index,
    event,
  }: {
    index: number;
    event: ChangeEvent<HTMLInputElement>;
  }) => {
    const values = [...inputStops];
    values[index] = event.target.value;
    setPlace(event.target.value);
    setInputStops(values);
  };

  const calculateRoute = async () => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (inputOrigin === "" || inputDestination === "") return;

    if (oldRoute != null) {
      map.removeControl(oldRoute);
    }

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(origin), ...stops, L.latLng(destination)],
      routeWhileDragging: true,
      showAlternatives: true,
      show: false,
      fitSelectedRoutes: true,
      waypointMode: "snap",
      altLineOptions: {
        styles: [
          {
            color: "gray",
            opacity: 0.6,
            weight: 4,
            stroke: true,
          },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 50,
      },
      addWaypoints: false,
    });

    routingControl
      .addTo(map)
      .on("routeselected", (e) => {
        const routes = e.route["summary"];
        const totalDistance = routes.totalDistance;
        const time = routes.totalTime / 3600;
        const wholeHours = Math.floor(routes.totalTime / 3600);
        const remainingMinutes = Math.ceil((time - wholeHours) * 60);
        setDuration({
          hours: wholeHours,
          minutes: remainingMinutes,
        });
        setDistance(Math.round(totalDistance / 1000));
      })
      .on("routingerror", (e) => {
        toast.error(e.message);
      });

    setOldRoute(routingControl);

    toast.success("Route calculated successfully");

    return () => {
      map.removeControl(routingControl);
    };
  };

  useEffect(() => {
    L.Routing.control({
      waypoints: [L.latLng(origin), ...stops, L.latLng(destination)],
    }).on("routeselected", (e) => {
      const routes = e.route["summary"];
      const totalDistance = routes.totalDistance;
      const time = routes.totalTime;
      const wholeHours = Math.floor(routes.totalTime / 3600);
      const remainingMinutes = Math.ceil((time - wholeHours) * 60);
      setDuration({
        hours: wholeHours,
        minutes: remainingMinutes,
      });
      setDistance(Math.round(totalDistance / 1000));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, distance]);

  useEffect(() => {
    const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";
    const params = {
      format: "json",
      q: place,
    };

    const queryString = new URLSearchParams(params).toString();

    fetch(`${NOMINATIM_BASE_URL}?${queryString}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setPlaces(result);
      })
      .catch((error) => toast.error(error.message));
  }, [place]);

  return (
    <div>
      <Header />

      {/* Heading */}
      <div
        className={`text-blue-500 font-semibold md:h-4 ${
          distance && duration ? "h-[430px]" : "h-[270px]"
        } text-center pt-4`}
      >
        Let's calculate{" "}
        <span className="text-blue-700 font-bold">distance</span> from Google
        maps
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col-reverse md:items-center md:flex-row gap-4 h-[550px] w-full">
        <div className="flex flex-col md:mt-12 gap-4 md:w-2/3 w-full h-[500px]">
          {/* Origin Serach Box */}
          <OriginDestinationFields
            inputLocation={inputOrigin}
            setInputLocation={setInputOrigin}
            setLocation={setOrigin}
            setPlace={setPlace}
            label="Origin"
            place={place}
            places={places}
            setPlaces={setPlaces}
          />

          {/* Stops Search Boxes */}
          <StopsFields
            inputStops={inputStops}
            handleInputChange={handleInputChange}
            stops={stops}
            places={places}
            place={place}
            setStops={setStops}
            setPlace={setPlace}
            setPlaces={setPlaces}
            setInputStops={setInputStops}
          />

          {/* Destination Search Box */}
          <OriginDestinationFields
            inputLocation={inputDestination}
            setInputLocation={setInputDestination}
            setLocation={setDestination}
            setPlace={setPlace}
            label="Destination"
            place={place}
            places={places}
            setPlaces={setPlaces}
          />
          <div className="hidden md:block mb-4">
            <DistanceAndDurationTile
              distance={distance}
              duration={duration}
              inputOrigin={inputOrigin}
              inputDestination={inputDestination}
            />
          </div>
          <div className="md:hidden block mb-2">
            <CalculateRouteButton
              inputOrigin={inputOrigin}
              inputDestination={inputDestination}
              calculateRoute={calculateRoute}
            />
          </div>
          {/* Distance and Duration Tile */}
          <div className="md:hidden block mb-4">
            <DistanceAndDurationTile
              distance={distance}
              duration={duration}
              inputOrigin={inputOrigin}
              inputDestination={inputDestination}
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="md:block hidden h-[500px] mt-40 w-60">
          <CalculateRouteButton
            inputOrigin={inputOrigin}
            inputDestination={inputDestination}
            calculateRoute={calculateRoute}
          />
        </div>

        <div
          style={{ height: "100%", width: "100%" }}
          className="h-[400px] w-full mt-20"
        >
          <MapComponent
            mapRef={mapRef}
            origin={origin}
            destination={destination}
            stops={stops}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
