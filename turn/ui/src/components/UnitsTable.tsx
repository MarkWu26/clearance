import { Unit } from "./Types";

interface Props {
  data: Unit[] | [object];
  col: Object[];
}
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
const UnitsTable = ({ data, col }: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value.toLowerCase();
    const newData = (data as Unit[]).filter((row) => {
      return (
        row.name.toLowerCase().includes(searchKey) ||
        row.desc.toLowerCase().includes(searchKey)
      );
    });
    setRows(newData);
  };

  useEffect(() => {
    setRows(data);
  }, [data]);

  const [rows, setRows] = useState(data);
  return (
    <>
      <div className="d-inline-flex justify-content-end">
        <input
          type="text"
          className="form-control rounded w-20 mb-2 poppins-reg"
          onChange={handleSearch}
          placeholder="Search..."
        ></input>
      </div>

      <DataTable columns={col} data={rows} pagination />
    </>
  );
};

export default UnitsTable;
