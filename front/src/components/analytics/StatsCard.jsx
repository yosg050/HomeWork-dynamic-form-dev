import { Card, CardContent, Typography, Box } from "@mui/material";

export function StatsCard({ title, value, subtitle, icon, color = "primary" }) {
  return (
    <Card
      sx={{
        height: "100%",
        flex: 1,
        minWidth: "200px",
      }}
      role="region"
      aria-label={`${title}: ${value}`}
    >
      <CardContent sx={{ textAlign: "center", p: 2 }}>
        {icon && (
          <Box
            color={`${color}.main`}
            sx={{ fontSize: 32, mb: 1 }}
            aria-hidden="true"
          >
            {icon}
          </Box>
        )}

        <Typography color="textSecondary" gutterBottom variant="body2">
          {title}
        </Typography>

        <Typography variant="h5" component="div" color={color} sx={{ mb: 1 }}>
          {value}
        </Typography>

        {subtitle && (
          <Typography color="textSecondary" variant="caption">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
