const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');


const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/pwl-mean';

app.use(bodyParser.json());
app.use(cors());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('koneksi ke Mongodb berhasil');
});

const PrestasiSchema = new mongoose.Schema({
  prestasi: String,
  mahasiswa: String,
  tanggal: String,
  level: String,
  tempat: String,
  deskripsi: String,
  image: String
});

const Prestasi = mongoose.model('listprestasi', PrestasiSchema);

app.post('/api/prestasi', (req,res) => {
  const prestasi = new Prestasi(req.body);
  prestasi.save();
  res.status(200).send();
})

app.get('/api/prestasi', async (req,res) => {

  Prestasi.find().find(function(err, prestasi) {
    if(err)
      return res.send(error);

    res.json(prestasi);
  });
})

app.get('/api/prestasi/latest', async (req,res) => {

  Prestasi.find().sort({tanggal: -1}).limit(3).find(function(err, post) {
    if(err)
      return res.send(error);

    res.json(post);
  });
})
app.get('/api/prestasi/latestall', async (req,res) => {

  Prestasi.find().sort({tanggal: -1}).find(function(err, post) {
    if(err)
      return res.send(error);

    res.json(post);
  });
})
app.get('/api/prestasi/scale', async (req,res) => {

  Prestasi.find().sort([['level']]).find(function(err, post) {
    if(err)
      return res.send(error);

    res.json(post);
  });
})
app.get('/api/prestasi/search/:key',(req,res) => {
  console.log(req.params.key);
  let key = req.params.key;
  Prestasi.find({$or:[{prestasi: { $regex: '.*' + key + '.*' }},
   {mahasiswa: { $regex: '.*' + key + '.*' }}, {tempat: { $regex: '.*' + key + '.*' }}, {level: { $regex: '.*' + key + '.*' }} ] }, )
  .exec(function(err, data){
    if (err){
      console.log("error get data")
    } else {
    res.json(data);
    }
  });
})

app.get('/api/prestasi/:id',(req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  Prestasi.findById(id)
  .exec(function(err, data){
      if (err){
        console.log("error get data")
      } else {
      res.json(data);
      }
  });
});

app.delete('/api/prestasi/:id', (req,res) => {
  Prestasi.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Gagal menghapus pesan id=${id}.'
        });
      }else {
        res.send({
          message: "Prestasi berhasil dihapus"

        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Tidak dapat menghapus prestasi id=" + id
      });
    });
})
app.put('/api/prestasi/:id', (req, res, next) => {
  console.log(req.body);
  Prestasi.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
    }else {
      console.log('Update Success')
      res.send('Selesai')
    }
  })
})

mongoose.connect(url);

app.listen(port, () => console.log('Aplikasi Berjalan di port', port));
