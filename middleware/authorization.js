module.exports = (userType) => {
    return (req, res, next) => {
      if (req.session.user && req.session.user.type === userType) {
        next(); // Lanjutkan ke rute berikutnya jika otorisasi sesuai
      } else {
        res.status(403).json({ message: 'Anda tidak diizinkan mengakses halaman ini' });
      }
    };
  };