export interface Streamer {
  name: string;
  url: string;
  avatar: string;
}

// ponytail: add new streamers here — name, channel link, avatar image URL.
export const streamers: Streamer[] = [
  {
    name: 'Vini Pimenta',
    url: 'https://www.youtube.com/@Vini_Pimenta',
    avatar: 'https://yt3.googleusercontent.com/c_vXwaB8UbWvFgaE_z-6kwb-HJvNQv5SOeHuiXqYDXVHXaELAHpvWte9NPxLGRMwo1PzpgV4=s160-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'Rutz',
    url: 'https://www.youtube.com/@mateus_rutz',
    avatar: 'https://yt3.googleusercontent.com/X0GEfUwJ2Ny9zxqQ_wR3KCA9PIXa3TSqJtA2_XhkpdpbSI573qLx1djcBru5xs7PiPrctB-CPvc=s160-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'Katr4k4',
    url: 'https://www.twitch.tv/katr4k4',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/a026eca8-08b2-4b24-b675-1da783784aff-profile_image-70x70.png',
  },
];
