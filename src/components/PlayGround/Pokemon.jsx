// Pokemon obstacle component

const Pokemon = ({ pokemon, position, width, height }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        imageRendering: 'pixelated',
      }}
    >
      <img src={`/src/assets/Pokemon/${pokemon}-Idle.gif`} alt={pokemon} />
    </div>
  );
};

export default Pokemon;
