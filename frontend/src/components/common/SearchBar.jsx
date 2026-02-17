import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="glass-input w-full pl-10 pr-4"
      />
    </div>
  );
}
