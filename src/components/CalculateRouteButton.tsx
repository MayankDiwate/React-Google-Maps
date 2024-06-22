interface CalculateRouteButtonProps {
    inputOrigin: string;
    inputDestination: string;
    calculateRoute: () => void;
}

const CalculateRouteButton: React.FC<CalculateRouteButtonProps> = ({ inputOrigin, inputDestination, calculateRoute }) => {
  return (
    <button
      disabled={!inputOrigin && !inputDestination}
      onClick={calculateRoute}
      className={`w-full rounded-full ${
        !inputOrigin && !inputDestination ? "bg-gray-400" : "bg-blue-800"
      } text-white p-2`}
    >
      Calculate
    </button>
  );
};

export default CalculateRouteButton;
