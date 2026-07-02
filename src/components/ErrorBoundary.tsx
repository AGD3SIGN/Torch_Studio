import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-6">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">We encountered an unexpected error. Please try refreshing the page.</p>
          <a
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Return home
          </a>
        </div>
      )
    }

    return this.props.children
  }
}
