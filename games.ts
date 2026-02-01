
import { Game, GameCategory } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: 'poki-network-entry',
    title: 'Poki Network Entry',
    description: 'An entry point link for the Poki gaming network.',
    category: GameCategory.RETRO,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    iframeUrl: 'https://prebid.a-mo.net/isyn?gdpr=&gdpr_consent=&us_privacy=&gpp=&gpp_sid=&s=pbs&cb=https%3A%2F%2Fpbs-poki-us.ay.delivery%2Fsetuid%3Fbidder%3Damx%26gdpr%3D%26gdpr_consent%3D%26gpp%3D%26gpp_sid%3D%26f%3Db%26uid%3D%24UID'
  }
];
