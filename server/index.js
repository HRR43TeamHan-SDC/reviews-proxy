require('newrelic');
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const app = express();

const PROXY_PORT = process.env.PROXY_PORT || 3043;

const MENUS_HOST = process.env.MENUS_HOST || 'localhost';
const MENUS_PORT = process.env.MENUS_PORT || 3043;

const PHOTOS_HOST = process.env.PHOTOS_HOST || 'localhost';
const PHOTOS_PORT = process.env.PHOTOS_PORT || 3043;

const REVIEWS_HOST = process.env.REVIEWS_HOST || 'localhost';
const REVIEWS_PORT = process.env.REVIEWS_HOST || 3043;

const RESERVATIONS_HOST = process.env.RESERVATIONS_HOST || 'localhost';
const RESERVATIONS_PORT = process.env.RESERVATIONS_PORT || 3043;

html = `
<html>
  <head>
    <title>opentable</title>
    <style>
    @font-face {
      font-family: BrandonText;
      src: url("BrandonText-Regular.otf") format("opentype");
    }
    body {
      margin: 0;
    }
    .grid-container {
      display: grid;
      grid-template-areas:
        'header  header header header header'
        'lgutter left   gap    right  rgutter'
        'footer  footer footer footer footer';
      grid-template-columns: 144px 640px 32px 320px auto;
      grid-gap: 0px;
    }
    .grid-header {
      grid-area: header;
      height: 371px;
      background-image: url('images/header.webp');
    }
    .grid-left-gutter {
      grid-area : lgutter;
    }
    .grid-left {
      grid-area: left;
      width: 640px;
    }
    .grid-gap {
      grid-area: gap;
      width:32px;
    }
    .grid-right {
      grid-area: right;
      width: 320px;
    }
    .grid-right-gutter {
      grid-area : rgutter;
    }
    .grid-footer {
      grid-area: footer;
      height: 795px;
      background-image: url('images/footer.webp');
    }
    .area-description {
      height:255px;
      background-image: url('images/description.webp');
      background-repeat: no-repeat;
    }
    .area-menu {
      margin-top: 40px;
    }
    .area-reservation {
      width: 320px;
      height: 320px;
      background-image: url('https://cnet3.cbsistatic.com/img/_XpU5t4ywu3xYvA4dClTJay1hQA=/644x0/2015/07/07/4eb66f23-8702-46ac-b15f-c61352b41ccd/hansolo2.jpg');
      background-size: cover;
      color: white;
      text-align: center;
      line-height: 550px;
      font-size: 48px;
      font-weight: bold;
    }
    .area-map {
      width: 320px;
      height: 220px;
      background-image: url('images/map.webp');
      margin-top: 20px;
    }
    .area-detail1 {
      width: 320px;
      height: 643px;
      background-image: url('images/detail1.webp');
      background-repeat: no-repeat;
    }
    .area-detail2 {
      width: 320px;
      height: 182px;
      background-image: url('images/detail2.webp');
      background-repeat: no-repeat
    }
    </style>
  </head>
  <body>
    <div class="grid-container">
      <div class="grid-header"></div>
      <div class="grid-left-gutter"></div>
      <div class="grid-left">
        <div class="area-title"><div id="title">menu module title not loaded</div></div>
        <div class="area-description"><!-- &nbsp; --></div>
        <div class="area-photo"><div id="photos">photo module not loaded</div></div>
        <div class="area-menu"><div id="root">menu module menus not loaded</div></div>
        <div class="area-review"><br><br><div id="app">review module not loaded</div></div>
      </div>
      <div class="grid-gap"></div>
      <div class="grid-right">
        <div class="area-reservation">SDC BABY!</div>
        <div class="area-map"></div>
        <div class="area-detail1"></div>
        <div class="area-detail2"></div>
      </div>
      <div class="grid-right-gutter"></div>
      <div class="grid-footer"></div>
    </div>
    <script src="http://ec2-54-193-70-33.us-west-1.compute.amazonaws.com:4444/bundle.js"></script>
    <script src="http://sdc.heskett.ninja/bundle.js"></script>
    <!-- <script src="http://ec2-18-188-10-239.us-east-2.compute.amazonaws.com:3300/bundle.js"></script> -->
    <script src="http://ec2-3-133-85-12.us-east-2.compute.amazonaws.com:3009/bundle.js"></script>
  </body>
</html>
`
app.get('api/reviews/:id', (req, res) => {
  axios.get(`http://${REVIEWS_HOST}:${REVIEWS_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving',err));
});

// MENU MODULE
// const MENU_HOSTNAME = process.env.MENU_HOSTNAME || 'localhost';
// const MENU_PORT = process.env.MENU_PORT || 8001;
app.get('/gettitle/:id', (req, res) => {
  res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
});
app.get('/getmenu/:id', (req, res) => {
  res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
});
app.post('/api/restaurant', (req, res) => {
  res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
})
// Try to use the following vs all the routes to simplify code
// app.use('/api/restaurant/:id', (req, res) => {
//   console.log(req.url);
//   res.redirect(`http://sdc.heskett.ninja${req.url}`)
// });
app.route('/api/restaurant/:id')
  .get((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja/${req.url}`);
  })
  .put((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .delete((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  });
app.route('/api/menu/:id')
  .get((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .post((req, res) => {
    // Used to post a new section
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .put((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .delete((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  });
app.route('/api/section/:id')
  .get((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .post((req, res) => {
    // Used to post a new item
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .put((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .delete((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  });
app.route('/api/item/:id')
  .get((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .put((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  })
  .delete((req, res) => {
    res.redirect(307, `http://sdc.heskett.ninja${req.url}`);
  });
// app.get('/getmenu/:id', (req, res) => {
//   axios.get(`http://sdc.heskett.ninja${req.url}`)
//   .then(response => response.data)
//   .then(data => res.send(data))
//   .catch(err => console.log('error at proxy serving',err));
// });

// PHOTO GALLERY MODULE
app.get('/api/photos/:id', (req, res) => {
  // res.redirect(`http://ec2-3-133-85-12.us-east-2.compute.amazonaws.com:3009/api/photos/${req.params.id}`);
  axios.get(`http://ec2-3-133-85-12.us-east-2.compute.amazonaws.com:3009/api/photos/${req.params.id}`)
    .then((response) => {
  //     const stream = new Readable({
  //       read() {
  //         this.push(JSON.stringify(response.data));
  //         this.push(null);
  //       },
  //     });
  //     stream.pipe(res);
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

app.post('/api/photos', (req, res) => {
  // res.redirect(307, `http://ec2-3-133-85-12.us-east-2.compute.amazonaws.com:3009/api/photos`);
  axios.post(`http://ec2-3-133-85-12.us-east-2.compute.amazonaws.com:3009/api/photos`, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});


// // HTML IMAGES
// app.get('/images/*', (req, res) => {
//   const gzip = zlib.createGzip();
//   res.set({ 'Content-Encoding': 'gzip' });
//   fs.createReadStream(path.resolve(__dirname, `../public${req.url}`)).pipe(gzip).pipe(res);
// });




// RESERVATION MODULE
app.get('/api/reservations/:restaurantId/dateTime/:dateTime', (req, res) => {
  res.redirect(307, `http://ec2-54-193-70-33.us-west-1.compute.amazonaws.com:4444${req.url}`)
});



app.use('/:id', (req, res) => {
  res.send(html);
});
app.listen(PROXY_PORT, () => {
  console.log(`App listening on port ${PROXY_PORT}`);
});