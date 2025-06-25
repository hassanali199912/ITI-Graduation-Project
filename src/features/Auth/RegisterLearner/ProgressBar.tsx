import { LinearProgress } from "@mui/material";

interface Props {
  step: number;
}

const ProgressBar = ({ step }: Props) => {
  const progress = (step / 4) * 100;

  return (
    <div className="w-full bg-white shadow flex justify-between items-center p-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-black ml-4">GUIDOR</h1>
      <div className="flex-1 mx-4">
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 10,
            backgroundColor: "#f3f4f6",
            '& .MuiLinearProgress-bar': {
              backgroundColor: "#f59e0b",
            },
          }}
        />
      </div>

      <div className="flex flex-col gap-4 mr-4">
        {[1, 2, 3, 4].map((s) => (
          <span
            key={s}
            className={`w-3 h-3 rounded-full border ${
              step >= s ? "bg-yellow-500 border-yellow-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
