const moment = require("moment");
const router = require("express").Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const User = require("../../backend/models/User");
require("dotenv").config();

let now = moment().utc().format("DD-MM-YYYY");

router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const sTinggi = await axios.get(
        `${process.env.BACKEND}suhu/tertinggi/${now}`
      );
      const sRendah = await axios.get(
        `${process.env.BACKEND}suhu/terendah/${now}`
      );
      const sRata = await axios.get(`${process.env.BACKEND}suhu/rata/${now}`);
      const daftarSuhu = await axios.get(`${process.env.BACKEND}suhu/${now}`);
      let daftarMhs = daftarSuhu.data.results.filter((el) => el.isMhs == true);
      let daftarUser = daftarSuhu.data.results.filter(
        (el) => el.isMhs == false
      );

      const gRata = await axios.get(
        `${process.env.BACKEND}suhu/grafik/rata/${now}`
      );
      const gTinggi = await axios.get(
        `${process.env.BACKEND}suhu/grafik/tertinggi/${now}`
      );
      const gRendah = await axios.get(
        `${process.env.BACKEND}suhu/grafik/terendah/${now}`
      );
      res.render("index", {
        now: now,
        activePage: "index",
        mhs: daftarMhs,
        user: daftarUser,
        sTinggi: sTinggi.data.results,
        sRendah: sRendah.data.results,
        sRata: sRata.data.results,
        gRata: gRata.data.results,
        gTinggi: gTinggi.data.results,
        gRendah: gRendah.data.results,
        userName: req.session.nama,
        userEmail: req.session.email,
      });
    } else {
      if (req.session.guest) {
        const sTinggi = await axios.get(
          `${process.env.BACKEND}suhu/tertinggi/${now}`
        );
        const sRendah = await axios.get(
          `${process.env.BACKEND}suhu/terendah/${now}`
        );
        const sRata = await axios.get(`${process.env.BACKEND}suhu/rata/${now}`);
        const daftarSuhu = await axios.get(`${process.env.BACKEND}suhu/${now}`);
        let daftarMhs = daftarSuhu.data.results.filter(
          (el) => el.isMhs == true
        );
        let daftarUser = daftarSuhu.data.results.filter(
          (el) => el.isMhs == false
        );

        const gRata = await axios.get(
          `${process.env.BACKEND}suhu/grafik/rata/${now}`
        );
        const gTinggi = await axios.get(
          `${process.env.BACKEND}suhu/grafik/tertinggi/${now}`
        );
        const gRendah = await axios.get(
          `${process.env.BACKEND}suhu/grafik/terendah/${now}`
        );
        res.render("index", {
          now: now,
          activePage: "index",
          mhs: daftarMhs,
          user: daftarUser,
          sTinggi: sTinggi.data.results,
          sRendah: sRendah.data.results,
          sRata: sRata.data.results,
          gRata: gRata.data.results,
          gTinggi: gTinggi.data.results,
          gRendah: gRendah.data.results,
          guest: true,
        });
      } else {
        res.redirect("/login");
      }
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res) => {
  try {
    res.redirect(`/${req.body.date}`);
  } catch (e) {
    console.log(e);
  }
});

// Login
router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      msg: req.session.msg,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/auth", async (req, res) => {
  try {
    if (req.body.email.length != 0 && req.body.pass.length != 0) {
      let user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (user != null) {
        let pass = await bcrypt.compare(req.body.pass, user.pass);
        if (pass) {
          req.session.loggedIn = true;
          req.session.nama = user.nama;
          req.session.email = user.email;
          res.redirect("/");
        } else {
          req.session.msg = "Password salah!";
          res.redirect("/login");
        }
      } else {
        req.session.msg = "User tidak terdaftar!";
        res.redirect("/login");
      }
    } else {
      req.session.msg = "Masukan email dan password dengan benar!";
      res.redirect("/login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy();
      res.redirect("/login");
    }
  } catch (e) {
    console.log(e);
  }
});

