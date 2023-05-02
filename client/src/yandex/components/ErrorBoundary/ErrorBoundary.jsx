import React from "react";


const debug_log_error_boundary = false


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, name: props.name }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        if (debug_log_error_boundary) console.log(`ERROR: component NAME: ${this.state.name}`, error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <h1>{`ERROR: component NAME: ${this.state.name}`}</h1>
        } else {
            return this.props.children
        }
    }
}


export default ErrorBoundary