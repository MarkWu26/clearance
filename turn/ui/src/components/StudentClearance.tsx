import { useEffect, useState } from "react";
import StudentTable from "./StudentTable";
import axios, { AxiosError } from "axios";

const StudentClearance = () => {
  type User = {
    id: number;
    name: string;
    email: string;
  };

  const [users, setUsers] = useState<User[]>([]);
  const [group, setGroup] = useState('');
  const [sy, setSy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(event.target.value);
  };
  
  const handleSyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSy(event.target.value);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  

  const handleSearch = async () => {
    // Assuming you want to filter the users based on the searchTerm
    // You would have to adjust the URL or query parameters based on your actual API
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users?search`, {
        params: {
          searchTerm,
          group,
          sy,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>  
      <div className="card m-2">
        <div className="card-header">Menu Title</div>
        <div className="card-body">
          <h5 className="card-title">Search Student Clearance</h5>
          <p className="card-text">
            Search student clearance by ID number, name or course.
          </p>
          <div className="w-100 d-inline-flex justify-content-between align-items-center mb-5">
            <div className="d-inline-flex justify-content-around w-25 h-50">
              <select className="form-select" name="group" value={group} onChange={handleGroupChange}>
                <option value="" selected disabled>
                  Group
                </option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
                <option value="e">E</option>
                <option value="f">F</option>
                <option value="g">G</option>
              </select>
              <select className="form-select ml-auto" name="sy" value={sy} onChange={handleSyChange}>
                <option value="" selected disabled>
                  School Year
                </option>
                <option value="1">2024/2023</option>
                <option value="2">2023/2022</option>
                <option value="3">2022/2021</option>
                <option value="4">2021/2020</option>
                <option value="5">2020/2019</option>
                <option value="6">2019/2018</option>
                <option value="7">2018/2017</option>
              </select>
            </div>
            <div className="row d-inline-flex m-1 justify-content-center align-items-center w-26">
              <button className="btn btn-primary w-26" onClick={handleSearch}>
                Show Records
              </button>
            </div>
          </div>

          <div className="w-100 ext-center">
            <StudentTable data={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentClearance;
