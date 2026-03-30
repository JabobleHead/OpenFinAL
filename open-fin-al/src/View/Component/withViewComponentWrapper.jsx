import React from "react";
import { ViewComponentWrapper } from "./ViewComponentWrapper.jsx";

/**
 * Wraps function components with ViewComponentWrapper controls so JSX files
 * can expose the same AI-driven API as TSX class components.
 */
export function withViewComponentWrapper(WrappedComponent, defaultConfig = {}) {
    class WrappedWithViewComponentControl extends ViewComponentWrapper {
        constructor(props = {}) {
            super({ ...defaultConfig, ...props });
        }

        componentDidMount() {
            super.componentDidMount();
        }

        componentWillUnmount() {
            super.componentWillUnmount();
        }

        render() {
            if (!this.getVisibility()) {
                return null;
            }

            const style = {
                ...(this.props.style ?? {}),
            };

            if (this.width !== null && this.width !== undefined) {
                style.width = typeof this.width === "number" ? `${this.width}px` : this.width;
            }

            if (this.height !== null && this.height !== undefined) {
                style.height = typeof this.height === "number" ? `${this.height}px` : this.height;
            }

            if (!this.enabled) {
                style.pointerEvents = "none";
                style.opacity = 0.6;
            }

            return (
                <div style={style} data-component-key={this.getComponentKey()}>
                    <WrappedComponent {...this.props} viewComponent={this} />
                </div>
            );
        }
    }

    WrappedWithViewComponentControl.displayName = `WithViewComponentControl(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return WrappedWithViewComponentControl;
}

export default withViewComponentWrapper;
