export interface DownloadableTrack {
  title: string
  audioSrc: string
}

export async function downloadTrack(track: DownloadableTrack): Promise<void> {
  const response = await fetch(track.audioSrc)
  if (!response.ok) throw new Error(`Download failed: ${response.status}`)
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${track.title.replace(/\s+/g, '_')}_TorchStudio_CC0.mp3`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
