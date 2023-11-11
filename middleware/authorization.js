module.exports = (userType) => {
    return (req, res, next) => {
      if (req.session.user && req.session.user.userType === userType) {
        console.log("okei, berhasil dengan", userType);
        next(); // Lanjutkan ke rute berikutnya jika otorisasi sesuai
      } else {
        console.log("error");
         return res.status(403).json({ message: 'Anda tidak diizinkan mengakses halaman ini' });
      }
    };
  };