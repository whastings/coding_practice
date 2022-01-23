import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

interface Rect {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface TabConfig {
  content: () => React.ReactNode;
  label: string;
}

interface Props {
  activeTabIndex: number;
  onActiveTabChange: (index: number) => void;
  tabs: TabConfig[];
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  tab: {
    flexGrow: 1,
  },
  tabInner: {
    alignItems: 'center',
    padding: 8,
  },
  tabContent: {
    padding: 16,
  },
  tabList: {
    flexDirection: 'row',
  },
  tabText: {
    fontSize: 18,
  },
  tabTextActive: {
    fontWeight: 'bold',
  },
  tabUnderline: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    bottom: 0,
    height: 2,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});

function Tabs({ activeTabIndex, onActiveTabChange, tabs }: Props) {
  const activeTab = tabs[activeTabIndex];
  const underlineRef = useRef<View | null>(null);
  const underlineRectRef = useRef<Rect | null>(null);
  const underlineTransformAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const underline = underlineRef.current;
    if (underline == null) {
      throw new Error('Underline ref not set');
    }

    underline.measureInWindow((x, y, width, height) => {
      const rect = { x, y, width, height };
      const prevRect = underlineRectRef.current;
      underlineRectRef.current = rect;

      if (prevRect == null) {
        return;
      }

      const xDiff = prevRect.x - rect.x;
      underlineTransformAnim.setValue(xDiff);
      Animated.timing(underlineTransformAnim, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    });
  }, [activeTabIndex, underlineTransformAnim]);

  return (
    <View style={styles.root}>
      <View
        accessible={true}
        accessibilityRole="tablist"
        style={styles.tabList}
      >
        {tabs.map((tab, i) => {
          const isActiveTab = tab === activeTab;

          return (
            <Pressable
              accessible={true}
              accessibilityRole="tab"
              key={tab.label}
              onPress={() => onActiveTabChange(i)}
              style={styles.tab}
            >
              <View style={styles.tabInner}>
                <Text
                  style={[styles.tabText, isActiveTab && styles.tabTextActive]}
                >
                  {tab.label}
                </Text>
              </View>
              {isActiveTab && (
                <Animated.View
                  ref={underlineRef}
                  style={[
                    styles.tabUnderline,
                    { transform: [{ translateX: underlineTransformAnim }] },
                  ]}
                />
              )}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.tabContent}>{activeTab.content()}</View>
    </View>
  );
}

export default Tabs;
