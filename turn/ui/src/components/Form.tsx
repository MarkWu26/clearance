import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ClearanceFrm } from "./Types";

interface Props {
  data: ClearanceFrm[] | [object];
  columns: Object[];
  
}

const ClearanceForm = ({ data, columns }: Props) => {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value.toLowerCase();
    const newData = (data as ClearanceFrm[]).filter((row) => {
      return (
        (row.unit && row.unit.toLowerCase().includes(searchKey)) ||
        (row.officeName && row.officeName.toLowerCase().includes(searchKey)) ||
        (row.officeAbbrev && row.officeAbbrev.toLowerCase().includes(searchKey)) ||
        (row.group && row.group.toLowerCase().includes(searchKey))
      );
    });
    setRows(newData);
  };  
  

  useEffect(() => {
    setRows(data);
  }, [data]);
 
  const [rows, setRows] = useState(data);
  /* useEffect(() => {
    
  }, [rows]); */
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

      <DataTable columns={columns} data={rows} pagination />
    </>
  );
};

export default ClearanceForm;
