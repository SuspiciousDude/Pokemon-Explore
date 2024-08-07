import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "/src/styles/Player.module.css";
import HomeContext from "../../contexts/HomeContext";
import Card from "./Card";

const Player = ({ playerPosition, setPlayerPosition, obstacles }) => {
  const playerWidth = 30;
  const playerHeight = 40;
  const { userName } = useContext(HomeContext);
  const usernameRef = useRef(null)
  const [playerDirection, setPlayerDirection] = useState("forward");
  const [isPlayerMoving, setIsPlayerMoving] = useState(false);
  const [collided, setCollided] = useState(false);
  const [playerPokemon, setPlayerPokemon] = useState(null);

  // Collision detection between the two rectangles by comparing their width and height
  function detectCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  // set the player position to the center of the username
  useEffect(() => {
    if (usernameRef.current) {
      const usernameWidth = usernameRef.current.offsetWidth;
      setPlayerPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x - usernameWidth / 2,
      }));
    }
  }, [userName, setPlayerPosition]);

  // Handles player movement using the top and left attributes of CSS
  useEffect(() => {
    const handlePlayerMovement = (e) => {
      const speed = 5;
      let newPosition = { ...playerPosition };
      let moved = false;
      switch (e.key) {
        case "ArrowUp":
          setIsPlayerMoving(true);
          setPlayerDirection("backward");
          newPosition.y -= speed;
          moved = true;
          break;
        case "ArrowDown":
          setIsPlayerMoving(true);
          setPlayerDirection("forward");
          newPosition.y += speed;
          moved = true;
          break;
        case "ArrowLeft":
          setIsPlayerMoving(true);
          setPlayerDirection("left");
          newPosition.x -= speed;
          moved = true;
          break;
        case "ArrowRight":
          setIsPlayerMoving(true);
          setPlayerDirection("right");
          newPosition.x += speed;
          moved = true;
          break;
        default:
          break;
      }

      if (!moved) return;

      // Check collision with obstacles for collision with special obstacle types
      const playerRect = {
        x: newPosition.x,
        y: newPosition.y,
        width: playerWidth,
        height: playerHeight,
      };

      for (let obstacle of obstacles) {
        const obstacleRect = {
          x: obstacle.x,
          y: obstacle.y,
          width: obstacle.width,
          height: obstacle.height,
        };

        if (detectCollision(playerRect, obstacleRect)) {
          if (obstacle.type !== "pokemon") {
            setIsPlayerMoving(false);
            return;
          } else {
            if (!collided) {
              setCollided(true);
              setPlayerPokemon(obstacle.name);
              console.log("Collision with Pokemon detected!");
              setTimeout(() => {
                setCollided(false);
              }, 3000);
            }
          }
        }
      }
      setPlayerPosition(newPosition);

    };

    // Handles player stopping
    const handlePlayerStop = () => {
      setIsPlayerMoving(false);
    };

    // Adding event listeners
    window.addEventListener("keydown", handlePlayerMovement);
    window.addEventListener("keyup", handlePlayerStop);
    return () => {
      window.removeEventListener("keydown", handlePlayerMovement);
      window.removeEventListener("keyup", handlePlayerStop);
    };
  }, [playerPosition, setPlayerPosition, obstacles]);

  return (
    <div>
      <div 
        ref={usernameRef}
        className={styles.username} 
        style={{ 
          top: `${playerPosition.y - 20}px`,
          left: `${playerPosition.x + 15}px`,
        }}
      >
        {userName}
      </div>
      <div className={`${styles.player} ${isPlayerMoving ? styles['walk_' + playerDirection] : styles['idle_' + playerDirection]}`}
        style={{
          left: playerPosition.x,
          top: playerPosition.y,
          width: `32px`,
          height: `38px`,
        }}
       />
      {collided && <Card pokemon={playerPokemon} />}
    </div>
  );
};

export default Player;
