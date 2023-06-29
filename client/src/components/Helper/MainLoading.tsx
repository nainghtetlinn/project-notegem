import { LinearProgress } from "@mui/material";

const MainLoading = () => {
  return (
    <div className="fixed inset-0 z-50">
      <LinearProgress color="primary" />
    </div>
  );
};

export default MainLoading;
