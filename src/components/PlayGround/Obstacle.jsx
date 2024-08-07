import React from "react";
import styles from "/src/styles/Obstacle.module.css";

// Obstacle component
const Obstacle = ({ position, width, height }) => {
  return (
    <div
      className={styles.obstacle}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
};

export default Obstacle;