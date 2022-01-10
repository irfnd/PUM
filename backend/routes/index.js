const router = require("express").Router();
const api = require("./api");

router.get("/api/mhs", api.getAllMhs);
router.get("/api/mhs/:id", api.getMhs);
router.post("/api/mhs", api.createMhs);
router.put("/api/mhs/:id", api.updateMhs);
router.delete("/api/mhs/:id", api.deleteMhs);

router.get("/api/suhu", api.getAllSuhu);
router.get("/api/suhu/:tanggal", api.getAllSuhu);
router.get("/api/suhu/tertinggi/", api.getSuhuTertinggi);
router.get("/api/suhu/tertinggi/:tanggal", api.getSuhuTertinggi);
router.get("/api/suhu/terendah/", api.getSuhuTerendah);
router.get("/api/suhu/terendah/:tanggal", api.getSuhuTerendah);
router.get("/api/suhu/rata/", api.getSuhuRatarata);
router.get("/api/suhu/rata/:tanggal", api.getSuhuRatarata);
router.get("/api/suhu/get/:id", api.getSuhu);
router.post("/api/suhu", api.createSuhu);
router.put("/api/suhu/:id", api.updateSuhu);
router.delete("/api/suhu/:id", api.deleteSuhu);

router.get("/api/suhu/grafik/rata/:tanggal", api.getGrafikRata);
router.get("/api/suhu/grafik/tertinggi/:tanggal", api.getGrafikTertinggi);
router.get("/api/suhu/grafik/terendah/:tanggal", api.getGrafikTerendah);

module.exports = router;
