'use client';

import { useState, useEffect, useRef } from "react";

const GAME_SETTINGS = {
  circleCount: 20,
  canvasSize: 600,
  backgroundColor: "#0A3161",
  canvasColor: "#FFFFFF",
  circleColor: "#B31942",
  minRadius: 25,
  maxRadius: 150,
};

interface Circle {
  x: number;
  y: number;
  radius: number;
}

export default function CenteredGame() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [currentCircle, setCurrentCircle] = useState<Circle | null>(null);
  const [score, setScore] = useState<number[]>([]);
  const [clicks, setClicks] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    generateCircles();
  }, []);

  const generateCircles = () => {
    const newCircles: Circle[] = Array.from({ length: GAME_SETTINGS.circleCount }, () => {
      const radius = Math.floor(Math.random() * (GAME_SETTINGS.maxRadius - GAME_SETTINGS.minRadius + 1)) + GAME_SETTINGS.minRadius;
      return {
        x: Math.random() * (GAME_SETTINGS.canvasSize - 2 * radius) + radius,
        y: Math.random() * (GAME_SETTINGS.canvasSize - 2 * radius) + radius,
        radius,
      };
    });
    setCircles(newCircles);
    setCurrentCircle(newCircles[0]);
    setScore([]);
    setClicks(0);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentCircle || clicks >= GAME_SETTINGS.circleCount) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const distance = Math.sqrt(
      Math.pow(clickX - currentCircle.x, 2) + Math.pow(clickY - currentCircle.y, 2)
    );

    let points = 0;
    if (distance <= currentCircle.radius) {
      points = Math.max(1, Math.round(100 * (1 - Math.pow(distance / currentCircle.radius, 1.5))));
    }

    const newScore = [...score, points];
    setScore(newScore);
    const totalScore = newScore.reduce((a, b) => a + b, 0);
    if (totalScore > highScore) setHighScore(totalScore);

    const nextIndex = clicks + 1;
    setClicks(nextIndex);
    if (nextIndex < GAME_SETTINGS.circleCount) {
      setCurrentCircle(circles[nextIndex]);
    } else {
      alert(`Game Over! Your total score: ${totalScore}`);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && currentCircle) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, GAME_SETTINGS.canvasSize, GAME_SETTINGS.canvasSize);
        ctx.fillStyle = GAME_SETTINGS.canvasColor;
        ctx.fillRect(0, 0, GAME_SETTINGS.canvasSize, GAME_SETTINGS.canvasSize);
        ctx.fillStyle = GAME_SETTINGS.circleColor;
        ctx.beginPath();
        ctx.arc(currentCircle.x, currentCircle.y, currentCircle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [currentCircle]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: GAME_SETTINGS.backgroundColor, height: "100vh", padding: "10px", flexDirection: "column" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "white" }}>Center·d</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ marginRight: "20px", textAlign: "center", color: "white" }}>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>High Score</h3>
          <p>{highScore}</p>
        </div>
        <canvas
          ref={canvasRef}
          id="gameCanvas"
          width={GAME_SETTINGS.canvasSize}
          height={GAME_SETTINGS.canvasSize}
          style={{ cursor: "crosshair", border: "5px solid #B31942", borderRadius: "5px", display: "block" }}
          onClick={handleCanvasClick}
        ></canvas>
        <div style={{ marginLeft: "20px", textAlign: "center", color: "white" }}>
          <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>Scores</h3>
          <ul style={{ paddingLeft: "20px", listStyle: "none", textAlign: "left" }}>
            {score.map((s, index) => (
              <li key={index}>Circle {index + 1}: {s}</li>
            ))}
          </ul>
          <p>Total Score: {score.reduce((a, b) => a + b, 0)}</p>
        </div>
      </div>
      <button onClick={generateCircles} style={{ marginTop: "20px", padding: "10px", fontSize: "16px", cursor: "pointer", background: "#B31942", borderRadius: "5px" }}>Play Again</button>
    </div>
  );
}
