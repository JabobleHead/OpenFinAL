export interface IViewComponent {
    height: number; // for exact height value
    width: number; // for exact width value
    isContainer: boolean; // can the component contain other components
    resizable: boolean;
    maintainAspectRatio: boolean; 
    heightRatio: number; // for dynamic height
    widthRatio: number; // for dynamic width
    heightWidthRatioMultiplier: number; // multiplier to maintain aspect ratio when resizing
    visible: boolean; // does the component start visible or hidden
    enabled: boolean; // is the component usable; allows for visibility but not interaction

    label: string; // for natural language processing search
    description: string; // for natural language processing search
    tags: string[]; // for natural language processing search

    minimumProficiencyRequirements: Map<string, number>; // Map of <requirementLabel, requirementLevel>
    requiresInternet: boolean;

    getVisibility(): boolean;
    setVisibility(visible: boolean): boolean;

    getSize(): { height: number; width: number };
    setSize(height?: number, width?: number): { height: number; width: number };
    getHeight(): number;
    setHeight(height: number): number;
    getWidth(): number;
    setWidth(width: number): number;

    getLabel(): string;
    setLabel(label: string): string;
    getDescription(): string;
    setDescription(description: string): string;
    getTags(): string[];
    setTags(tags: string[]): string[];

    getChildren(): IViewComponent[];
    addChildComponent(component: IViewComponent): IViewComponent[];
    removeChildComponent(component: IViewComponent): IViewComponent[];
    clearChildComponents(): IViewComponent[];
    setIsContainer(isContainer: boolean): boolean;

    getFinancialKnowledgeLevel(requirementLabel?: string): number;
    setFinancialKnowledgeLevel(level: number, requirementLabel?: string): number;
    getMinimumProficiencyRequirements(): Map<string, number>;
    setMinimumProficiencyRequirements(requirements: Map<string, number>): Map<string, number>;

    calculateRatioMultiplier(): number;
}