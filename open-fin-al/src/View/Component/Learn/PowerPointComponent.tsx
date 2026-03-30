import React from "react";
import { IViewComponent } from "../IViewComponent";
import { PowerPoint } from "../../LearningModule/Slideshow/PowerPoint.jsx";
import { ViewComponentWrapper } from "../ViewComponentWrapper.jsx";

interface PowerPointComponentState {
  availableWidth: number;
}

export class PowerPointComponent extends ViewComponentWrapper implements IViewComponent {
    declare state: PowerPointComponentState;

    height: number = null;
    width: number = null;
    isContainer: boolean = false;
    resizable: boolean = true;
    maintainAspectRatio: boolean = true;
    widthRatio: number = 16;
    heightRatio: number = 9;
    heightWidthRatioMultiplier: number = 56;
    visible: boolean = true;
    enabled: boolean = true;
    label: string = "PowerPoint Learning Module";
    description: string = "Component for displaying PowerPoint presentations";
    tags: string[] = ["PowerPoint", "Presentation", "Slideshow", "Learning Module"];
    minimumProficiencyRequirements: Map<string, number> = new Map();
    requiresInternet: boolean = true;
    childComponents: IViewComponent[] = [];

    containerRef: React.RefObject<HTMLDivElement>;
    observer: ResizeObserver | null = null;
    pptxPath: string = "";
    
    constructor(props: any = {}) {
        super(props);

        this.widthRatio = 16;
        this.heightRatio = 9;
        this.heightWidthRatioMultiplier = 56;
        this.label = "PowerPoint Learning Module";
        this.description = "Component for displaying PowerPoint presentations";
        this.tags = ["PowerPoint", "Presentation", "Slideshow", "Learning Module"];
        this.minimumProficiencyRequirements = new Map();
        this.requiresInternet = true;

        this.containerRef = React.createRef();
        this.state = {
            availableWidth: 0
        };

        this.pptxPath = props['pptxPath'] || "";
    }

    componentDidMount() {
        this.observer = new ResizeObserver(() => {
            if (this.containerRef.current) {
                this.setState({
                    availableWidth: this.containerRef.current.offsetWidth,
                });
            }
        });

        if (this.containerRef.current) {
            this.observer.observe(this.containerRef.current);
        }
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    calculateRatioMultiplier(): number {
        return super.calculateRatioMultiplier(this.state.availableWidth);
    }

    getVisibility(): boolean {
        return super.getVisibility();
    }

    setVisibility(visible: boolean): boolean {
        return super.setVisibility(visible);
    }

    getSize(): { height: number; width: number } {
        return super.getSize();
    }

    setSize(height?: number, width?: number): { height: number; width: number } {
        return super.setSize(height, width);
    }

    getHeight(): number {
        return super.getHeight();
    }

    setHeight(height: number): number {
        return super.setHeight(height);
    }

    getWidth(): number {
        return super.getWidth();
    }

    setWidth(width: number): number {
        return super.setWidth(width);
    }

    getLabel(): string {
        return super.getLabel();
    }

    setLabel(label: string): string {
        return super.setLabel(label);
    }

    getDescription(): string {
        return super.getDescription();
    }

    setDescription(description: string): string {
        return super.setDescription(description);
    }

    getTags(): string[] {
        return super.getTags();
    }

    setTags(tags: string[]): string[] {
        return super.setTags(tags);
    }

    getChildren(): IViewComponent[] {
        return super.getChildren();
    }

    addChildComponent(component: IViewComponent): IViewComponent[] {
        return super.addChildComponent(component);
    }

    removeChildComponent(component: IViewComponent): IViewComponent[] {
        return super.removeChildComponent(component);
    }

    clearChildComponents(): IViewComponent[] {
        return super.clearChildComponents();
    }

    setIsContainer(isContainer: boolean): boolean {
        return super.setIsContainer(isContainer);
    }

    getFinancialKnowledgeLevel(requirementLabel = "financialKnowledge"): number {
        return super.getFinancialKnowledgeLevel(requirementLabel);
    }

    setFinancialKnowledgeLevel(level: number, requirementLabel = "financialKnowledge"): number {
        return super.setFinancialKnowledgeLevel(level, requirementLabel);
    }

    getMinimumProficiencyRequirements(): Map<string, number> {
        return super.getMinimumProficiencyRequirements();
    }

    setMinimumProficiencyRequirements(requirements: Map<string, number>): Map<string, number> {
        return super.setMinimumProficiencyRequirements(requirements);
    }

    render(): React.ReactNode {
        if (!this.getVisibility()) {
            return null;
        }

        const multiplier = this.calculateRatioMultiplier();
        const ready = multiplier > 0 && this.width > 0 && this.height > 0;

        return (
            <div ref={this.containerRef}>
                {ready && (
                    <PowerPoint pptxPath={this.pptxPath} width={this.width} height={this.height} />
                )}
            </div>           
        );
    }
}