import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAuth } from "@/lib/auth"

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: NextRequest) {
    // Verify authentication
    const auth = await verifyAuth(req)
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, GIF, and SVG are allowed." }, { status: 400 })
        }

        // Validate file size
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Sanitize filename
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '')
        const fileName = safeName.toLowerCase();
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
