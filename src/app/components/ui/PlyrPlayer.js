'use client'

import {useEffect, useRef, useState} from "react";
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import {Download} from "lucide-react";

export default function PlyrPlayer({src, compact = false, showDownload = false}) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false)

    const controls = compact ? ['play', 'progress', 'mute'] :
        [
            'play', 'rewind', 'fast-forward', 'progress',
            'current-time', 'duration', 'mute', 'volume',
            'settings',
            'fullscreen'
        ];

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            if (Hls.isSupported() && src.endsWith('.m3u8')) {
                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
            } else {
                video.src = src;
            }

            playerRef.current = new Plyr(
                video, {
                    controls: controls,
                    settings: ['speed'],
                    speed: {selected: 1, options: [0.5, 1, 1.5, 2]}
                }
            );
        }

        return () => {
            playerRef.current?.destroy()
        }
    }, [src]);

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            const response = await fetch(src);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'video.mp4';

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed', err);
        } finally {
            setIsDownloading(false)
        }
    }
    return (
        <div className="flex flex-col items-center gap-2">
            <video ref={videoRef} className="w-full rounded" controls/>
            {showDownload && (
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 active:scale-95 transition-transform flex justify-center items-center gap-2"
                >
                    <Download size={18} />
                    {isDownloading ? 'Downloading...' : 'Download'}
                </button>
            )
            }
        </div>
    )

}