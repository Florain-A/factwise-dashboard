import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import employeeData from "./data/employees.json";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [searchText, setSearchText] = useState("");

  const employees = employeeData.employees ?? [];

  // Dashboard metrics
  const dashboardMetrics = useMemo(() => {
    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
      (employee) => employee.isActive
    ).length;

    const averagePerformance =
      totalEmployees > 0
        ? (
            employees.reduce(
              (total, employee) =>
                total + (employee.performanceRating ?? 0),
              0
            ) / totalEmployees
          ).toFixed(1)
        : "0.0";

    const totalPayroll = employees.reduce(
      (total, employee) => total + (employee.salary ?? 0),
      0
    );

    return {
      totalEmployees,
      activeEmployees,
      averagePerformance,
      totalPayroll,
    };
  }, [employees]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Employee",
        minWidth: 200,
        flex: 1,
        valueGetter: (params) =>
          `${params.data.firstName} ${params.data.lastName}`,
      },
      {
        field: "department",
        headerName: "Department",
        filter: true,
      },
      {
        field: "position",
        headerName: "Position",
        minWidth: 190,
        flex: 1,
      },
      {
        field: "salary",
        headerName: "Salary",
        filter: "agNumberColumnFilter",
        valueFormatter: (params) =>
          params.value != null
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(params.value)
            : "",
      },
      {
        field: "hireDate",
        headerName: "Hire Date",
        filter: "agDateColumnFilter",
      },
      {
        field: "age",
        headerName: "Age",
        filter: "agNumberColumnFilter",
        maxWidth: 100,
      },
      {
        field: "performanceRating",
        headerName: "Performance",
        filter: "agNumberColumnFilter",
        maxWidth: 140,
      },
      {
        field: "projectsCompleted",
        headerName: "Projects",
        filter: "agNumberColumnFilter",
        maxWidth: 120,
      },
      {
        field: "location",
        headerName: "Location",
        filter: true,
      },
      {
        field: "isActive",
        headerName: "Status",
        filter: true,
        maxWidth: 120,
        valueFormatter: (params) =>
          params.value ? "Active" : "Inactive",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
    }),
    []
  );

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>FactWise</h1>
          <p>Employee Analytics Dashboard</p>
        </div>
      </header>

      <main className="content">
        {/* Dashboard Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Employees</span>
            <strong>{dashboardMetrics.totalEmployees}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Active Employees</span>
            <strong>{dashboardMetrics.activeEmployees}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Average Performance</span>
            <strong>{dashboardMetrics.averagePerformance}</strong>
            <span className="stat-suffix">/ 5.0</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Annual Payroll</span>
            <strong>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(dashboardMetrics.totalPayroll)}
            </strong>
          </div>
        </section>

        <section className="toolbar">
          <div>
            <h2>Employees</h2>
            <p>{employees.length} employees in the dataset</p>
          </div>

          <input
            type="text"
            placeholder="Search employees..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Search employees"
          />
        </section>

        <section className="grid-wrapper">
        <AgGridReact
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        quickFilterText={searchText}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
        animateRows={true}
      />
        </section>
      </main>
    </div>
  );
}

export default App;