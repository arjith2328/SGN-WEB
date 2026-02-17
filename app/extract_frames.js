import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const video = path.join(__dirname, 'Recording 2026-02-14 210022.mp4');
const outDir = path.join(__dirname, 'frames');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// Get video duration
try {
    execSync(`"${ffmpegPath}" -i "${video}" 2>&1`, { encoding: 'utf8', stdio: 'pipe' });
} catch (e) {
    const output = e.stderr || e.stdout || e.message;
    const match = output.match(/Duration:\s*(\d+):(\d+):(\d+)/);
    if (match) {
        console.log(`Video duration: ${match[1]}h ${match[2]}m ${match[3]}s`);
    } else {
        console.log('Could not detect duration');
    }
}

const timestamps = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 55, 60];

timestamps.forEach(t => {
    const outFile = path.join(outDir, `frame_${String(t).padStart(3, '0')}.jpg`);
    try {
        execSync(`"${ffmpegPath}" -y -ss ${t} -i "${video}" -frames:v 1 -q:v 2 "${outFile}"`, { stdio: 'pipe' });
        console.log(`OK: frame at ${t}s`);
    } catch (e) {
        console.log(`Skip: ${t}s`);
    }
});

console.log('Done! Frames in:', outDir);
