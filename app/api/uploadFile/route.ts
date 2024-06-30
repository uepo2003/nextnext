import { NextResponse, type NextRequest } from "next/server";
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

import { storage} from "../../firebaseCOnfig";

export async function POST(req: NextRequest): Promise<NextResponse> {


    const body = await req.json();

    console.log("カツオ",　body)
    const filePath = 'images/tekito.png'
    const base64Data = body.fileData

    try {
        const storageRef = ref(storage, filePath);
        await uploadString(storageRef, base64Data, 'base64');
        const url = await getDownloadURL(storageRef);
        console.log(url, "うるる")
        return NextResponse.json({ url })
      } catch (error) {
        console.error('Error uploading Base64 data to Firebase:', error);
        throw error;
      }
}
