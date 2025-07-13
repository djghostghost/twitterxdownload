'use client';
import React from 'react';

export default function TweetMedia({ tweets }) {

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'video.mp4';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const linkConvert = (text) => {
        // 替换链接
        text = text.replace(/https?:\/\/[^\s]+/g, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${url}</a>`;
        });

        // 替换 @用户名
        text = text.replace(/@(\w+)/g, (match, username) => {
            return `<a href="https://x.com/${username}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${match}</a>`;
        });

        return text;
    };

    return (
        <div className="article-content text-medium text-default-600 whitespace-pre-wrap break-words max-w-full">
            {tweets.map((tweet, index) => (
                <div key={index}>
                    <pre dangerouslySetInnerHTML={{ __html: linkConvert(tweet.text) }}></pre>
                    {tweet.medias.map((media, mIndex) => {
                        if (media.type === "photo") {
                            return <img key={mIndex} src={media.url} alt={media.alt} />
                        } else if (media.type === "video") {
                            return (
                                <video controls src={media.url} alt={media.alt} className="w-full rounded" />
                            );
                        }
                    })}
                </div>
            ))}
        </div>
    );
}
