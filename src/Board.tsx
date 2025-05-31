const COL_LIST = ["A", "B", "C", "D", "E", "F", "G", "H"];

const Board = () => {
  const board = [];

  for (let i = 0; i < 8; i++) {
    const row = [];

    for (let j = 0; j < 8; j++) {
      const isWhite = (i + j) % 2 === 0;

      row.push(
        <div
          key={`${COL_LIST[j]}i`}
          className={isWhite ? "whiteCell" : "blackCell"}
        />
      );
    }

    board.push(
      <div key={i} className={"row"}>
        {row}
      </div>
    );
  }

  return <div className="board">{board}</div>;
};

export default Board;
