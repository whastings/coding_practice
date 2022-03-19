import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import PageLayer from './PageLayer';

export default {
  title: 'Components/PageLayer',
  component: PageLayer,
} as Meta;

function LayerOneContent() {
  const getIpsum = (i: number) => (
    <p key={i}>
      Soup banana bread creamy cauliflower alfredo Sicilian pistachio pesto
      seeds eating together ultra creamy avocado pesto sparkling pomegranate
      punch second course sweet potato burritos smoked tofu. Miso turmeric
      glazed aubergine crispy iceberg lettuce coconut rice apple vinaigrette
      salted chia seeds muffins instant pot lime mango crisp blueberry chia seed
      jam edamame rich coconut cream cherry bomb pepper parsley coconut
      portobello mushrooms Italian linguine puttanesca Thai basil curry cool off
      Thai Southern Italian cauliflower.
    </p>
  );

  return <div>{new Array(30).fill(null).map((_, i) => getIpsum(i))}</div>;
}

function LayerTwoContent() {
  const getIpsum = (i: number) => (
    <p key={i}>
      Double dark chocolate matcha fruit smash lemon lime minty cool cucumbers
      tofu hearty oranges green tea lime apples sesame soba noodles hot green
      papaya salad macadamia nut cookies tasty chili pepper cozy cinnamon
      oatmeal Bolivian rainbow pepper avocado dressing drizzle cherry bomb
      crumbled lentils almond milk delightful blueberry scones blueberries.
      Cremini mushrooms samosa banh mi salad rolls cherries red grapes lemon
      Thai dragon pepper fresh red curry tofu noodles crunchy candy cane winter
      cranberry spritzer avocado basil pesto. Avocado thyme mocha chocolate
      lemon tahini dressing seitan with green onions potato onion balsamic
      vinaigrette strawberry mango smoothie summertime chilies toasted hazelnuts
      ghost pepper morning smoothie bowl walnut mushroom tart garlic sriracha
      noodles.
    </p>
  );

  return <div>{new Array(30).fill(null).map((_, i) => getIpsum(i))}</div>;
}

function LayerThreeContent() {
  const getIpsum = (i: number) => (
    <p key={i}>
      Crispy tahini drizzle overflowing winter mint lime taco salsa dark
      chocolate cinnamon smoky maple tempeh glaze chickpea crust pizza cocoa
      spiced peppermint blast salty shallots cayenne enchiladas lavender
      lemonade mint refreshing cucumber splash. Paprika hearts of palm roasted
      peanuts Indian spiced almonds pinch of yum cozy butternut black bean wraps
      chai tea veggie burgers cool crunchy seaweed.
    </p>
  );

  return <div>{new Array(30).fill(null).map((_, i) => getIpsum(i))}</div>;
}

export function Default() {
  const [activeLayer, setActiveLayer] = useState(1);

  const decrementActiveLayer = () => {
    setActiveLayer(activeLayer - 1);
  };

  const incrementActiveLayer = () => {
    setActiveLayer(activeLayer + 1);
  };

  return (
    <>
      <PageLayer isActive={activeLayer === 1}>
        <LayerOneContent />
      </PageLayer>
      {activeLayer > 1 && (
        <PageLayer isActive={activeLayer === 2}>
          <LayerTwoContent />
        </PageLayer>
      )}
      {activeLayer > 2 && (
        <PageLayer isActive={activeLayer === 3}>
          <LayerThreeContent />
        </PageLayer>
      )}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px #000 solid',
          display: 'flex',
          gap: 10,
          left: 20,
          padding: 10,
          position: 'fixed',
          top: 20,
        }}
      >
        <button disabled={activeLayer === 1} onClick={decrementActiveLayer}>
          Decrement active layer
        </button>
        <button disabled={activeLayer === 3} onClick={incrementActiveLayer}>
          Increment active layer
        </button>
      </div>
    </>
  );
}
