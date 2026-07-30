"use client";

import { useEffect } from "react";

const spriteSets: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

const OnekoCat = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion preference
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isReducedMotion) return;

    const nekoEl = document.createElement("div");
    let nekoPosX = 32;
    let nekoPosY = 32;

    let mousePosX = 32;
    let mousePosY = 32;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;

    // Try to load initial position from localStorage
    try {
      const storedNeko = JSON.parse(localStorage.getItem("oneko") || "null");
      if (storedNeko) {
        nekoPosX = storedNeko.nekoPosX ?? 32;
        nekoPosY = storedNeko.nekoPosY ?? 32;
        mousePosX = storedNeko.mousePosX ?? 32;
        mousePosY = storedNeko.mousePosY ?? 32;
      }
    } catch {
      // ignore storage errors
    }

    nekoEl.id = "oneko";
    nekoEl.setAttribute("aria-hidden", "true");
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = "99998"; // Right below custom cursor (99999)
    nekoEl.style.backgroundImage = `url('/oneko.gif')`;

    document.body.appendChild(nekoEl);

    const onMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const setSprite = (name: string, frame: number) => {
      const set = spriteSets[name];
      if (!set) return;
      const sprite = set[frame % set.length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    };

    const resetIdleAnimation = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const idle = () => {
      idleTime += 1;

      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
        idleAnimation =
          availableIdleAnimations[
            Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    };

    let rafId: number;
    let lastFrameTimestamp = 0;
    // Frame rate interval (80ms = ~12.5 FPS for a calm, gentle pace)
    const updateInterval = 80;

    const frame = () => {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // Gentle speed:
      // Base speed is 8px per tick when close, up to 18px per tick when far away
      const dynamicSpeed = Math.min(18, Math.max(8, distance * 0.04));

      if (distance < 24) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction || "idle", frameCount);

      nekoPosX -= (diffX / distance) * dynamicSpeed;
      nekoPosY -= (diffY / distance) * dynamicSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    const step = (timestamp: number) => {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > updateInterval) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    const onBeforeUnload = () => {
      try {
        localStorage.setItem(
          "oneko",
          JSON.stringify({
            nekoPosX,
            nekoPosY,
            mousePosX,
            mousePosY,
          })
        );
      } catch {
        // ignore storage errors
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (nekoEl.parentNode) {
        nekoEl.parentNode.removeChild(nekoEl);
      }
    };
  }, []);

  return null;
};

export default OnekoCat;
