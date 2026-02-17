import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalSearch, setQuery } from '../features/search/searchSlice';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Global Search</h1>
      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <input className="glass-input flex-1" placeholder="Search patients, doctors, appointments, prescriptions..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="btn-primary px-4 py-2 rounded-xl">Search</button>
      </form>
      {isLoading && <div>Searching...</div>}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['patients','doctors','appointments','prescriptions'].map(key => (
            <div key={key} className="p-4 bg-white rounded-xl shadow">
              <div className="font-bold mb-2 capitalize">{key}</div>
              <ul className="space-y-1 text-sm max-h-64 overflow-auto">
                {results[key].map((item) => (
                  <li key={item._id} className="truncate">{JSON.stringify(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
