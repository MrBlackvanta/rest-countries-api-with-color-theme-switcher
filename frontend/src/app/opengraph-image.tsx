import { ImageResponse } from "next/og";

export const alt = "Where in the world? Browse every country.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: 96,
          background: "hsl(207, 26%, 17%)",
          color: "hsl(0, 0%, 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
          Where in the world?
        </div>
        <div style={{ fontSize: 40, color: "hsl(0, 0%, 78%)" }}>
          Search, filter and explore every country.
        </div>
        <div
          style={{
            marginTop: 24,
            alignSelf: "flex-start",
            padding: "12px 32px",
            borderRadius: 8,
            background: "hsl(209, 23%, 22%)",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          Frontend Mentor challenge
        </div>
      </div>
    ),
    size,
  );
}
