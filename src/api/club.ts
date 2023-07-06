import {API_URL} from '@env';
import {ChampionshipClub} from './model/club.interface';

const CLUB_URL = API_URL + 'championship-clubs';

export const getClubList = async (): Promise<ChampionshipClub | null> => {
  try {
    const list = await fetch(CLUB_URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then(r => r.json());
    return list;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};
