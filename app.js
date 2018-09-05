// Setup
const express = require('express'); // express 사용
const app = express(); // 위에꺼랑 같이 써야됨
const mongoose = require('mongoose'); // mongoose 사용
mongoose.connect('mongodb://localhost:27017/kyu-post'); // 커넥트해서 서버 주소랑 열 경로 지정
const Post = mongoose.model('Post', { posts : String , title : String , }); // 스키마를 지정? 해주는거 같다
const bodyParser = require('body-parser'); // bodyParser 는 form사용 가능하게 해주는거 같다
app.use(bodyParser.json()); // 형태는 json 형태로
app.use(bodyParser.urlencoded({ extended: true })); //이거 안해주면 form 으로 전송해도 에러나서 설정 꼭 해줘야한다
app.set('view engine', 'pug'); // html 태그대신 읽고 쓰기 좋은 pug 사용

// Routes
app.get('/', (req, res) => {
  const query = req.query;     // 자바스크립트 쿼리 스트링 만 추출 (뭔가했다)
  console.log('query', query); // 쿼리 스트링을 출력
  Post.find({}, (err, results) => { // mongoDB에서 데이터 찾기
    res.render('index', { results : results }); // results 의 값 랜더링
  });
});

app.post('/addpost', (req, res) => {
  const post = new Post(req.body); // req에서는 body로 해놔야 나중에 값을 저장시킬 수? 있다
  post
    .save()
    .then(aa => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(`Error in save`);
    });
});
app.post('/write',(req, res) => {
  res.render('addpost')
})
// Listening
app.listen(3000, () => {
  console.log('Server listening on 3000');
});