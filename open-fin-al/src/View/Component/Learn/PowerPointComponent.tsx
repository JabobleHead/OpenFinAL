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

    render(): React.ReactNode {
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