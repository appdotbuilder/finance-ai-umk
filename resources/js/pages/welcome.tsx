import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="FinanceAI - Smart Financial Management for UMK">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
                {/* Navigation */}
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">FA</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">FinanceAI</span>
                            </div>
                        </div>
                        <div className="flex gap-x-4 lg:gap-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                🚀 Smart Finance + AI for{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                    UMK Enterprises
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Transform your business financial management with AI-powered insights, automated workflows, 
                                and intelligent recommendations designed specifically for Micro, Small, and Medium Enterprises.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {!auth.user && (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:scale-105"
                                        >
                                            Start Free Trial 🎯
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                        >
                                            Watch Demo <span aria-hidden="true">→</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center mb-16">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
                                💡 Everything you need
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Powerful Financial Management Made Simple
                            </p>
                        </div>

                        <div className="mx-auto max-w-7xl">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Feature 1 */}
                                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        Real-time Financial Analytics
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Get instant insights into your cash flow, profit margins, and expense patterns with beautiful, interactive dashboards.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                                        <span className="text-2xl">🤖</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        AI-Powered Recommendations
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Receive personalized suggestions for cost optimization, revenue growth, and risk management based on your business data.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        Smart Transaction Management
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Automatically categorize transactions, track expenses, and manage multiple accounts with intelligent automation.
                                    </p>
                                </div>

                                {/* Feature 4 */}
                                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-6">
                                        <span className="text-2xl">📈</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        Advanced Reporting
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Generate professional financial reports including P&L, balance sheets, and cash flow statements with AI insights.
                                    </p>
                                </div>

                                {/* Feature 5 */}
                                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        Goal Tracking & Forecasting
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Set financial goals and get AI-powered forecasts to help you make informed business decisions and stay on track.
                                    </p>
                                </div>

                                {/* Feature 6 */}
                                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mb-6">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        Bank-Level Security
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Your financial data is protected with enterprise-grade encryption and security measures trusted by financial institutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 mt-16">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                🚀 Ready to Transform Your Business Finances?
                            </h2>
                            <p className="text-xl text-indigo-100 mb-8">
                                Join thousands of UMK enterprises already using FinanceAI to optimize their financial operations.
                            </p>
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 hover:scale-105"
                                    >
                                        Start Your Free Trial ✨
                                    </Link>
                                    <p className="text-sm text-indigo-100">
                                        No credit card required • 14-day free trial
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                <p>
                                    Built with ❤️ for Indonesian UMK enterprises • Powered by{" "}
                                    <a 
                                        href="https://app.build" 
                                        target="_blank" 
                                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                                    >
                                        app.build
                                    </a>
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}