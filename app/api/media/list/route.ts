import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder');

    if (!folder) {
        return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
    }

    const validFolders = [
        'trusted-by-industry-leaders',
        'clients',
        'projects',
        'blog',
        'team',
        'testimonials',
        'events'
    ];

    if (!validFolders.includes(folder)) {
        return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
    }

    const directoryPath = path.join(process.cwd(), 'public', 'uploads', folder);

    try {
        if (!fs.existsSync(directoryPath)) {
            return NextResponse.json({ files: [] });
        }

        const files = fs.readdirSync(directoryPath);
        const fileList = files.map(file => ({
            name: file,
            url: `/uploads/${folder}/${file}`
        }));

        return NextResponse.json({ files: fileList });
    } catch (error) {
        console.error(`Error reading directory ${directoryPath}:`, error);
        return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
    }
}
