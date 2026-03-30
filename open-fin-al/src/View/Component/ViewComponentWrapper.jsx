import React, { Component } from "react";

/**
 * JSX-compatible base wrapper for view components.
 * This mirrors the IViewComponent contract so JSX components can share
 * consistent behavior without being converted to TSX.
 */
export class ViewComponentWrapper extends Component {
    constructor(props = {}) {
        super(props);

        this.height = props.height ?? null;
        this.width = props.width ?? null;
        this.isContainer = props.isContainer ?? false;
        this.resizable = props.resizable ?? true;
        this.maintainAspectRatio = props.maintainAspectRatio ?? true;
        this.heightRatio = props.heightRatio ?? 1;
        this.widthRatio = props.widthRatio ?? 1;
        this.heightWidthRatioMultiplier = props.heightWidthRatioMultiplier ?? 1;
        this.visible = props.visible ?? true;
        this.enabled = props.enabled ?? true;

        this.label = props.label ?? "";
        this.description = props.description ?? "";
        this.tags = props.tags ?? [];

        this.minimumProficiencyRequirements = props.minimumProficiencyRequirements ?? new Map();
        this.requiresInternet = props.requiresInternet ?? false;
        this.childComponents = props.childComponents ?? [];
        this.componentKey = props.componentKey ?? "";
        this.registeredComponentKey = "";
        this.isMountedToView = false;

        this.calculateRatioMultiplier = this.calculateRatioMultiplier.bind(this);
        this.registerComponentControl = this.registerComponentControl.bind(this);
        this.unregisterComponentControl = this.unregisterComponentControl.bind(this);
        this.requestComponentUpdate = this.requestComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.isMountedToView = true;
        this.registerComponentControl();
    }

    componentWillUnmount() {
        this.unregisterComponentControl();
        this.isMountedToView = false;
    }

    getComponentKey() {
        return this.componentKey || this.label || this.constructor.name;
    }

    setComponentKey(componentKey = "") {
        this.componentKey = String(componentKey);
        this.registerComponentControl();
        return this.getComponentKey();
    }

    registerComponentControl() {
        if (typeof window === "undefined") {
            return this.getComponentKey();
        }

        if (!window.openFinALComponentControls) {
            window.openFinALComponentControls = {};
        }

        const key = this.getComponentKey();
        if (this.registeredComponentKey && this.registeredComponentKey !== key) {
            delete window.openFinALComponentControls[this.registeredComponentKey];
        }

        window.openFinALComponentControls[key] = this;
        this.registeredComponentKey = key;

        return key;
    }

    unregisterComponentControl() {
        if (typeof window === "undefined" || !window.openFinALComponentControls) {
            return;
        }

        const key = this.registeredComponentKey || this.getComponentKey();
        delete window.openFinALComponentControls[key];
        this.registeredComponentKey = "";
    }

    requestComponentUpdate() {
        if (this.isMountedToView && typeof this.forceUpdate === "function") {
            this.forceUpdate();
        }
    }

    getVisibility() {
        return this.visible;
    }

    setVisibility(visible) {
        this.visible = Boolean(visible);
        this.requestComponentUpdate();
        return this.visible;
    }

    getSize() {
        return {
            height: this.height,
            width: this.width,
        };
    }

    setSize(height = this.height, width = this.width) {
        this.height = typeof height === "number" ? height : this.height;
        this.width = typeof width === "number" ? width : this.width;
        this.requestComponentUpdate();
        return this.getSize();
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        if (typeof height === "number") {
            this.height = height;
            this.requestComponentUpdate();
        }

        return this.height;
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        if (typeof width === "number") {
            this.width = width;
            this.requestComponentUpdate();
        }

        return this.width;
    }

    getLabel() {
        return this.label;
    }

    setLabel(label = "") {
        this.label = String(label);
        this.registerComponentControl();
        return this.label;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description = "") {
        this.description = String(description);
        return this.description;
    }

    getTags() {
        return this.tags;
    }

    setTags(tags = []) {
        this.tags = Array.isArray(tags) ? tags : this.tags;
        return this.tags;
    }

    getChildren() {
        return this.childComponents;
    }

    addChildComponent(component) {
        if (!this.isContainer || !component) {
            return this.childComponents;
        }

        this.childComponents.push(component);
        return this.childComponents;
    }

    removeChildComponent(component) {
        this.childComponents = this.childComponents.filter((child) => child !== component);
        return this.childComponents;
    }

    clearChildComponents() {
        this.childComponents = [];
        return this.childComponents;
    }

    setIsContainer(isContainer) {
        this.isContainer = Boolean(isContainer);
        if (!this.isContainer) {
            this.childComponents = [];
        }

        this.requestComponentUpdate();

        return this.isContainer;
    }

    getFinancialKnowledgeLevel(requirementLabel = "financialKnowledge") {
        return this.minimumProficiencyRequirements.get(requirementLabel) ?? 0;
    }

    setFinancialKnowledgeLevel(level, requirementLabel = "financialKnowledge") {
        if (typeof level === "number") {
            this.minimumProficiencyRequirements.set(requirementLabel, level);
        }

        return this.getFinancialKnowledgeLevel(requirementLabel);
    }

    getMinimumProficiencyRequirements() {
        return this.minimumProficiencyRequirements;
    }

    setMinimumProficiencyRequirements(requirements = new Map()) {
        if (requirements instanceof Map) {
            this.minimumProficiencyRequirements = requirements;
        }

        return this.minimumProficiencyRequirements;
    }

    calculateRatioMultiplier(availableWidth = this.width) {
        if (!this.maintainAspectRatio || !availableWidth || this.widthRatio <= 0) {
            return this.heightWidthRatioMultiplier;
        }

        this.heightWidthRatioMultiplier = Math.floor(availableWidth / this.widthRatio);
        this.width = this.heightWidthRatioMultiplier * this.widthRatio;
        this.height = this.heightWidthRatioMultiplier * this.heightRatio;

        return this.heightWidthRatioMultiplier;
    }
}

export default ViewComponentWrapper;