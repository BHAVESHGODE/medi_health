const statusStyles = {
  // Common statuses
  active: 'badge-success',
  available: 'badge-success',
  confirmed: 'badge-success',
  completed: 'badge-success',
  approved: 'badge-success',
  paid: 'badge-success',
  adequate: 'badge-success',
  'on duty': 'badge-success',
  'in stock': 'badge-success',
  stable: 'badge-success',
  recovering: 'badge-success',

  pending: 'badge-warning',
  'in progress': 'badge-warning',
  'in consultation': 'badge-warning',
  'on break': 'badge-warning',
  reserved: 'badge-warning',
  partial: 'badge-warning',
  low: 'badge-warning',
  urgent: 'badge-warning',

  critical: 'badge-danger',
  'low stock': 'badge-danger',
  overdue: 'badge-danger',
  rejected: 'badge-danger',
  cancelled: 'badge-danger',
  'off duty': 'badge-danger',
  'on leave': 'badge-danger',
  maintenance: 'badge-danger',

  info: 'badge-info',
  normal: 'badge-info',
  'in surgery': 'badge-info',

  default: 'badge-neutral',
  discharged: 'badge-neutral',
};

export default function StatusBadge({ status, className = '' }) {
  const key = status?.toLowerCase() || 'default';
  const style = statusStyles[key] || statusStyles.default;

  return (
    <span className={`badge ${style} ${className}`}>
      {status}
    </span>
  );
}
