import React, { useState } from "react";
import styles from "/src/styles/PlayGround.module.css";
import Player from "./Player";
import Obstacle from "./Obstacle";
import Pokemon from "./Pokemon";

const PlayGround = () => {

  // Sets player initial position on playground
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 50 });

  // Sets obstacles on playground
  const [obstacles, setObstacles] = useState([
    { id: 1, type: "screen-border", x: 10, y: 0, width: 1400, height: 0 }, // TOP BORDER
    { id: 61, type: "screen-border", x: 360, y: 0, width: 1015, height: 30 },
    { id: 2, type: "screen-border", x: 0, y: 0, width: 0, height: 800 }, // LEFT BORDER
    { id: 3, type: "screen-border", x: 0, y: 675, width: 670, height: 0 }, // BOTTOM BORDER
    { id: 56, type: "screen-border", x: 760, y: 675, width: 120, height: 0 },
    { id: 57, type: "screen-border", x: 940, y: 675, width: 230, height: 0 },
    { id: 58, type: "screen-border", x: 1175, y: 695, width: 200, height: 0 },
    { id: 59, type: "screen-border", x: 880, y: 695, width: 70, height: 0 },
    { id: 60, type: "screen-border", x: 680, y: 695, width: 70, height: 0 },
    { id: 4, type: "screen-border", x: 1380, y: 0, width: 10, height: 800 }, // RIGHT BORDER
    { id: 5, type: "house-1-border", x: 55, y: 115, width: 20, height: 100 },
    { id: 6, type: "house-1-border", x: 55, y: -5, width: 20, height: 45 },
    { id: 7, type: "house-1-border", x: 290, y: 15, width: 20, height: 50 },
    { id: 8, type: "house-1-border", x: 290, y: 140, width: 20, height: 75 },
    { id: 9, type: "house-1-border", x: 75, y: 210, width: 25, height: 5 },
    { id: 10, type: "house-1-body", x: 110, y: 50, width: 145, height: 80 },
    { id: 11, type: "house-1-postbox", x: 110, y: 150, width: 15, height: 10 },
    { id: 12, type: "garden-1-border", x: 55, y: 280, width: 20, height: 265 },
    { id: 13, type: "garden-1-border", x: 290, y: 280, width: 20, height: 265 },
    { id: 14, type: "garden-1-border", x: 90, y: 545, width: 35, height: 0 },
    { id: 15, type: "garden-1-border", x: 90, y: 280, width: 35, height: 0 },
    { id: 16, type: "garden-1-border", x: 240, y: 545, width: 35, height: 0 },
    { id: 17, type: "garden-1-border", x: 240, y: 280, width: 35, height: 0 },
    { id: 18, type: "garden-1-fence", x: 150, y: 290, width: 5, height: 5 },
    { id: 19, type: "garden-1-fence", x: 210, y: 290, width: 5, height: 5 },
    { id: 20, type: "garden-1-fence", x: 210, y: 555, width: 5, height: 5 },
    { id: 21, type: "garden-1-fence", x: 150, y: 555, width: 5, height: 5 },
    { id: 22, type: "house-2-border", x: 370, y: 390, width: 20, height: 220 },
    { id: 23, type: "house-2-border", x: 655, y: 390, width: 20, height: 220 },
    { id: 24, type: "house-2-border", x: 410, y: 390, width: 55, height: 0 },
    { id: 25, type: "house-2-border", x: 410, y: 610, width: 30, height: 0 },
    { id: 26, type: "house-2-border", x: 525, y: 610, width: 120, height: 0 },
    { id: 27, type: "house-2-border", x: 525, y: 390, width: 120, height: 0 },
    { id: 28, type: "house-2-body", x: 420, y: 445, width: 150, height: 105 },
    { id: 29, type: "house-2-fence", x: 575, y: 470, width: 45, height: 60 },
    { id: 30, type: "house-3-border", x: 990, y: 390, width: 20, height: 205 },
    { id: 31, type: "house-3-border", x: 760, y: 390, width: 220, height: 0 },
    { id: 32, type: "house-3-border", x: 760, y: 590, width: 70, height: 0 },
    { id: 33, type: "house-3-border", x: 940, y: 590, width: 70, height: 0 },
    { id: 34, type: "house-3-border", x: 915, y: 600, width: 5, height: 5 },
    { id: 35, type: "house-3-border", x: 845, y: 600, width: 5, height: 5 },
    { id: 36, type: "house-3-body", x: 810, y: 445, width: 150, height: 85 },
    { id: 37, type: "garden-2-border", x: 580, y: 305, width: 95, height: 0 },
    { id: 38, type: "garden-2-border", x: 705, y: 305, width: 95, height: 0 },
    { id: 39, type: "garden-2-border", x: 575, y: 105, width: 20, height: 70 },
    { id: 40, type: "garden-2-border", x: 785, y: 105, width: 20, height: 70 },
    { id: 41, type: "garden-2-border", x: 575, y: 105, width: 95, height: 0 },
    { id: 42, type: "garden-2-border", x: 710, y: 105, width: 95, height: 0 },
    { id: 43, type: "garden-2-border", x: 575, y: 225, width: 20, height: 80 },
    { id: 44, type: "garden-2-border", x: 785, y: 225, width: 20, height: 80 },
    { id: 45, type: "garden-2-center", x: 665, y: 190, width: 50, height: 20 },
    { id: 46, type: "house-4-border", x: 1095, y: 85, width: 20, height: 90 },
    { id: 47, type: "house-4-border", x: 1095, y: 250, width: 20, height: 55 },
    { id: 48, type: "house-4-border", x: 1095, y: 85, width: 230, height: 0 },
    { id: 49, type: "house-4-body", x: 1150, y: 135, width: 145, height: 85 },
    { id: 50, type: "house-4-border", x: 1275, y: 315, width: 50, height: 0 },
    { id: 51, type: "house-5-border", x: 1095, y: 405, width: 20, height: 195 },
    { id: 52, type: "house-4-border", x: 1095, y: 400, width: 230, height: 0 },
    { id: 53, type: "house-5-border", x: 1315, y: 405, width: 0, height: 190 },
    { id: 54, type: "house-5-border", x: 1120, y: 600, width: 50, height: 0 },
    { id: 55, type: "house-5-border", x: 1225, y: 600, width: 100, height: 0 },
    { id: 62, type: "mushroom", x: 890, y: 115, width: 40, height: 15 },
    { id: 63, type: "mushroom", x: 970, y: 115, width: 40, height: 15 },
    { id: 64, type: "mushroom", x: 890, y: 200, width: 40, height: 15 },
    { id: 65, type: "mushroom", x: 970, y: 200, width: 40, height: 15 },
    { id: 66, type: "mushroom", x: 890, y: 290, width: 40, height: 15 },
    { id: 67, type: "mushroom", x: 970, y: 290, width: 40, height: 15 },
    { id: 68, type: "pots", x: 395, y: 115, width: 45, height: 15 },
    { id: 69, type: "slab", x: 395, y: 225, width: 45, height: 0 },
    { id: 70, type: "slab", x: 475, y: 225, width: 45, height: 0 },
    { id: 71, type: "slab", x: 395, y: 270, width: 45, height: 0 },
    { id: 72, type: "slab", x: 475, y: 270, width: 45, height: 0 },
    { id: 73, type: "slab", x: 395, y: 315, width: 45, height: 0 },
    { id: 74, type: "slab", x: 475, y: 315, width: 45, height: 0 },
    { id: 75, type: "slab", x: 85, y: 620, width: 45, height: 0 },
    { id: 76, type: "slab", x: 160, y: 620, width: 45, height: 0 },
    { id: 77, type: "slab", x: 240, y: 620, width: 45, height: 0 },
    { id: 78, type: "pokemon", name: 'Bulbasaur' , x: 430, y: 180, width: 40, height: 50 },
    { id: 79, type: "pokemon", name: 'Charmander' , x: 160, y: 380, width: 40, height: 50 },
    { id: 80, type: "pokemon", name: 'Squirtle' , x: 700, y: 470, width: 60, height: 50 },
    { id: 81, type: "pokemon", name: 'Pikachu' , x: 830, y: 200, width: 60, height: 50 },
    { id: 82, type: "pokemon", name: 'Snorlax' , x: 800, y: 300, width: 80, height: 80 },
    { id: 83, type: "pokemon", name: 'Gible' , x: 1020, y: 500, width: 60, height: 60}
  ]);

  return (
    <div className={styles.playground}>
      <Player
        playerPosition={playerPosition}
        setPlayerPosition={setPlayerPosition}
        obstacles={obstacles}
      />
      {obstacles.map((obstacle) => (
        obstacle.type === 'pokemon' ? (
          <Pokemon
            key={obstacle.id}
            pokemon={obstacle.name}
            position={{ x: obstacle.x, y: obstacle.y }}
            width={obstacle.width}
            height={obstacle.height}
          />
        ) : (
          <Obstacle
            key={obstacle.id}
            position={{ x: obstacle.x, y: obstacle.y }}
            width={obstacle.width}
            height={obstacle.height}
          />
        )
      ))}
    </div>
  );
};

export default PlayGround;
