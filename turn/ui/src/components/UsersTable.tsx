import { User } from "./Types";

interface Props {
  data: User[];
  col: Object[];
}

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";


const UsersTable: React.FC<Props> = ({ data, col }) => {
  const [rows, setRows] = useState<User[]>(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hellooo')
    const searchKey = e.target.value.toLowerCase();
    console.log('search: ', searchKey)
    const newData = data.filter((row) => {
      return (
        row.username.toLowerCase().includes(searchKey) ||
        /* row.type.toLowerCase().includes(searchKey) || */
        row.rights.toLowerCase().includes(searchKey) ||
        row.unit.toLowerCase().includes(searchKey) ||
        row.id.toString().includes(searchKey)
      );
    });
    setRows(newData);
  };



  useEffect(() => {
    
    setRows(data);
  }, [data]);

  useEffect(() => {
    
  }, [rows]);



  return (
    <>
      <div className="d-inline-flex justify-content-end">
        <input
          type="text"
          className="form-control rounded w-20 mb-2 poppins-reg"
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>

      <DataTable columns={col} data={rows} pagination />
    </>
  );
};

export default UsersTable;
