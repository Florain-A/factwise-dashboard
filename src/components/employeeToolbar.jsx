function EmployeeToolbar({
  employeeCount,
  searchText,
  setSearchText,
  t,
}) {
  return (
    <section className="employee-toolbar">
      <div className="employee-toolbar-info">
        <h2>{t.employees}</h2>

        <p>
          {employeeCount} {t.employeesInDataset}
        </p>
      </div>

      <div className="employee-toolbar-search">
        <input
          type="text"
          className="employee-search-input"
          placeholder={t.searchEmployees}
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
        />
      </div>
    </section>
  );
}

export default EmployeeToolbar;