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
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-navy-900">
              Terjadi Kesalahan
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Maaf, terjadi kesalahan pada halaman ini. Silakan coba muat ulang atau kembali ke halaman utama.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold rounded-xl transition-colors shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Coba Lagi</span>
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
