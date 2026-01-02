import { FaUsers, FaGamepad, FaTrophy, FaShieldAlt, FaChartLine, FaBolt } from 'react-icons/fa';

const StatCard = ({ icon: Icon, value, label, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
        <div className={`p-4 rounded-full bg-${color}-100 dark:bg-${color}-900/30 mb-4`}>
            <Icon className={`text-3xl text-${color}-600 dark:text-${color}-400`} />
        </div>
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{value}</h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium">{label}</p>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 mb-3">
            <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                <Icon className="text-xl" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h4>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const StatsSection = () => {
    return (
        <div className="py-12 mt-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <StatCard
                    icon={FaUsers}
                    value="10,000+"
                    label="Active Players"
                    color="blue"
                />
                <StatCard
                    icon={FaGamepad}
                    value="500+"
                    label="Daily Matches"
                    color="green"
                />
                <StatCard
                    icon={FaTrophy}
                    value="$1M+"
                    label="Winnings Paid"
                    color="yellow"
                />
            </div>

            {/* Features Grid */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Why Choose Mini Sports?</h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                    icon={FaBolt}
                    title="Real-Time Updates"
                    description="Experience the action as it happens with our ultra-low latency score updates and live match tracking."
                />
                <FeatureCard
                    icon={FaShieldAlt}
                    title="Secure Platform"
                    description="Your data and transactions are protected by enterprise-grade encryption and strict security protocols."
                />
                <FeatureCard
                    icon={FaChartLine}
                    title="Advanced Analytics"
                    description="Get deep insights, player stats, and historical data to make informed decisions for every game."
                />
            </div>
        </div>
    );
};

export default StatsSection;
