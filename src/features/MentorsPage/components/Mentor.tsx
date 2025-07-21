import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Skeleton,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Skill, Teacher } from "../../Auth/RegisterMentor/types";

interface MentorCardProps extends Partial<Teacher> {
  loading?: boolean;
  compact?: boolean;
}

export default function Mentor(props: MentorCardProps) {
  const {
    id,
    firstName,
    lastName,
    bio,
    skills,
    salary,
    profilePictureUrl,
    compact = false,
    loading = false,
  } = props;

  const bioShown = compact ? bio?.slice(0, 60) + "..." : bio;

  if (loading) {
    return (
      <Card sx={{ width: compact ? 220 : 300, p: 2 }}>
        <Skeleton variant="rectangular" height={compact ? 100 : 160} />
        <CardContent>
          <Skeleton width="80%" />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      dir="rtl"
      sx={{
        maxWidth: compact ? 240 : 400,
        mx: "auto",
        borderRadius: 2,
        boxShadow: 3,
        p: 1,
      }}
    >
      <CardMedia
        component="img"
        height={compact ? "120" : "200"}
        image={profilePictureUrl || "/avatar.png"}
        alt="Mentor Image"
        sx={{ borderRadius: 2 }}
      />
      <CardContent>
        <Typography variant={compact ? "h6" : "h5"} component="div" fontWeight="bold">
          {firstName} {lastName}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {bioShown}
        </Typography>

        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {skills?.map((skill: Skill) => (
            <Chip
              key={skill.skillId}
              label={skill.skillName}
              size="small"
              sx={{ bgcolor: "blue.100", fontSize: "10px" }}
            />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, justifyContent: "space-between" }}>
        <Typography fontWeight="bold" variant="body2">
          ${salary}
          <Typography component="span" variant="caption" color="text.secondary">
            {" "}
            / شهر
          </Typography>
        </Typography>

        <Button
  component={Link}
  to={`/mentors/${id}`}
  variant="contained"
  size="small"
  sx={{
    fontSize: "11px",
    borderRadius: "8px",
    backgroundColor: "#1D4ED8", // blue-700
    color: "#ffffff",
    textTransform: "none",
    px: 2,
    py: 0.5,
    '&:hover': {
      backgroundColor: "#1E40AF", // blue-800
    },
  }}
>
  عرض الملف
</Button>

      </CardActions>
    </Card>
  );
}
