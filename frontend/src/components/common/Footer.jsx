import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function Footer() {
  return (
    <footer className="mt-auto py-6 px-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <LocalHospitalIcon style={{ fontSize: 14 }} className="text-primary-500" />
          <span className="font-semibold text-gray-500">MediHealth</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>v2.4.0</span>
          <span>•</span>
          <span>HIPAA Compliant</span>
          <span>•</span>
          <span>ISO 27001</span>
        </div>
      </div>
    </footer>
  );
}
