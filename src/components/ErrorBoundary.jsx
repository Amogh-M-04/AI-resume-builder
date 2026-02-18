import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReset = () => {
        localStorage.removeItem('resumeBuilderData');
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center space-y-4 border border-gray-200">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">Something went wrong</h1>
                        <p className="text-sm text-gray-500">
                            We encountered an unexpected error. This usually happens due to corrupted saved data.
                        </p>
                        <div className="bg-muted p-2 rounded text-xs text-left overflow-auto max-h-32">
                            {this.state.error?.toString()}
                        </div>
                        <button
                            onClick={this.handleReset}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reset Data & Reload
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
