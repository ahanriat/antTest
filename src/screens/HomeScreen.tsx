import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
import RiseAnimation from "~/components/animations/RiseAnimation";
import AntList from "~/components/ant/AntList";
import AntsRunningAnimation from "~/components/ant/AntsRunningAnimation";
import ButtonPrimary from "~/components/buttons/ButtonPrimary";
import FlexView from "~/components/layout/FlexView";
import RowView from "~/components/layout/RowView";
import { H1 } from "~/components/typography/Texts";
import { useAnts } from "~/hooks/antsHooks";
import { logout } from "~/services/AuthService";

export default function HomeScreen() {
  const { reset } = useNavigation();
  const { computeAllLikelyHoodOfWinning, ants } = useAnts();
  const hasRemainingUncompontedAnts = ants.find(
    (ant) => ant.likelihoodOfAntWinning.status === "idle"
  );
  return (
    <FlexView>
      <SafeAreaView style={{ flex: 1, paddingVertical: 12 }}>
        <RiseAnimation>
          <RowView>
            <H1 style={{ marginHorizontal: 16, flex: 1 }}> Ants 🏁</H1>
            <ButtonPrimary
              label="Logout"
              onPress={() => {
                reset({ index: 0, routes: [{ name: "LoginScreen" }] });
                logout();
              }}
              style={{ marginRight: 16 }}
            />
          </RowView>
        </RiseAnimation>
        <AntList style={{ paddingVertical: 32 }} />
        {hasRemainingUncompontedAnts && (
          <ButtonPrimary
            style={{ alignSelf: "center", marginBottom: 32 }}
            label={"Compute all!"}
            onPress={computeAllLikelyHoodOfWinning}
          />
        )}
        <AntsRunningAnimation />
      </SafeAreaView>
    </FlexView>
  );
}
