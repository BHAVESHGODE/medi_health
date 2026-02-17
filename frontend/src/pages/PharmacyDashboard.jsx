import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInventory, addItem, reset } from '../features/inventory/inventorySlice';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/LoadingSkeleton';

import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';

function PharmacyDashboard() {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.inventory);
    const [showAddModal, setShowAddModal] = useState(false);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [newItem, setNewItem] = useState({ itemName: '', category: 'Medicine', quantity: 0, unitPrice: 0, supplier: '', lowStockThreshold: 10 });

    useEffect(() => {
        dispatch(getInventory());
        return () => { dispatch(reset()); };
    }, [dispatch]);

    const handleAddItem = (e) => {
        e.preventDefault();
        dispatch(addItem(newItem));
        setShowAddModal(false);
        setNewItem({ itemName: '', category: 'Medicine', quantity: 0, unitPrice: 0, supplier: '', lowStockThreshold: 10 });
    };

    const totalValue = items.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
    const lowStockCount = items.filter(i => i.quantity <= i.lowStockThreshold).length;

    const categories = [
        { label: 'All', value: 'all', count: items.length },
        { label: 'Medicine', value: 'Medicine', count: items.filter(i => i.category === 'Medicine').length },
        { label: 'Equipment', value: 'Equipment', count: items.filter(i => i.category === 'Equipment').length },
        { label: 'Consumable', value: 'Consumable', count: items.filter(i => i.category === 'Consumable').length },
    ];

    const filtered = items
        .filter(i => categoryFilter === 'all' || i.category === categoryFilter)
        .filter(i => i.itemName?.toLowerCase().includes(search.toLowerCase()));

    if (isLoading) return <TableSkeleton />;

    return (
        <div>
            <PageHeader
                title="Pharmacy & Inventory"
                subtitle="Manage stock and medicines"
                icon={<LocalPharmacyIcon style={{ fontSize: 22 }} />}
            >
                <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
                    <AddCircleIcon style={{ fontSize: 18 }} /> Add Item
                </button>
            </PageHeader>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <StatCard title="Total Items" value={items.length} icon={<InventoryIcon style={{ fontSize: 22 }} />} color="sky" />
                <StatCard title="Low Stock Alerts" value={lowStockCount} icon={<WarningIcon style={{ fontSize: 22 }} />} color="rose" trend={lowStockCount > 0 ? 'up' : undefined} trendValue={lowStockCount > 0 ? 'Needs attention' : undefined} />
                <StatCard title="Total Value" value={`$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} icon={<AttachMoneyIcon style={{ fontSize: 22 }} />} color="emerald" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <FilterBar filters={categories} active={categoryFilter} onChange={setCategoryFilter} />
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items..." className="w-64" />
            </div>

            {filtered.length === 0 ? (
                <EmptyState title="No items found" subtitle="Try adjusting your search or add new items" />
            ) : (
                <div className="glass-panel overflow-hidden">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Supplier</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(item => (
                                <tr key={item._id}>
                                    <td className="font-medium text-gray-900 dark:text-white">{item.itemName}</td>
                                    <td><span className="badge-neutral badge">{item.category}</span></td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{item.quantity}</span>
                                            {item.quantity <= item.lowStockThreshold && (
                                                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="font-medium">${item.unitPrice}</td>
                                    <td className="text-gray-500">{item.supplier || '-'}</td>
                                    <td>
                                        <StatusBadge status={item.quantity <= item.lowStockThreshold ? 'Low Stock' : 'In Stock'} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-float mx-4">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add New Item</h2>
                            <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                                <CloseIcon style={{ fontSize: 20 }} />
                            </button>
                        </div>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <input 
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                placeholder="Item Name" 
                                value={newItem.itemName} 
                                onChange={e => setNewItem({ ...newItem, itemName: e.target.value })} 
                                required 
                            />
                            <select 
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                value={newItem.category} 
                                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                            >
                                <option value="Medicine">Medicine</option>
                                <option value="Equipment">Equipment</option>
                                <option value="Consumable">Consumable</option>
                            </select>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" 
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                    placeholder="Quantity" 
                                    value={newItem.quantity} 
                                    onChange={e => setNewItem({ ...newItem, quantity: Number(e.target.value) })} 
                                />
                                <input type="number" 
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                    placeholder="Unit Price" 
                                    value={newItem.unitPrice} 
                                    onChange={e => setNewItem({ ...newItem, unitPrice: Number(e.target.value) })} 
                                />
                            </div>
                            <input 
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                placeholder="Supplier" 
                                value={newItem.supplier} 
                                onChange={e => setNewItem({ ...newItem, supplier: e.target.value })} 
                            />
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn-primary">Add Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PharmacyDashboard;
