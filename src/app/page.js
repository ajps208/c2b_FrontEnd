import { UserDashboard } from "@/USER/dashboard/UserDashboard";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box  sx={{ width: "100%", height: "100%", }}>
      <UserDashboard/>
      
    </Box>
  );
}
