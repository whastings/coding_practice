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
              {isActiveTab && <View style={styles.tabUnderline} />}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.tabContent}>{activeTab.content()}</View>
    </View>
  );
}

export default Tabs;