//Guest
router.get("/guest", async (req, res) => {
  try {
    req.session.guest = true;
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

// Mahasiswa
router.get("/mahasiswa", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const daftarMhs = await axios.get(process.env.BACKEND + "mhs");
      res.render("mahasiswa", {
        edit: true,
        activePage: "mahasiswa",
        daftarMhs: daftarMhs.data.results,
        mhs: "",
        userName: req.session.nama,
        userEmail: req.session.email,
      });
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

router.get("/mahasiswa/:key", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const daftarMhs = await axios.get(process.env.BACKEND + "mhs");
      const mhs = await axios.get(
        process.env.BACKEND + "mhs/" + req.params.key
      );
      res.render("mahasiswa", {
        edit: false,
        activePage: "mahasiswa",
        daftarMhs: daftarMhs.data.results,
        mhs: mhs.data.results,
        userName: req.session.nama,
        userEmail: req.session.email,
      });
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/mahasiswa/:key", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dataMhs = {
        nama: req.body.nama,
        npm: req.body.npm,
        id_ktp: req.body.id_ktp,
      };
      await axios.put(process.env.BACKEND + "mhs/" + req.params.key, dataMhs);
      res.redirect("/mahasiswa");
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

router.get("/mahasiswa/delete/:key", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      await axios.delete(process.env.BACKEND + "mhs/" + req.params.key);
      res.redirect("/mahasiswa");
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

// Pengguna
router.get("/pengguna", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const daftarUser = await axios.get(process.env.BACKEND + "suhu");
      res.render("pengguna", {
        edit: true,
        activePage: "pengguna",
        daftarUser: daftarUser.data.results,
        user: "",
        userName: req.session.nama,
        userEmail: req.session.email,
      });
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

router.get("/pengguna/:key", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const daftarUser = await axios.get(`${process.env.BACKEND}suhu/`);
      const user = await axios.get(`
        ${process.env.BACKEND}suhu/get/${req.params.key}`);
      res.render("pengguna", {
        edit: false,
        activePage: "pengguna",
        daftarUser: daftarUser.data.results,
        user: user.data.results,
        userName: req.session.nama,
        userEmail: req.session.email,
      });
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/pengguna/:key", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      await axios.put(process.env.BACKEND + "suhu/" + req.params.key, req.body);
      res.redirect("/pengguna");
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

router.get("/pengguna/delete/:key", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      await axios.delete(process.env.BACKEND + "suhu/" + req.params.key);
      res.redirect("/pengguna");
    } else {
      res.redirect("/login");
    }
  } catch (e) {
    console.error(e);
  }
});

router.get("/:tanggal", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const sTinggi = await axios.get(
        `${process.env.BACKEND}suhu/tertinggi/${req.params.tanggal}`
      );
      const sRendah = await axios.get(
        `${process.env.BACKEND}suhu/terendah/${req.params.tanggal}`
      );
      const sRata = await axios.get(
        `${process.env.BACKEND}suhu/rata/${req.params.tanggal}`
      );
      const daftarSuhu = await axios.get(
        `${process.env.BACKEND}suhu/${req.params.tanggal}`
      );
      let daftarMhs = daftarSuhu.data.results.filter((el) => el.isMhs == true);
      let daftarUser = daftarSuhu.data.results.filter(
        (el) => el.isMhs == false
      );

      const gRata = await axios.get(
        `${process.env.BACKEND}suhu/grafik/rata/${req.params.tanggal}`
      );
      const gTinggi = await axios.get(
        `${process.env.BACKEND}suhu/grafik/tertinggi/${req.params.tanggal}`
      );
      const gRendah = await axios.get(
        `${process.env.BACKEND}suhu/grafik/terendah/${req.params.tanggal}`
      );
      res.render("index", {
        now: req.params.tanggal,
        activePage: "index",
        mhs: daftarMhs,
        user: daftarUser,
        sTinggi: sTinggi.data.results,
        sRendah: sRendah.data.results,
        sRata: sRata.data.results,
        gRata: gRata.data.results,
        gTinggi: gTinggi.data.results,
        gRendah: gRendah.data.results,
        userName: req.session.nama,
        userEmail: req.session.email,
      });
    } else {
      if (req.session.guest) {
        const sTinggi = await axios.get(
          `${process.env.BACKEND}suhu/tertinggi/${req.params.tanggal}`
        );
        const sRendah = await axios.get(
          `${process.env.BACKEND}suhu/terendah/${req.params.tanggal}`
        );
        const sRata = await axios.get(
          `${process.env.BACKEND}suhu/rata/${req.params.tanggal}`
        );
        const daftarSuhu = await axios.get(
          `${process.env.BACKEND}suhu/${req.params.tanggal}`
        );
        let daftarMhs = daftarSuhu.data.results.filter(
          (el) => el.isMhs == true
        );
        let daftarUser = daftarSuhu.data.results.filter(
          (el) => el.isMhs == false
        );

        const gRata = await axios.get(
          `${process.env.BACKEND}suhu/grafik/rata/${req.params.tanggal}`
        );
        const gTinggi = await axios.get(
          `${process.env.BACKEND}suhu/grafik/tertinggi/${req.params.tanggal}`
        );
        const gRendah = await axios.get(
          `${process.env.BACKEND}suhu/grafik/terendah/${req.params.tanggal}`
        );
        res.render("index", {
          now: req.params.tanggal,
          activePage: "index",
          mhs: daftarMhs,
          user: daftarUser,
          sTinggi: sTinggi.data.results,
          sRendah: sRendah.data.results,
          sRata: sRata.data.results,
          gRata: gRata.data.results,
          gTinggi: gTinggi.data.results,
          gRendah: gRendah.data.results,
          guest: true,
        });
      } else {
        res.redirect("/login");
      }
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
