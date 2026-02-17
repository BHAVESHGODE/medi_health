import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInventory, addItem, reset } from '../features/inventory/inventorySlice';
import Spinner from '../components/Spinner';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarningIcon from '@mui/icons-material/Warning';

function PharmacyDashboard() {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector(
        (state) => state.inventory
    );

    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({
        itemName: '',
        category: 'Medicine',
        quantity: 0,
        unitPrice: 0,
        supplier: '',
        lowStockThreshold: 10
    });

    useEffect(() => {
        dispatch(getInventory());
        return () => { dispatch(reset()) };
    }, [dispatch]);

    const handleAddItem = (e) => {
        e.preventDefault();
        dispatch(addItem(newItem));
        setShowAddModal(false);
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Pharmacy & Inventory</h1>
                    <p className="text-gray-500">Manage stock and medicines</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <AddCircleIcon /> Add Item
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Stats */}
                <div className="glass-panel p-6 bg-blue-50">
                    <h3 className="text-lg font-bold text-blue-700">Total Items</h3>
                    <p className="text-4xl font-bold">{items.length}</p>
                </div>
                <div className="glass-panel p-6 bg-red-50">
                    <h3 className="text-lg font-bold text-red-700">Low Stock Alerts</h3>
                    <p className="text-4xl font-bold text-red-600">
                        {items.filter(i => i.quantity <= i.lowStockThreshold).length}
                    </p>
                </div>
                <div className="glass-panel p-6 bg-green-50">
                    <h3 className="text-lg font-bold text-green-700">Total Value</h3>
                    <p className="text-4xl font-bold text-green-600">
                        ${items.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0).toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="glass-panel p-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="p-3">Item Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Supplier</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-3 font-medium">{item.itemName}</td>
                                <td className="p-3">{item.category}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className="p-3">${item.unitPrice}</td>
                                <td className="p-3">{item.supplier || '-'}</td>
                                <td className="p-3">
                                    {item.quantity <= item.lowStockThreshold ? (
                                        <span className="flex items-center gap-1 text-red-600 font-bold text-xs bg-red-100 px-2 py-1 rounded-full w-max">
                                            <WarningIcon fontSize="small" /> Low Stock
                                        </span>
                                    ) : (
                                        <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded-full">In Stock</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Item Modal (Simple implementation) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="glass-panel p-8 w-full max-w-md bg-white">
                        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <input className="glass-input w-full" placeholder="Item Name" value={newItem.itemName} onChange={e => setNewItem({ ...newItem, itemName: e.target.value })} required />
                            <select className="glass-input w-full" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                                <option value="Medicine">Medicine</option>
                                <option value="Equipment">Equipment</option>
                                <option value="Consumable">Consumable</option>
                            </select>
                            <input type="number" className="glass-input w-full" placeholder="Quantity" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} />
                            <input type="number" className="glass-input w-full" placeholder="Unit Price" value={newItem.unitPrice} onChange={e => setNewItem({ ...newItem, unitPrice: e.target.value })} />
                            <input className="glass-input w-full" placeholder="Supplier" value={newItem.supplier} onChange={e => setNewItem({ ...newItem, supplier: e.target.value })} />
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
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
