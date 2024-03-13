import { useTypedSelector } from "../hooks/use-typed-selector.ts";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { Fragment } from "react";
import "./styles/cellList.css";

const CellList: React.FC = () => {
  const { data, order } = useTypedSelector((state) => state.cells);
  const cells = order.map((id) => data[id]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
