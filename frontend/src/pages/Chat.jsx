import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages, sendMessage, addMessageRealtime } from '../features/chat/chatSlice';
import io from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { API_BASE_URL, SOCKET_URL } from '../config';

const socket = io(SOCKET_URL);

function Chat() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { messages } = useSelector((state) => state.chat);

    const [selectedUser, setSelectedUser] = useState(null); // The user we are chatting with
    const [userList, setUserList] = useState([]); // List of users to chat with (Doctors/Patients)
    const [text, setText] = useState('');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Fetch users to chat with (mock: fetch all doctors if patient, or patients if doctor)
        // For simplicity, let's just fetch all Doctors for now if I am a Patient
        const fetchUsers = async () => {
            try {
                // In a real app, this endpoint would be robust. 
                // Using existing endpoints to populate list.
                const res = await axios.get(`${API_BASE_URL}/api/doctors`);
                setUserList(res.data.data.map(d => d.user));
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();

        socket.on('new_message', (msg) => {
            // Only add if it belongs to current conversation or notified
            // Ideally check msg.sender === selectedUser._id || msg.receiver === user._id
            if (msg.sender._id !== user._id) { // Don't duplicate own message
                dispatch(addMessageRealtime(msg));
            }
        });

        return () => {
            socket.off('new_message');
        };
    }, [dispatch, user]);

    useEffect(() => {
        if (selectedUser) {
            dispatch(getMessages(selectedUser._id));
        }
    }, [selectedUser, dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!text.trim() || !selectedUser) return;

        dispatch(sendMessage({
            receiver: selectedUser._id,
            content: text
        }));
        setText('');
    };

    return (
        <div className="flex h-[calc(100vh-100px)] glass-panel overflow-hidden gap-4 p-4">
            {/* Sidebar - User List */}
            <div className="w-1/3 border-r border-gray-200 pr-4">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="space-y-2">
                    {userList.map(u => (
                        <div
                            key={u._id}
                            onClick={() => setSelectedUser(u)}
                            className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 hover:bg-blue-50 transition ${selectedUser?._id === u._id ? 'bg-blue-100' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                {u.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">{u.name}</h3>
                                <p className="text-xs text-gray-500">{u.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="border-b pb-4 mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <div className="font-bold">{selectedUser.name}</div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-3 rounded-xl ${msg.sender._id === user._id ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                                        <p>{msg.content}</p>
                                        <span className="text-[10px] opacity-70 block text-right mt-1">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className="mt-4 flex gap-2">
                            <input
                                className="glass-input w-full"
                                placeholder="Type a message..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button type="submit" className="btn-primary p-3 rounded-xl aspect-square flex items-center justify-center">
                                <SendIcon />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;
