module.exports = (userType) => {
  
  return (req, res, next) => {
      const tipe = req.headers.tipe.split(" ")[1];
      console.log("tipenya :",tipe);
     
      if (req.user && tipe === userType) {
        console.log("okei, berhasil dengan", userType);
        next(); // Lanjutkan ke rute berikutnya jika otorisasi sesuai
      } else {
        console.log("error");
         return res.status(403).json({ message: 'Anda tidak diizinkan mengakses halaman ini' });
      }
    };
  };