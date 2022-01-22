import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
    alignItems: 'center',
    flexGrow: 1,
    padding: 8,
  },
  tabContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
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
});

function Tabs({ activeTabIndex, onActiveTabChange, tabs }: Props) {
  const activeTab = tabs[activeTabIndex];

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
              <Text
                style={[styles.tabText, isActiveTab && styles.tabTextActive]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.tabContent}>{activeTab.content()}</View>
    </View>
  );
}

export default Tabs;
