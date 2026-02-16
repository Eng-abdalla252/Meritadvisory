import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string;

        if (!file || !folder) {
            return NextResponse.json({ error: 'File and folder are required' }, { status: 400 });
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

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = file.name.replace(/\s+/g, '-').toLowerCase();
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
            message: 'File uploaded successfully',
            url: `/uploads/${folder}/${fileName}`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
