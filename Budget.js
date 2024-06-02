var doGet = function (e) {
  var foobarr = e.parameter["func"] || "renderFile";
  var libName = "App";
  var libFunc = foobarr;
  var rndPage = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS theWorks ssSheets theRoll`,
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
  args = e.parameter["args"] || ["theWorks"];
  return renderTemplate(
    `<html id="wildSageBrushDoGet">
                <head>
                  <base target="_self">
                  <meta charset="utf-8">
                  <meta name="Subscribe" content="Pro Media Snip">
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
                  </style>
                </head>
                <body>
                  <div id="pageObj"></div>
                  <div>
                    <?!= renBlob ?>
                  </div>
                </body>
                  <script> 
                    document.addEventListener("DOMContentLoaded", eRun)
                    function eRun() {
                        document.getElementById("pageObj").innerHTML = <?!= JSON.stringify(e) ?>
                      } 
                  </script>
              </html>`,
    {
      renBlob: this[libName].contentApp(
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
          <div id="coApp">
            <?!= appL ?>
          </div>
          <div class="row">
            <div class="col s12 l12 m12 card-panel" style="background-color: #ffc107;">
              <div class="container"> 
                  <iframe 
                    class="z-depth-5 card-panel deep-purple darken-1 scale-transition scale-out scale-in btn-large" 
                    src=""
                    id="indexBeta"
                    style="
                      width: 100%;
                      height: 480vh"
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
            if (<?!= typeof appL !== "undefined" ?>) {
            console.log(<?!= appL.length ?>)
              if (<?!= appL.length === 83 || appL.length === 94 || appL.length === 97 || appL.length === 99 || appL.length === 101 || appL.length === 103 || appL.length === 136 || appL.length === 132 ?>) {
              document.getElementById("coApp").innerHTML = ""
              document.getElementById("indexBeta").src = <?= appL ?>}
            else {document.getElementById("indexBeta").src = "https://www.clubhouse.com/@fabianlewis?utm_medium=ch_profile&utm_campaign=lhTUtHb2bYqPN3w8EEB7FQ-247242"}}
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
      e: JSON.stringify(e),
    },
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
