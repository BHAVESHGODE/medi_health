import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalSearch, setQuery } from '../features/search/searchSlice';
import PageHeader from '../components/common/PageHeader';
import SearchIcon from '@mui/icons-material/Search';

export default function GlobalSearch() {
  const dispatch = useDispatch();
  const { q, results, isLoading } = useSelector(s => s.search);
  const [input, setInput] = useState(q || '');

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(setQuery(input));
    dispatch(globalSearch(input));
  };

  return (
    <div>
      <PageHeader
        title="Global Search"
        subtitle="Search across patients, doctors, appointments, and more"
        icon={<SearchIcon style={{ fontSize: 22 }} />}
      />
      
      <div className="glass-panel p-6 mb-6">
        <form onSubmit={onSearch} className="flex gap-3">
          <input 
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Search patients, doctors, appointments, prescriptions..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
          <button className="btn-primary px-6">Search</button>
        </form>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
      
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['patients','doctors','appointments','prescriptions'].map(key => (
            <div key={key} className="glass-panel p-5">
              <div className="font-bold mb-3 capitalize text-gray-900 dark:text-white">{key}</div>
              <ul className="space-y-2 text-sm max-h-64 overflow-auto">
                {results[key]?.length > 0 ? (
                  results[key].map((item) => (
                    <li key={item._id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg truncate text-gray-600 dark:text-gray-400">
                      {item.name || item.title || JSON.stringify(item).slice(0, 50)}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm">No results</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
