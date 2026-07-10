import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

// This route only ISSUES short-lived upload tokens. The actual file bytes
// go straight from the customer's browser to Blob storage, never through
// this server, so we're not bottlenecked by Next.js's request body limits.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            'audio/wav',
            'audio/x-wav',
            'audio/aiff',
            'audio/x-aiff',
            'audio/mpeg',
            'audio/mp3',
            'audio/flac',
            'application/zip',
            'application/x-zip-compressed',
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 500 * 1024 * 1024, // 500MB per file
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Optional: log completed uploads. No DB in this scaffold, so we
        // just rely on the URLs the client collects and sends to
        // /api/create-payment-intent.
        console.log('Blob upload completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
