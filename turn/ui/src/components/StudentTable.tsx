import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

type User = {
  id: number;
  name: string;
  email: string;
};

interface Props {
  data: User[];
}

const StudentTable = ({ data }: Props) => {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return (
        row.id.toString().includes(searchKey) ||
        row.name.toLowerCase().includes(searchKey) ||
        row.email.toLowerCase().includes(searchKey)
      );
    });
    setFilteredData(newData);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const columns = [
    { name: "ID", selector: (row: User) => row.id, sortable: true },
    { name: "Name", selector: (row: User) => row.name, sortable: true },
    { name: "Email", selector: (row: User) => row.email, sortable: true },
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
