import { FaCrown, FaArrowRight } from 'react-icons/fa';

const AdCard = () => {
    return (
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaCrown className="text-9xl transform rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <FaCrown className="text-yellow-200" />
                        Join the VIP Club
                    </h3>
                    <p className="text-yellow-100 max-w-md">
                        Get exclusive access to premium stats, ad-free experience, and early access to new game modes.
                    </p>
                </div>

                <button className="bg-white text-yellow-600 px-6 py-3 rounded-xl font-bold hover:bg-yellow-50 transition-colors shadow-lg flex items-center gap-2">
                    Upgrade Now <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default AdCard;
