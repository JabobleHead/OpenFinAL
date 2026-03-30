import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewComponentWrapper } from '../View/Component/ViewComponentWrapper.jsx';
import { withViewComponentWrapper } from '../View/Component/withViewComponentWrapper.jsx';

const defaultConfig = {
    height: 300,
    width: 500,
    visible: true,
    enabled: true,
    isContainer: false,
    maintainAspectRatio: true,
    widthRatio: 16,
    heightRatio: 9,
    label: 'Sample Generic Component',
    description: 'Generic wrapper test component',
    tags: ['generic', 'test'],
    componentKey: 'generic-component',
};

function GenericComponent({ title = 'Generic Component', viewComponent }) {
    return (
        <div data-testid="generic-component-body">
            {title} - {viewComponent.getLabel()}
        </div>
    );
}

const WrappedGenericComponent = withViewComponentWrapper(GenericComponent, defaultConfig);

describe('ViewComponentWrapper base behavior', () => {
    beforeEach(() => {
        delete window.openFinALComponentControls;
    });

    test('creates a generic wrapped component with base attributes and getters', () => {
        const componentRef = React.createRef();
        render(<WrappedGenericComponent ref={componentRef} title="Test Generic" />);

        expect(componentRef.current).toBeInstanceOf(ViewComponentWrapper);
        expect(componentRef.current.getVisibility()).toBe(true);
        expect(componentRef.current.getSize()).toEqual({ height: 300, width: 500 });
        expect(componentRef.current.getLabel()).toBe('Sample Generic Component');
        expect(componentRef.current.getDescription()).toBe('Generic wrapper test component');
        expect(componentRef.current.getTags()).toEqual(['generic', 'test']);

        expect(screen.getByTestId('generic-component-body')).toHaveTextContent('Test Generic - Sample Generic Component');
        expect(window.openFinALComponentControls['generic-component']).toBe(componentRef.current);
    });

    test('changes size and visibility through base setter methods', () => {
        const componentRef = React.createRef();
        const { container } = render(<WrappedGenericComponent ref={componentRef} />);

        act(() => {
            componentRef.current.setSize(420, 760);
        });

        expect(componentRef.current.getSize()).toEqual({ height: 420, width: 760 });
        expect(container.querySelector('[data-component-key="generic-component"]')).toHaveStyle({
            width: '760px',
            height: '420px',
        });

        act(() => {
            componentRef.current.setVisibility(false);
        });

        expect(screen.queryByTestId('generic-component-body')).not.toBeInTheDocument();

        act(() => {
            componentRef.current.setVisibility(true);
        });

        expect(screen.getByTestId('generic-component-body')).toBeInTheDocument();
    });

    test('manages child components through container methods', () => {
        const componentRef = React.createRef();
        render(<WrappedGenericComponent ref={componentRef} />);

        const childA = { name: 'childA' };
        const childB = { name: 'childB' };

        act(() => {
            componentRef.current.setIsContainer(true);
            componentRef.current.addChildComponent(childA);
            componentRef.current.addChildComponent(childB);
        });

        expect(componentRef.current.getChildren()).toEqual([childA, childB]);

        act(() => {
            componentRef.current.removeChildComponent(childA);
        });

        expect(componentRef.current.getChildren()).toEqual([childB]);

        act(() => {
            componentRef.current.setIsContainer(false);
        });

        expect(componentRef.current.getChildren()).toEqual([]);
    });

    test('updates key registration, proficiency requirements, and ratio multiplier', () => {
        const componentRef = React.createRef();
        const { unmount } = render(<WrappedGenericComponent ref={componentRef} />);

        act(() => {
            componentRef.current.setComponentKey('renamed-generic-component');
            componentRef.current.setFinancialKnowledgeLevel(3, 'valuation');
        });

        expect(window.openFinALComponentControls['generic-component']).toBeUndefined();
        expect(window.openFinALComponentControls['renamed-generic-component']).toBe(componentRef.current);
        expect(componentRef.current.getFinancialKnowledgeLevel('valuation')).toBe(3);

        let multiplier;
        act(() => {
            multiplier = componentRef.current.calculateRatioMultiplier(1600);
        });

        expect(multiplier).toBe(100);
        expect(componentRef.current.getSize()).toEqual({ height: 900, width: 1600 });

        unmount();
        expect(window.openFinALComponentControls['renamed-generic-component']).toBeUndefined();
    });
});