import { useState, useEffect } from 'react';

export function useMedia(folder: string) {
    const [media, setMedia] = useState<{ name: string; url: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMedia() {
            try {
                const res = await fetch(`/api/media/list?folder=${folder}`);
                const data = await res.json();
                if (data.files) {
                    setMedia(data.files);
                } else if (data.error) {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to fetch media');
            } finally {
                setLoading(false);
            }
        }

        if (folder) {
            fetchMedia();
        }
    }, [folder]);

    return { media, loading, error };
}
