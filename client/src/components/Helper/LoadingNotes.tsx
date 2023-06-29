import { Skeleton, Typography, Divider } from "@mui/material";

const LoadingNotes = () => {
  return (
    <div className="container mx-auto">
      <div className="pt-4 px-4">
        <Typography variant="h6" gutterBottom>
          Recent
        </Typography>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={180} />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={120} />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={220} />
        </div>
      </div>

      <Divider />

      <div className="pt-4 px-4">
        <Typography variant="h6" gutterBottom>
          My notes
        </Typography>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={180} />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={120} />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={220} />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={180} />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={120} />
        </div>
        <div className="flex items-center gap-2 py-2">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width={220} />
        </div>
      </div>
    </div>
  );
};

export default LoadingNotes;
