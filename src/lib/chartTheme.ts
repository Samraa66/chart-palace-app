// Shared chart tooltip style — uses CSS variables for theme compatibility
export const chartTooltipStyle: React.CSSProperties = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--foreground))",
  fontSize: "13px",
};

export const chartGridColor = "hsl(var(--border))";
export const chartTickStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };
