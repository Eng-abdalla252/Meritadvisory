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

    const uploadsPath = path.join(process.cwd(), 'public', 'uploads', folder);
    const basePath = path.join(process.cwd(), 'public', folder);

    try {
        let allFiles: { name: string; url: string }[] = [];

        // Check public/uploads
        if (fs.existsSync(uploadsPath)) {
            const files = fs.readdirSync(uploadsPath);
            allFiles = [...allFiles, ...files.map(file => ({
                name: file,
                url: `/uploads/${folder}/${file}`
            }))];
        }

        // Check base public directory (for manually added logos)
        if (fs.existsSync(basePath)) {
            const files = fs.readdirSync(basePath);
            const baseFiles = files.filter(file => !fs.statSync(path.join(basePath, file)).isDirectory()).map(file => ({
                name: file,
                url: `/${folder}/${file}`
            }));
            
            // Avoid duplicates if same filename exists in both
            const existingNames = new Set(allFiles.map(f => f.name));
            baseFiles.forEach(f => {
                if (!existingNames.has(f.name)) {
                    allFiles.push(f);
                }
            });
        }

        return NextResponse.json({ files: allFiles });
    } catch (error) {
        console.error(`Error reading media directories for ${folder}:`, error);
        return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
    }
}
