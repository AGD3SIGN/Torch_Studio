export interface Track {
  id: number
  title: string
  artist: string
  artistSource?: 'Pixabay' | 'Free Music Archive' | 'Incompetech' | 'Other'
  genre: string
  mood: 'Chill' | 'Energetic' | 'Dark' | 'Uplifting' | 'Melancholic'
  duration: string
  durationSecs: number
  bpm: number
  price: number
  color: string
  audioSrc: string
  tags: string[]
  license: 'CC0' | 'Royalty-Free'
  addedDate: string
}

// Local royalty-free audio from public/audio/ directory
// To add real music:
// 1. Download royalty-free tracks from https://pixabay.com/music/ (CC0 license, no attribution needed)
// 2. Note the artist name from Pixabay (shown in download modal)
// 3. Save to public/audio/ with names: `genre-title.mp3`
// 4. Update the audioFiles array below
// 5. Add artist name and source to each track in the tracks array (see examples below)
// 6. Run: npm run dev
//
// For mockup sites, Pixabay Music is ideal since it's CC0 (public domain)
// Other options: Free Music Archive, Incompetech, YouTube Audio Library
//
// Artist attribution:
// - artistSource: "Pixabay" (or other source)
// - artist: "Artist Name" (as shown on the source website)
// Example: { artist: "Mikhail Smuev", artistSource: "Pixabay", ... }
const baseUrl = import.meta.env.BASE_URL
const audioFiles = [
  `${baseUrl}audio/fassounds-good-night-lofi-cozy-chill-music-160166.mp3`,                  // 1. Lo-Fi (Chill)
  `${baseUrl}audio/lofi_music_library-coffee-lofi-chill-lofi-ambient-458901.mp3`,           // 2. Lo-Fi (Chill)
  `${baseUrl}audio/pulsebox-lofi-smooth-522876.mp3`,                                         // 3. Lo-Fi (Melancholic)
  `${baseUrl}audio/alex-morgan-chillhop-jazz-coffee-shop-552792.mp3`,                       // 4. Chill-Hop/Jazz
  `${baseUrl}audio/nastelbom-motivation-442631.mp3`,                                         // 5. Lo-Fi (Chill)
  `${baseUrl}audio/sigmamusicart-no-copyright-music-537751.mp3`,                            // 6. Lo-Fi (Uplifting)
  `${baseUrl}audio/alex-morgan-phonk-brazilian-phonk-phonk-music-545509.mp3`,               // 7. Phonk (Energetic)
  `${baseUrl}audio/the_mountain-phonk-phonk-music-483828.mp3`,                              // 8. Phonk (Chill)
  `${baseUrl}audio/the_mountain-sad-512361.mp3`,                                             // 9. Melancholic (Dark)
  `${baseUrl}audio/nastelbom-suspense-501709.mp3`,                                           // 10. Suspense (Dark)
  `${baseUrl}audio/alexgrohl-motivation-epic-rock-111444.mp3`,                              // 11. Epic Rock (Energetic)
  `${baseUrl}audio/alex-morgan-cinematic-corporate-presentation-556231.mp3`,                // 12. Cinematic
]

// Each audioFile index maps directly to the downloaded track (1-based)
const direct = (id: number) => audioFiles[id - 1]

