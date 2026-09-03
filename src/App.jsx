import {
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";

import { AgGridReact } from "ag-grid-react";

import {
  AllCommunityModule,
  ModuleRegistry,
} from "ag-grid-community";

import employeeData from "./data/employees.json";
import { translations } from "./constants/translations";

import Header from "./components/header";
import DashboardStats from "./components/dashboardStats";
import EmployeeToolbar from "./components/employeeToolbar";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import "./App.css";

ModuleRegistry.registerModules([
  AllCommunityModule,
]);

const StatusRenderer = (params) => {
  const isActive = params.value;

  const activeLabel =
    params.activeLabel || "Active";

  const inactiveLabel =
    params.inactiveLabel || "Inactive";

  return (
    <span
      className={`status-badge ${
        isActive
          ? "status-active"
          : "status-inactive"
      }`}
    >
      {isActive ? (
        <CheckCircleRoundedIcon
          className="status-icon"
        />
      ) : (
        <CancelRoundedIcon
          className="status-icon"
        />
      )}

      <span>
        {isActive
          ? activeLabel
          : inactiveLabel}
      </span>
    </span>
  );
};

const StatusEditor = (params) => {
  const [isOpen, setIsOpen] =
    useState(true);

  const editorRef = useRef(null);

  const activeLabel =
    params.activeLabel || "Active";

  const inactiveLabel =
    params.inactiveLabel || "Inactive";

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const selectStatus = (value) => {
    params.node.setDataValue(
      "isActive",
      value
    );

    params.stopEditing();
  };

  return (
    <div
      ref={editorRef}
      className="status-editor"
      tabIndex={-1}
    >
      <button
        type="button"
        className="status-editor-trigger"
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
      >
        <span
          className={`status-badge ${
            params.value
              ? "status-active"
              : "status-inactive"
          }`}
        >
          {params.value ? (
            <CheckCircleRoundedIcon
              className="status-icon"
            />
          ) : (
            <CancelRoundedIcon
              className="status-icon"
            />
          )}

          <span>
            {params.value
              ? activeLabel
              : inactiveLabel}
          </span>
        </span>

        <KeyboardArrowDownRoundedIcon
          className="status-editor-arrow"
        />
      </button>

      {isOpen && (
        <div className="status-options">
          <button
            type="button"
            className="status-option status-option-active"
            onClick={() =>
              selectStatus(true)
            }
          >
            <CheckCircleRoundedIcon />

            <span>
              {activeLabel}
            </span>
          </button>

          <button
            type="button"
            className="status-option status-option-inactive"
            onClick={() =>
              selectStatus(false)
            }
          >
            <CancelRoundedIcon />

            <span>
              {inactiveLabel}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

function App() {
  const [searchText, setSearchText] =
    useState("");

  const [theme, setTheme] =
    useState("light");

  const [language, setLanguage] =
    useState("en");

  const [fontScale, setFontScale] =
    useState(1);

  const t =
    translations[language] ||
    translations.en;

  const employees =
    employeeData.employees ?? [];

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      fontScale
    );
  }, [fontScale]);

  const dashboardMetrics = useMemo(() => {
    const totalEmployees =
      employees.length;

    const activeEmployees =
      employees.filter(
        (employee) =>
          employee.isActive
      ).length;

    const averagePerformance =
      totalEmployees > 0
        ? (
            employees.reduce(
              (total, employee) =>
                total +
                (
                  employee.performanceRating ??
                  0
                ),
              0
            ) / totalEmployees
          ).toFixed(1)
        : "0.0";

    const totalPayroll =
      employees.reduce(
        (total, employee) =>
          total +
          (employee.salary ?? 0),
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
        headerName: t.employee,
        flex: 1.25,
        minWidth: 145,

        valueGetter: (params) =>
          params.data
            ? `${params.data.firstName} ${params.data.lastName}`
            : "",
      },

      {
        field: "department",
        headerName: t.department,
        flex: 1,
        minWidth: 125,
      },

      {
        field: "position",
        headerName: t.position,
        flex: 1.2,
        minWidth: 145,
      },

      {
        field: "salary",
        headerName: t.salary,
        flex: 0.9,
        minWidth: 110,

        valueFormatter: (params) =>
          params.value != null
            ? new Intl.NumberFormat(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }
              ).format(params.value)
            : "",
      },

      {
        field: "hireDate",
        headerName: t.hireDate,
        flex: 1,
        minWidth: 120,
      },

      {
        field: "age",
        headerName: t.age,
        flex: 0.55,
        minWidth: 70,
      },

      {
        field: "performanceRating",
        headerName: t.performance,
        flex: 0.85,
        minWidth: 105,
      },

      {
        field: "projectsCompleted",
        headerName: t.projects,
        flex: 0.7,
        minWidth: 90,
      },

      {
        field: "location",
        headerName: t.location,
        flex: 0.9,
        minWidth: 110,
      },

      {
        field: "isActive",
        headerName: t.status,
        flex: 0.9,
        minWidth: 125,

        editable: true,

        cellEditorPopup: true,

        cellEditorPopupPosition:
          "under",

        cellRenderer: StatusRenderer,

        cellRendererParams: {
          activeLabel:
            t.active || "Active",

          inactiveLabel:
            t.inactive || "Inactive",
        },

        cellEditor: StatusEditor,

        cellEditorParams: {
          activeLabel:
            t.active || "Active",

          inactiveLabel:
            t.inactive || "Inactive",
        },

        cellClass: "status-cell",
      },
    ],

    [t]
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,

      resizable: true,

      filter: true,

      suppressMovable: true,
    }),

    []
  );

  return (
    <div className="app">
      <Header
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        setFontScale={setFontScale}
        t={t}
      />

      <main className="content dashboard-layout">
        <DashboardStats
          dashboardMetrics={
            dashboardMetrics
          }
          t={t}
        />

        <EmployeeToolbar
          employeeCount={
            employees.length
          }
          searchText={searchText}
          setSearchText={
            setSearchText
          }
          t={t}
        />

        <section
          className={`grid-wrapper ${
            theme === "dark"
              ? "ag-theme-quartz-dark"
              : "ag-theme-quartz"
          }`}
        >
          <AgGridReact
            rowData={employees}
            columnDefs={columnDefs}
            defaultColDef={
              defaultColDef
            }
            quickFilterText={
              searchText
            }
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[
              10,
              20,
              50,
            ]}
            animateRows={true}
            domLayout="autoHeight"
            rowHeight={52}
            headerHeight={52}
            singleClickEdit={true}
            stopEditingWhenCellsLoseFocus={
              true
            }
          />
        </section>
      </main>
    </div>
  );
}

export default App;