
import { ImageResponse } from "next/og";

/* =========================================
   PHASE 7C — OPEN GRAPH IMAGE
========================================= */

export const alt =
  "Salman Jahan Rafi — AI, Data Analytics and QA Engineering Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          padding: "52px 66px",

          background: "#171715",
          color: "#f7f5ef",

          fontFamily: "Arial, sans-serif",

          position: "relative",
        }}
      >
        {/* TOP LINE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: "100%",

            borderBottom:
              "1px solid #55544c",

            paddingBottom: "22px",
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            SR®
          </span>

          <span
            style={{
              fontSize: 16,
              letterSpacing: 2.5,
              color: "#bdbab0",
            }}
          >
            INDEPENDENT TECHNOLOGY PORTFOLIO
          </span>
        </div>

        {/* MAIN TITLE */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",

              fontSize: 116,
              fontWeight: 900,

              letterSpacing: -7,
              lineHeight: 1.02,
            }}
          >
            SALMAN
          </div>

          <div
            style={{
              display: "flex",

              fontSize: 116,
              fontWeight: 900,

              letterSpacing: -7,
              lineHeight: 1.02,
            }}
          >
            JAHAN
          </div>

          <div
            style={{
              display: "flex",

              fontSize: 116,
              fontWeight: 900,

              letterSpacing: -7,
              lineHeight: 1.02,

              color: "#f5d547",
            }}
          >
            RAFI.
          </div>
        </div>

        {/* BOTTOM LINE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: "100%",

            borderTop:
              "1px solid #55544c",

            paddingTop: "20px",

            fontSize: 16,
            letterSpacing: 1.5,
          }}
        >
          <span>
            AI / ML · DATA ANALYTICS · QA ENGINEERING
          </span>

          <span
            style={{
              color: "#f5d547",
            }}
          >
            DHAKA / BANGLADESH
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
