export function playTimerCompletionSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & {
      webkitAudioContext?: typeof AudioContext;
    }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(740, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(520, context.currentTime + .35);
    gain.gain.setValueAtTime(.12, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .45);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + .45);
  } catch {
    // Audio is optional and may be blocked by browser autoplay policy.
  }
}
