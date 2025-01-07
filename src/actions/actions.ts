"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";
import liveblocks from "@/lib/liveblocks";

export async function createNewDocument() {
  auth.protect();

  const { sessionClaims } = await auth();

  const docCollecttionRef = adminDb.collection("documents");
  const docRef = await docCollecttionRef.add({ title: "New Doc" });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth.protect();

  console.log("deleteDocument", roomId);

  try {
    //delete doc ref itself
    await adminDb.collection("documents").doc(roomId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const batch = adminDb.batch();

    //delete roomref from user collections  for every user in the room
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    //delete the liveblock room
    await liveblocks.deleteRoom(roomId);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function inviteUserToDoc(roomId: string, email: string) {
  auth.protect();

  console.log("inviteUserToDoc", roomId, email);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId: roomId,
      });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();

  console.log(email, "removed from the doc", roomId);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
