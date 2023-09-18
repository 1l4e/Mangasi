import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const image = searchParams.get('image')?.toString();
  const source = searchParams.get('source')?.toString();

  if (!image ||!source) {
    return NextResponse.json({ error: 'Image parameter is missing.' }, { status: 400 });
  }

  try {
    const response = await axios.get(image, {
      responseType: "stream",
      headers: {
        referer: source,
      },
    });

    // Check if the response is successful
    if (response.status === 200) {
      // Set headers from the original response
      // Create a new Response object with the image data and headers
      const imageResponse = new Response(new ReadableStream({
        start(controller) {
          response.data.on('data', (chunk:any) => {
            controller.enqueue(chunk);
          });

          response.data.on('end', () => {
            controller.close();
          });

          response.data.on('error', (error:any) => {
            console.error('Error reading image:', error);
            controller.error(error);
          });
        }
      }));

      // Send the imageResponse as the response
      return imageResponse;
    } else {
      return NextResponse.json({ error: 'Image request failed.', status: response.status });
    }
  } catch (error) {
    console.error('Error proxying image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}