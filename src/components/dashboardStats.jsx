import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

function DashboardStats({ dashboardMetrics, t }) {
  const formattedPayroll = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(dashboardMetrics.totalPayroll);

  return (
    <section className="stats-grid">
      <div className="stat-card stat-card-primary">
        <div className="stat-card-top">
          <span className="stat-label">
            {t.totalEmployees}
          </span>

          <span className="stat-icon">
            <GroupsIcon fontSize="small" />
          </span>
        </div>

        <strong>
          {dashboardMetrics.totalEmployees}
        </strong>

        <span className="stat-description">
          {t.acrossDepartments}
        </span>
      </div>

      <div className="stat-card">
        <div className="stat-card-top">
          <span className="stat-label">
            {t.activeEmployees}
          </span>

          <span className="stat-icon">
            <PersonIcon fontSize="small" />
          </span>
        </div>

        <strong>
          {dashboardMetrics.activeEmployees}
        </strong>

        <span className="stat-description">
          {t.activeWorkforce}
        </span>
      </div>

      <div className="stat-card">
        <div className="stat-card-top">
          <span className="stat-label">
            {t.averagePerformance}
          </span>

          <span className="stat-icon">
            <TrendingUpIcon fontSize="small" />
          </span>
        </div>

        <strong>
          {dashboardMetrics.averagePerformance}
        </strong>

        <span className="stat-description">
          {t.performanceRating}
        </span>
      </div>

      <div className="stat-card stat-card-payroll">
        <div className="stat-card-top">
          <span className="stat-label">
            {t.annualPayroll}
          </span>

          <span className="stat-icon">
            <AccountBalanceWalletOutlinedIcon fontSize="small" />
          </span>
        </div>

        <strong>{formattedPayroll}</strong>

        <span className="stat-description">
          {t.annualCompensation}
        </span>
      </div>
    </section>
  );
}

export default DashboardStats;