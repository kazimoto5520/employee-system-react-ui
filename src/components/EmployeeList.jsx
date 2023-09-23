import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployee] = useState([]);

  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    setloading(false);
    try {
      const response = await EmployeeService.getEmployees();
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          onClick={() => navigate("/addEmployee")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          Add Employee
        </button>
      </div>

      <div className="flex border-b shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 tracking-wider uppercase py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 tracking-wider uppercase py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 tracking-wider uppercase py-3 px-6">
                Email ID
              </th>
              <th className="text-right font-medium text-gray-500 tracking-wider uppercase py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.firstName}
                    </div>
                  </td>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.lastName}
                    </div>
                  </td>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.emailId}
                    </div>
                  </td>
                  <td className="text-right px-6 py-4 whitespace-nowrap">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800 px-4"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800 "
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
