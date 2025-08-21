const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://portfolio-admin:pvD78BNYBC29YOw2@portfolio-cluster.4c6c0w2.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-cluster";

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connexion MongoDB réussie !");

    // Test d'écriture
    const TestSchema = new mongoose.Schema({ name: String });
    const Test = mongoose.model("Test", TestSchema);

    await Test.create({ name: "Test de connexion" });
    console.log("✅ Test d'écriture réussi !");

    // Nettoyage
    await Test.deleteMany({});
    console.log("✅ Test complet !");
  } catch (error) {
    console.error("❌ Erreur de connexion :", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

testConnection();
