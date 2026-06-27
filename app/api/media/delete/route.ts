import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    // Verify authentication
    const auth = await verifyAuth(req);
    if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
        }

        // We only allow deleting files under the /uploads/ directory
        if (!url.startsWith('/uploads/')) {
            return NextResponse.json({ error: 'Invalid file path. Only uploaded files can be deleted.' }, { status: 400 });
        }

        // Clean up the URL path and prevent path traversal
        // url is like: /uploads/team/filename.jpg or /uploads/filename.jpg
        const relativePath = url.replace(/^\//, ''); // remove leading slash if any
        const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\))+/, '');
        
        const absolutePath = path.join(process.cwd(), 'public', safePath);
        const uploadsRoot = path.join(process.cwd(), 'public', 'uploads');

        // Verify the path resides strictly inside public/uploads
        if (!absolutePath.startsWith(uploadsRoot)) {
            return NextResponse.json({ error: 'Access denied: Path is outside the uploads directory.' }, { status: 403 });
        }

        // Check if the file exists
        if (fs.existsSync(absolutePath)) {
            const stats = fs.statSync(absolutePath);
            if (stats.isFile()) {
                fs.unlinkSync(absolutePath);
                return NextResponse.json({ success: true, message: 'File deleted successfully' });
            } else {
                return NextResponse.json({ error: 'Target path is not a file' }, { status: 400 });
            }
        }

        // Return success even if it doesn't exist (idempotent)
        return NextResponse.json({ success: true, message: 'File was already removed' });
    } catch (error) {
        console.error('Error deleting media file:', error);
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}
