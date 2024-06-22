interface DistanceAndDurationTileProps {
    inputOrigin: string;
    inputDestination: string;
    distance: number;
    duration: { hours: number; minutes: number };
}

const DistanceAndDurationTile: React.FC<DistanceAndDurationTileProps> = ({ inputOrigin, inputDestination, distance, duration }) => {
  return (
    <div>
      {inputOrigin && inputDestination && distance && (
        <div className="flex flex-col gap-2 border rounded-md">
          <div className="flex items-center justify-between text-lg font-semibold px-2 py-1">
            Distance
            <span className="font-bold text-xl text-blue-700">
              {distance} kms
            </span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold px-2 py-1">
            Expected Time Arrival
            <span className="font-bold text-xl text-blue-700">
              {duration.hours} hrs {duration.minutes} mins
            </span>
          </div>
          <div className="px-2 py-1 bg-slate-100 w-full">
            Distance between <span className="font-bold">{inputOrigin}</span>{" "}
            and <span className="font-bold">{inputDestination}</span> via the
            selected route is
            <span className="font-bold"> {distance} kms</span>.
          </div>
        </div>
      )}
    </div>
  );
};

export default DistanceAndDurationTile;
