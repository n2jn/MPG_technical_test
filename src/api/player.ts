import {API_URL} from '@env';
import {Player, PlayerStats, PoolPlayer} from '~api/model/player.interface';

const PLAYER_POOL_URL = API_URL + 'championship-players-pool';

export const getPlayerList = async (
  poolId: string | number,
): Promise<PoolPlayer | null> => {
  try {
    const list = await fetch(`${PLAYER_POOL_URL}/${poolId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(resp => resp.json());
    return list;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

const PLAYER_STATS_URL = API_URL + 'championship-player-stats';

export const getPlayerStats = async (
  playerID: number | string,
  year: number | string,
): Promise<PlayerStats | null> => {
  try {
    const list = await fetch(`${PLAYER_STATS_URL}/${playerID}/${year}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(resp => resp.json());
    return list;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};
