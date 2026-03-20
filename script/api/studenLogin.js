export default async function logStudent(account) {
  try {
    await db.collection("studentOpens").add({
      name: account.name,
      username: account.username,
      openedAt: new Date().toISOString(),
      config: getConfigFromUrl()
    });

    console.log("Elev logget i Firestore");
  } catch (err) {
    console.error("Feil ved logging:", err);
  }
}