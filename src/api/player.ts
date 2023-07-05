import {API_URL} from '@env';

const PLAYER_POOL_URL = API_URL + 'championship-players-pool';

export const getPlayerList = async (poolId: number) => {
  try {
    const list = await fetch(`${PLAYER_POOL_URL}/${poolId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(resp => resp.json());
    return list;
  } catch (e) {
    console.log('error', e);
  }
};

const PLAYER_STATS_URL = API_URL + 'championship-player-stats';

export const getPlayerStats = async (playerID: number, year: number) => {
  try {
    const list = await fetch(`${PLAYER_STATS_URL}/${playerID}/${year}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(resp => resp.json());
    return list;
  } catch (e) {
    console.log('error', e);
  }
};