export const tracks: Track[] = [
  // ── 12 downloaded CC0 tracks from Pixabay ──────────────────────────────────
  { id: 1,  title: 'Good Night — Lofi Cozy Chill',          artist: 'Fassounds',         artistSource: 'Pixabay', genre: 'Lo-Fi',      mood: 'Chill',      duration: '3:42', durationSecs: 222, bpm: 87,  price: 0.99, color: '#2D1B69', audioSrc: direct(1),  tags: ['study','chill','lo-fi'],              license: 'CC0', addedDate: '2024-03-10' },
  { id: 2,  title: 'Coffee Lofi Chill',                      artist: 'Lofi Music Library', artistSource: 'Pixabay', genre: 'Lo-Fi',      mood: 'Chill',      duration: '2:51', durationSecs: 171, bpm: 83,  price: 0.99, color: '#2A3A1A', audioSrc: direct(2),  tags: ['café','chill','background'],          license: 'CC0', addedDate: '2024-03-08' },
  { id: 3,  title: 'Lofi Smooth',                            artist: 'Pulsebox',           artistSource: 'Pixabay', genre: 'Lo-Fi',      mood: 'Melancholic',duration: '3:15', durationSecs: 195, bpm: 76,  price: 0.99, color: '#3B2A14', audioSrc: direct(3),  tags: ['piano','lo-fi','nostalgic'],          license: 'CC0', addedDate: '2024-03-05' },
  { id: 4,  title: 'Chillhop Jazz Coffee Shop',              artist: 'Alex Morgan',        artistSource: 'Pixabay', genre: 'Chill-Hop',  mood: 'Chill',      duration: '4:03', durationSecs: 243, bpm: 91,  price: 0.99, color: '#1A2A3B', audioSrc: direct(4),  tags: ['jazz','chill','café'],               license: 'CC0', addedDate: '2024-03-01' },
  { id: 5,  title: 'Motivation',                             artist: 'Nastelbom',          artistSource: 'Pixabay', genre: 'Lo-Fi',      mood: 'Chill',      duration: '3:30', durationSecs: 210, bpm: 80,  price: 0.99, color: '#1F1040', audioSrc: direct(5),  tags: ['study','motivation','focus'],         license: 'CC0', addedDate: '2024-02-28' },
  { id: 6,  title: 'No Copyright Music',                     artist: 'Sigma Music Art',    artistSource: 'Pixabay', genre: 'Lo-Fi',      mood: 'Uplifting',  duration: '3:10', durationSecs: 190, bpm: 85,  price: 0.99, color: '#3D2E14', audioSrc: direct(6),  tags: ['morning','chill','lo-fi'],            license: 'CC0', addedDate: '2024-02-25' },
  { id: 7,  title: 'Brazilian Phonk',                        artist: 'Alex Morgan',        artistSource: 'Pixabay', genre: 'Phonk',      mood: 'Energetic',  duration: '2:58', durationSecs: 178, bpm: 78,  price: 0.99, color: '#2E1A10', audioSrc: direct(7),  tags: ['phonk','brazilian','energetic'],      license: 'CC0', addedDate: '2024-02-20' },
  { id: 8,  title: 'Phonk Music',                            artist: 'The Mountain',       artistSource: 'Pixabay', genre: 'Phonk',      mood: 'Chill',      duration: '3:20', durationSecs: 200, bpm: 82,  price: 0.99, color: '#1A1A2E', audioSrc: direct(8),  tags: ['phonk','chill','beat'],              license: 'CC0', addedDate: '2024-02-15' },
  { id: 9,  title: 'Sad',                                    artist: 'The Mountain',       artistSource: 'Pixabay', genre: 'Melancholic',mood: 'Dark',       duration: '3:45', durationSecs: 225, bpm: 88,  price: 0.99, color: '#3A1F12', audioSrc: direct(9),  tags: ['sad','melancholic','dark'],           license: 'CC0', addedDate: '2024-02-10' },
  { id: 10, title: 'Suspense',                               artist: 'Nastelbom',          artistSource: 'Pixabay', genre: 'Ambient',    mood: 'Dark',       duration: '3:05', durationSecs: 185, bpm: 84,  price: 0.99, color: '#252040', audioSrc: direct(10), tags: ['suspense','dark','ambient'],          license: 'CC0', addedDate: '2024-02-05' },
  { id: 11, title: 'Motivation — Epic Rock',                 artist: 'Alex Grohl',         artistSource: 'Pixabay', genre: 'Rock',       mood: 'Energetic',  duration: '2:40', durationSecs: 160, bpm: 74,  price: 0.99, color: '#2A1E0E', audioSrc: direct(11), tags: ['motivation','epic','rock'],           license: 'CC0', addedDate: '2024-01-30' },
  { id: 12, title: 'Cinematic Corporate Presentation',       artist: 'Alex Morgan',        artistSource: 'Pixabay', genre: 'Cinematic',  mood: 'Uplifting',  duration: '3:50', durationSecs: 230, bpm: 89,  price: 0.99, color: '#3D2800', audioSrc: direct(12), tags: ['cinematic','corporate','uplifting'],  license: 'CC0', addedDate: '2024-01-25' },
]
