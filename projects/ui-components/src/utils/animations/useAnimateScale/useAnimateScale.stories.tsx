import React, { CSSProperties } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import useAnimateScale from './useAnimateScale';

const ExampleStyles: { [name: string]: CSSProperties } = {
  container: {
    display: 'inline-block',
    maxWidth: 350,
    overflow: 'hidden',
  },
  content: {
    padding: 10,
  },
};

function Example() {
  const {
    containerRef,
    contentRef,
    expandedContentRef,
    toggle,
  } = useAnimateScale<HTMLDivElement, HTMLDivElement, HTMLDivElement>();

  return (
    <div ref={containerRef} style={ExampleStyles.container}>
      <div ref={contentRef} style={ExampleStyles.content}>
        <button onClick={toggle}>Toggle</button>
        <div ref={expandedContentRef}>
          <p>
            Cookies pine nuts grains smoked tofu sandwiches cashew sweet potato
            lemon tahini dressing dill macadamia nut cookies red lentil curry
            Italian pepperoncini salad soy milk samosa mocha chocolate red
            grapes second course edamame hummus Caribbean red habanero
            bruschetta blueberries Sicilian pistachio pesto apple vinaigrette
            scotch bonnet pepper Thai sun pepper bite sized.
          </p>
          <p>
            Mediterranean kimchi banana pasta cocoa with peppermint avocado
            dressing drizzle vitamin glow seeds tempeh lime roasted butternut
            squash red amazon pepper balsamic vinaigrette delightful blueberry
            scones raspberry fizz raspberries. Tofu four-layer guacamole eating
            together dark chocolate green tea black bean chili dip a delicious
            meal elderberry almond milk chia seeds cozy cinnamon oatmeal simmer
            spicy muffins plums seitan Thai dragon pepper smoky maple tempeh
            glaze crispy iceberg lettuce spiced pumpkin chili ginger lemongrass
            agave green tea strawberry spinach salad.
          </p>
        </div>
      </div>
    </div>
  );
}

export default {
  title: 'Utils/useAnimateScale',
  component: Example,
} as Meta;

export function Default() {
  return <Example />;
}
