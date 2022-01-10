const moment = require("moment");
const Mahasiswa = require("../models/Mahasiswa");
const Suhu = require("../models/Suhu");

// Retrieve Mahasiswa
exports.getAllMhs = async (req, res) => {
  try {
    const results = await Mahasiswa.find();
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      results: results,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Retrieve One Mhs By ID
exports.getMhs = async (req, res) => {
  try {
    const results = await Mahasiswa.findOne({ _id: req.params.id });
    if (results.length == 0) throw new SyntaxError("Not Found");
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      results: results,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Create One Mhs
exports.createMhs = async (req, res) => {
  try {
    const newMhs = await Mahasiswa.create(req.body);
    res.status(201).json({
      statusCode: res.statusCode,
      statusMsg: "Created",
      _id: newMhs._id,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(401).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Update One Mhs By ID
exports.updateMhs = async (req, res) => {
  try {
    const Mhs = await Mahasiswa.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      result: Mhs,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Delete One Mhs By ID
exports.deleteMhs = async (req, res) => {
  try {
    await Mahasiswa.deleteOne({ _id: req.params.id });
    res.status(204).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      _id: req.params.id,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Retrieve Suhu
exports.getAllSuhu = async (req, res) => {
  try {
    if (req.params.tanggal == null) {
      const results = await Suhu.find({}).sort({ added: "asc" });
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: results,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    } else {
      const results = await Suhu.find({ tanggal: req.params.tanggal }).sort({
        added: "asc",
      });
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: results,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    }
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Retrieve One Suhu By ID
exports.getSuhu = async (req, res) => {
  try {
    const results = await Suhu.findOne({ _id: req.params.id });
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      results: results,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Create One Suhu
exports.createSuhu = async (req, res) => {
  try {
    const dataMhs = await Mahasiswa.findOne({ id_ktp: req.body.id_ktp });
    if (dataMhs != null) {
      const newSuhu = await Suhu.create({
        nama: dataMhs.nama,
        npm: dataMhs.npm,
        id_ktp: dataMhs.id_ktp,
        suhu: req.body.suhu,
        isMhs: true,
      });
      res.status(201).json({
        statusCode: res.statusCode,
        statusMsg: "Created",
        _id: newSuhu._id,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    } else {
      const newSuhu = await Suhu.create({
        id_ktp: req.body.id_ktp,
        suhu: req.body.suhu,
      });
      res.status(201).json({
        statusCode: res.statusCode,
        statusMsg: "Created",
        _id: newSuhu._id,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    }
  } catch (e) {
    res.status(401).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Update One Mhs By ID
exports.updateSuhu = async (req, res) => {
  try {
    const suhu = await Suhu.updateOne({ _id: req.params.id }, req.body);
    const Mhs = await Mahasiswa.create({
      nama: req.body.nama,
      npm: req.body.npm,
      id_ktp: req.body.id_ktp,
    });
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      result: suhu,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Delete One Mhs By ID
exports.deleteSuhu = async (req, res) => {
  try {
    await Suhu.deleteOne({ _id: req.params.id });
    res.status(204).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      _id: req.params.id,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

exports.getSuhuTertinggi = async (req, res) => {
  try {
    if (req.params.tanggal == null) {
      let now = moment().format("DD-MM-YYYY");
      const hasil = await Suhu.find({ tanggal: now }).sort({ suhu: "desc" });
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: hasil.length > 0 ? hasil[0] : false,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    } else {
      const hasil = await Suhu.find({ tanggal: req.params.tanggal }).sort({
        suhu: "desc",
      });
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: hasil.length > 0 ? hasil[0] : false,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    }
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

exports.getSuhuTerendah = async (req, res) => {
  try {
    if (req.params.tanggal == null) {
      let now = moment().format("DD-MM-YYYY");
      const hasil = await Suhu.find({ tanggal: now }).sort({ suhu: "asc" });
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: hasil.length > 0 ? hasil[0] : false,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    } else {
      const hasil = await Suhu.find({ tanggal: req.params.tanggal }).sort({
        suhu: "asc",
      });
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: hasil.length > 0 ? hasil[0] : false,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    }
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

exports.getSuhuRatarata = async (req, res) => {
  try {
    if (req.params.tanggal == null) {
      let now = moment().format("DD-MM-YYYY");
      const hasil = await Suhu.aggregate([
        { $match: { tanggal: now } },
        {
          $group: {
            _id: "rata-rata",
            suhu: { $avg: "$suhu" },
            jumlah: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: hasil.length > 0 ? hasil : false,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    } else {
      const hasil = await Suhu.aggregate([
        { $match: { tanggal: req.params.tanggal } },
        {
          $group: {
            _id: "rata-rata",
            suhu: { $avg: "$suhu" },
            jumlah: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({
        statusCode: res.statusCode,
        statusMsg: "OK",
        results: hasil.length > 0 ? hasil : false,
      });
      console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
    }
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

// Grafik
exports.getGrafikRata = async (req, res) => {
  try {
    let hasil = [];
    for (let i = 0; i < 7; i++) {
      try {
        const suhu = await Suhu.aggregate([
          {
            $match: {
              tanggal: moment(req.params.tanggal, "DD-MM-YYYY")
                .day(i)
                .format("DD-MM-YYYY"),
            },
          },
          {
            $group: {
              _id: "rata-rata",
              suhu: { $avg: "$suhu" },
              jumlah: { $sum: 1 },
            },
          },
        ]);
        hasil.push(suhu[0] != null ? Math.round(suhu[0].suhu * 100) / 100 : 0);
      } catch (e) {
        console.log(e);
      }
    }
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      results: hasil,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

exports.getGrafikTertinggi = async (req, res) => {
  try {
    let hasil = [];
    for (let i = 0; i < 7; i++) {
      try {
        const suhu = await Suhu.find({
          tanggal: moment(req.params.tanggal, "DD-MM-YYYY")
            .day(i)
            .format("DD-MM-YYYY"),
        }).sort({
          suhu: "desc",
        });
        hasil.push(suhu[0] != null ? suhu[0].suhu : 0);
      } catch (e) {
        console.log(e);
      }
    }
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      results: hasil,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};

exports.getGrafikTerendah = async (req, res) => {
  try {
    let hasil = [];
    for (let i = 0; i < 7; i++) {
      try {
        const suhu = await Suhu.find({
          tanggal: moment(req.params.tanggal, "DD-MM-YYYY")
            .day(i)
            .format("DD-MM-YYYY"),
        }).sort({
          suhu: "asc",
        });
        hasil.push(suhu[0] != null ? suhu[0].suhu : 0);
      } catch (e) {
        console.log(e);
      }
    }
    res.status(200).json({
      statusCode: res.statusCode,
      statusMsg: "OK",
      results: hasil,
    });
    console.log(`> ${req.method} -> ${res.statusCode} ${res.statusMessage}`);
  } catch (e) {
    res.status(404).json({
      statusCode: res.statusCode,
      statusMsg: "Error",
      error: e.message,
    });
  }
};
