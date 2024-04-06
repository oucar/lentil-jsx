import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { Fragment, useEffect } from "react";
import "./styles/cellList.css";
import { useActions } from "../hooks/useActions";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="mt-6">
      <motion.button
        className="container pl-16 inline-block pt-2 pb-2 cursor-pointer bg-[#0f172ae6] hover:bg-blue-950 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        whileHover={{ x: -5, scale: 1.0 }}
        whileTap={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={handleClick}
      >
        <i className="fa-solid fa-caret-left fa-2xl" />
      </motion.button>
      <div className="cell-list">
        <AddCell forceVisible={cells.length === 0} previousCellId={null} />
        {renderedCells}
      </div>
    </div>
  );
};

export default CellList;
