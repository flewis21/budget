var doGet = function (e) {
  var foobarr = e.parameter["func"] || "renderFile";
  var libName = "App";
  var libFunc = foobarr;
  var rndPage = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS`,
  ]
    .toString()
    .split(" ")[
    Math.floor(
      Math.random() *
        Math.floor(
          [
            `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS`,
          ]
            .toString()
            .split(" ").length,
        ),
    )
  ];
  args = e.parameter["args"] || ["jFundamentals"];
  return renderTemplate(
    this[libName].contentApp(
      `          
      <html id="doGet">
        <head>
          <base target="_self">
          <meta charset="utf-8">
          <meta name="doGet" content="Budget get Function">
          <meta name=viewport content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
          <style>

              body {

                flex-grow: 1;
                color:blue;
                text-decoration:bold;
                flex-flow: row wrap;
                grid-column: 1;
                grid-row: 1;
                text-align: center;
                align-content: flex-start;
                overflow: auto;
              }
          </style
        </head>
        <body>
          <?!= appL ?>
          <div class="row">
            <div class="col s7 l7 m7 card-panel push-m2 push-s2 push-l2">
              <div class="video-container"> 
                  <iframe 
                    src=""
                    id="indexBeta"
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    allow="encrypted-media"
                    title="Dontime Life Website"
                    frameborder="0"
                    allowfullscreen
                    ></iframe>
              </div>
            </div>
          </div>
          <script>
            console.log(<?!= appL.length ?>)
            if (<?!= appL.length === 99 ?>) {document.getElementById("indexBeta").src = <?= appL ?>}
            else {document.getElementById("indexBeta").src = "https://www.clubhouse.com/@fabianlewis?utm_medium=ch_profile&utm_campaign=lhTUtHb2bYqPN3w8EEB7FQ-247242"}
          </script>
        </body>
      </html>`,
      {
        appL: this[libName][
          foobarr ||
            HtmlService.createHtmlOutput(
              `
      <html id="doGet">
        <head>
          <base target="_self">
          <meta charset="utf-8">
          <meta name="doGet" content="Company get Function">
          <meta name=viewport content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
        </head>
        <body>
          <script>
                document.getElementById("appList").value
          </script>
        </body>
      </html>
              `,
            ).getContent()
        ].apply(this, [
          args ||
            HtmlService.createHtmlOutput(
              `
              
      <html id="doGet">
        <head>
          <base target="_self">
          <meta charset="utf-8">
          <meta name="doGet" content="Company get Function">
          <meta name=viewport content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
        </head>
        <body>
          <script>
                document.getElementById("username").value
          </script>
        </body>
      </html>
              `,
            ).getContent(),
        ]),
      },
    ),
    { e: e },
  );
};

var runBoilerplate = function (func, args) {
  var libName = "App";
  var libFunc = func || "doGet";
  args = args || [];
  return this[libName][libFunc].apply(this, args);
};

var runAll = function (func, args) {
  var arr = func.split(".");
  var libName = arr[0];
  var libFunc = arr[1];
  args = args || [];
  return this[libName][libFunc].apply(this, args);
};
