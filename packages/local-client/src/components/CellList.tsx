import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { Fragment, useEffect } from "react";
import "./styles/cellList.css";
import { useActions } from "../hooks/use-actions";


const CellList: React.FC = () => {
  const { fetchCells } = useActions();

  const { data, order } = useTypedSelector((state) => state.cells);
  const cells = order.map((id) => data[id]);

  // will be called only once
  useEffect(() => {
    fetchCells();
  }, []);


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
