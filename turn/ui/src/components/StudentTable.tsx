import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StudentClearanceStatus } from "./Types";


interface Props {
  data: StudentClearanceStatus[];
}

const StudentTable = ({ data }: Props) => {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return (
        row.stud_id.toString().includes(searchKey) ||
        row.name.toLowerCase().includes(searchKey) ||
        row.remarks.toLowerCase().includes(searchKey) ||
        row.description.toLowerCase().includes(searchKey) ||
        row.year.toLowerCase().includes(searchKey)
      );
    });
    setFilteredData(newData);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const columns = [
    { name: "ID", selector: (row: StudentClearanceStatus) => row.stud_id, sortable: true },
    { name: "Name", selector: (row: StudentClearanceStatus) => row.name, sortable: true },
    { name: "Remarks", selector: (row: StudentClearanceStatus) => row.remarks, sortable: true },
    {name: "Description", selector: (row: StudentClearanceStatus) => row.description, sortable: true},
    {name: "School Year", selector: (row: StudentClearanceStatus) => row.year, sortable: true},
  ];  

  return (
    <>
      <div className="d-inline-flex justify-content-end">
        <input
          type="text"
          className="form-control rounded w-20 mb-2 poppins-reg"
          onChange={handleSearch}
          placeholder="Search Student"
        />
      </div>
      <DataTable columns={columns} data={filteredData} pagination />
    </>
  );
};

export default StudentTable;
