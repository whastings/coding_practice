import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import StickyHeader from './StickyHeader';

export default {
  title: 'Components/StickyHeader',
  component: StickyHeader,
} as Meta;

export function Default() {
  const getIpsum = (i: number) => (
    <p key={i} style={{ marginBottom: 20, marginTop: 0 }}>
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

  return (
    <div>
      <div style={{ backgroundColor: 'lightgray', height: 150 }} />
      <StickyHeader>
        {(isSticky) => (
          <div
            style={{
              backgroundColor: isSticky ? 'lightgray' : 'transparent',
              padding: 20,
            }}
          >
            <h2 style={{ margin: 0 }}>Heading</h2>
          </div>
        )}
      </StickyHeader>
      <div style={{ padding: '0 20px' }}>
        <div>{new Array(30).fill(null).map((_, i) => getIpsum(i))}</div>
      </div>
    </div>
  );
}
