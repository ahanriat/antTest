import React, { useEffect } from "react";
import { ActivityIndicator, LayoutAnimation, ScrollView } from "react-native";
import { useAnts } from "~/hooks/antsHooks";
import RiseAnimation from "../animations/RiseAnimation";
import CenterView from "../layout/CenterView";
import AntListItem from "./AntListItem";

interface AntListProps {
  style?: ViewStyleProps;
}

export default function AntList(props: AntListProps) {
  const { ants, loading } = useAnts();

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  });

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="black" />
      </CenterView>
    );
  }

  return (
    <RiseAnimation style={{ flex: 1 }}>
      <ScrollView style={[{ flex: 1, padding: 16 }, props.style]}>
        {ants.map((ant) => (
          <AntListItem key={ant.name} ant={ant} style={{ marginBottom: 32 }} />
        ))}
      </ScrollView>
    </RiseAnimation>
  );
}
