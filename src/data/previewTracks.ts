export interface PreviewTrack {
  id: number
  color: string
  genre: string
  label: string
  audioSrc: string
}

const baseUrl = import.meta.env.BASE_URL

export const heroPreviewTracks: PreviewTrack[] = [
  { id: 1,  color: '#2D1B69', genre: 'Lo-Fi',     label: 'Good Night - Lofi Cozy Chill',   audioSrc: `${baseUrl}audio/fassounds-good-night-lofi-cozy-chill-music-160166.mp3` },
  { id: 2,  color: '#1A3A2A', genre: 'Lo-Fi',      label: 'Coffee Lofi Chill',    audioSrc: `${baseUrl}audio/lofi_music_library-coffee-lofi-chill-lofi-ambient-458901.mp3` },
  { id: 3,  color: '#533483', genre: 'Lo-Fi',     label: 'Lofi Smooth',     audioSrc: `${baseUrl}audio/pulsebox-lofi-smooth-522876.mp3` },
  { id: 4,  color: '#16213E', genre: 'Chill-Hop',   label: 'Chillhop Jazz Coffee Shop',       audioSrc: `${baseUrl}audio/alex-morgan-chillhop-jazz-coffee-shop-552792.mp3` },
  { id: 5,  color: '#1B4332', genre: 'Lo-Fi',   label: 'Motivation',       audioSrc: `${baseUrl}audio/nastelbom-motivation-442631.mp3` },
  { id: 6,  color: '#6B2D8B', genre: 'Lo-Fi',       label: 'No Copyright Music',    audioSrc: `${baseUrl}audio/sigmamusicart-no-copyright-music-537751.mp3` },
  { id: 7,  color: '#7C2D12', genre: 'Phonk',label: 'Brazilian Phonk',    audioSrc: `${baseUrl}audio/alex-morgan-phonk-brazilian-phonk-phonk-music-545509.mp3` },
  { id: 8,  color: '#1E3A5F', genre: 'Phonk',      label: 'Phonk Music', audioSrc: `${baseUrl}audio/the_mountain-phonk-phonk-music-483828.mp3` },
  { id: 9,  color: '#3D1A78', genre: 'Melancholic',      label: 'Sad',          audioSrc: `${baseUrl}audio/the_mountain-sad-512361.mp3` },
  { id: 10, color: '#0D4E2F', genre: 'Ambient',      label: 'Suspense',  audioSrc: `${baseUrl}audio/nastelbom-suspense-501709.mp3` },
  { id: 11, color: '#4A1942', genre: 'Rock', label: 'Motivation - Epic Rock',     audioSrc: `${baseUrl}audio/alexgrohl-motivation-epic-rock-111444.mp3` },
  { id: 12, color: '#1C3458', genre: 'Cinematic',      label: 'Cinematic Corporate Presentation',  audioSrc: `${baseUrl}audio/alex-morgan-cinematic-corporate-presentation-556231.mp3` },
]
