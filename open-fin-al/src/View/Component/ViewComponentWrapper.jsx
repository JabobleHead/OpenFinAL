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

        this.calculateRatioMultiplier = this.calculateRatioMultiplier.bind(this);
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