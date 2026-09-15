import { FlatList, View } from 'react-native';

import PlayerCard from '@/components/PlayerCard';
import { useEffect, useState } from 'react';
import TeamFilter from '@/components/TeamFilter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAPI, fetchTeams } from '@/services/player.service';
type Player = {
  id: String,
  playerName: string,
  team: string
}

export default function TabOneScreen() {
    const [items, setItem] = useState<Player[]>([])
    const [teams, setTeams] = useState<string[]>([])
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

   useEffect(() => {
    const loadData = async () => {
      // Load players
      const playerData = await fetchAPI();
      const sorted = [...playerData].sort(
        (a, b) => Number(b.id) - Number(a.id)
      );
      setItem(sorted);

    };

    loadData();
  }, []);
  useEffect(() => {
    const loadData = async () => {
      // Load players
      const playerData = await fetchAPI();
      const sorted = [...playerData].sort(
        (a, b) => Number(b.id) - Number(a.id)
      );
      setItem(sorted);

      // Load teams
      const teamData = await fetchTeams();
      setTeams(teamData);
    };

    loadData();
  }, []);
  // Filter players by selected team
  const filteredPlayers = selectedTeam
    ? items.filter(player => player.team === selectedTeam)
    : items;

   

  return (
   <SafeAreaView style={{ flex: 1 }} edges={['top']}>
    <View style={{ flex: 1 }}>
      <TeamFilter
          teams={teams}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />

    <FlatList
          numColumns={2}
          data={filteredPlayers}//update here
          keyExtractor={(player) => String(player.id)}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
          renderItem={({ item }) => (
            <View className="flex-1 px-2 mb-4">
              <PlayerCard data={item} />
            </View>
          )}
        />
      </View>
      </SafeAreaView>
  );
}