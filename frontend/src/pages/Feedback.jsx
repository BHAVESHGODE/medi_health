import { useState } from 'react';
import { useSelector } from 'react-redux';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Feedback() {
    const { user } = useSelector((state) => state.auth);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [category, setCategory] = useState('general');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would submit the feedback to the backend
        console.log({
            rating,
            category,
            message,
            user: user?.email
        });
        setSubmitted(true);
        setRating(0);
        setCategory('general');
        setMessage('');
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white shadow-lg">
                    <FeedbackIcon style={{ fontSize: 22 }} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Feedback Form */}
                <div className="lg:col-span-2">
                    <div className="glass-panel rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Share Your Feedback
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User Info */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Submitting as</p>
                                <p className="text-gray-900 dark:text-white font-medium">{user?.name} ({user?.email})</p>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Rate your experience
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            {(hoverRating || rating) >= star ? (
                                                <StarIcon style={{ fontSize: 32, color: '#f59e0b' }} />
                                            ) : (
                                                <StarBorderIcon style={{ fontSize: 32, color: '#d1d5db' }} className="dark:text-gray-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {rating > 0 && (
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        {rating === 5 && 'Excellent! We are glad you enjoyed your experience.'}
                                        {rating === 4 && 'Great! Thank you for your positive feedback.'}
                                        {rating === 3 && 'Good! We appreciate your feedback.'}
                                        {rating === 2 && 'We are sorry to hear that. Your feedback helps us improve.'}
                                        {rating === 1 && 'We apologize for your experience. We would like to make it better.'}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Feedback Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="general">General Feedback</option>
                                    <option value="bug">Bug Report</option>
                                    <option value="feature">Feature Request</option>
                                    <option value="service">Service Quality</option>
                                    <option value="improvement">Improvement Suggestion</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Your Feedback
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tell us what you think... (minimum 10 characters)"
                                    rows="6"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                    required
                                    minLength="10"
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    {message.length} characters
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!message.trim() || message.length < 10}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SendIcon style={{ fontSize: 20 }} />
                                Submit Feedback
                            </button>
                        </form>

                        {submitted && (
                            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 flex items-center gap-2">
                                <span>✓</span>
                                <span>Thank you! Your feedback has been submitted successfully.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Panel */}
                <div className="space-y-6">
                    {/* What Happens Next */}
                    <div className="glass-panel rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What Happens Next?</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                    1
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Received</p>
                                    <p className="text-gray-600 dark:text-gray-400">Your feedback is logged in our system</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                    2
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Reviewed</p>
                                    <p className="text-gray-600 dark:text-gray-400">Our team reviews it within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                    3
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Acted Upon</p>
                                    <p className="text-gray-600 dark:text-gray-400">We take action and improve</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="glass-panel rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 Feedback Tips</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>✓ Be specific and clear</li>
                            <li>✓ Include examples if possible</li>
                            <li>✓ Focus on one issue per submission</li>
                            <li>✓ Rate your overall experience</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
