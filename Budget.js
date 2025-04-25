var doGet = function (e) {
  var libName = "App";
  if (e && e.parameter && e.parameter.action === "getData") {
    return this[libName].handleRequest(e);
  }
  if (e && e.parameter["file"]) {
    var funcTres = e.parameter["file"];
  } else {
    var funcTres = "uiAccess";
  }
  if (e && e.parameter["func"]) {
    console.log(JSON.stringify(e));
  } else {
    var argsEd = this[libName].testlt();
    if (typeof this[libName].mis === "function") {
      if (typeof argsEd === "string") {
        e = this[libName].objectOfS(
          ["parameter"],
          [
            [
              ["func", "mis"],
              ["args", argsEd],
            ],
          ],
          Math.floor(
            (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
          ),
        );
      } else if (typeof argsEd === "object" && argsEd !== null && argsEd.name) {
        if (argsEd.parameters && argsEd.parameters.length > 0) {
          e = this[libName].objectOfS(
            ["parameter"],
            [
              [
                ["func", "mis"],
                ["args", [argsEd.name, ...argsEd.parameters]],
              ],
            ],
            Math.floor(
              (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
            ),
          );
        } else {
          e = this[libName].objectOfS(
            ["parameter"],
            [
              [
                ["func", "mis"],
                ["args", argsEd.name],
              ],
            ],
            Math.floor(
              (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
            ),
          );
        }
      } else {
        console.log("Unexpected argsEd type: ", argsEd);
        e = this[libName].objectOfS(
          ["parameter"],
          [
            [
              ["func", "mis"],
              ["args", "Invalid Entry"],
            ],
          ],
          Math.floor(
            (this[libName].maxTime - (new Date() % (1000 * 60))) / 1000,
          ),
        );
      }
      console.log(JSON.stringify(e));
    }
  }
  console.log(
    Math.floor((this[libName].maxTime - (new Date() % (1000 * 60))) / 1000) +
      "\n" +
      arguments.callee.name +
      "\ne is !" +
      !e +
      ", = " +
      JSON.stringify(e),
  );
  var funcUno = e.parameter["func"];
  console.log("e.parameter['args'] before funcDos:", e.parameter["args"]);
  var funcDos = e.parameter["args"];
  console.log("e.parameter['args'] after funcDos:", e.parameter["args"]);
  console.log("funcDos:", funcDos);
  var foobarr = funcUno || "renderFile";
  var libFunc = foobarr;
  var rndPage = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS Section3.Challenge1 cors edgarFriendly editor ssForms styling theRoll theWorks uiAccess cGWI`,
  ]
    .toString()
    .split(" ")[
    Math.floor(
      Math.random() *
        Math.floor(
          [
            `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS Section3.Challenge1 cors edgarFriendly editor ssForms styling theRoll theWorks uiAccess cGWI`,
          ]
            .toString()
            .split(" ").length,
        ),
    )
  ];
  console.log("rndPage:", rndPage);
  var index = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS Section3.Challenge1 cors edgarFriendly editor ssForms styling theRoll theWorks uiAccess cGWI`,
  ]
    .toString()
    .split(" ")
    .findIndex(function (element) {
      if (Array.isArray(e.parameter["args"])) {
        console.log("index:", e.parameter["args"][0]);
        return element === e.parameter["args"][0];
      } else {
        console.log("index:", e.parameter["args"]);
        return element === e.parameter["args"];
      }
    });
  var tres = [
    `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS Section3.Challenge1 cors edgarFriendly editor ssForms styling theRoll theWorks uiAccess cGWI`,
  ]
    .toString()
    .split(" ")
    .findIndex(function (element) {
      console.log("tres:", funcTres);
      return element === funcTres;
    });
  console.log("index:", index + "\ntres", tres);
  var args;
  index !== -1
    ? (args = [
        `index proMedia epaWebsite callBack oddChances jsGame checkOnDay uiAccess popUpOpen congressLeg congressMembers jFundamentals gnuFree myGNUFreeJS Section3.Challenge1 cors edgarFriendly editor ssForms styling theRoll theWorks uiAccess cGWI`,
      ][index])
    : (args = ["theWorks"]);
  console.log("e {parameter: {func: " + e.parameter["func"] + "}}");
  let templateName = e.parameter["func"];
  if (e.parameter["func"] === "crmGWI") {
    templateName = "General Work Invoice";
  } else if (e.parameter["func"] === "crmEBI") {
    templateName = "Employee Benefits Inquiry";
  }
  if (
    this[libName] &&
    typeof this[libName][e.parameter["func"]] === "function"
  ) {
    try {
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
                  <textarea id="jsonInput" style="display: none;width: 80%;min-height: 200px;margin:10px auto;padding:10px;border:1px solid #ccc;font-family:monospace;white-space:pre-wrap;text-align:left;"></textarea>
                  <div>
                        <?!= renBlob ?>
                      </div>
                    </body>
                      <script>;var objUrl 
      = document.getElementById("pageObj");var jsonInput 
      = document.getElementById("jsonInput");var currentE 
      = <?= e ?>;document.addEventListener("DOMContentLoaded", eRun)
                        function eRun() {
        objUrl.innerHTML 
      = <?= JSON.stringify(e) ?>;jsonInput.style.display 
      = "block";jsonInput.value 
      = <?= JSON.stringify(e, null, 2) ?>
      };
      jsonInput.addEventListener("change", function() {
        try {var parsedE 
      = JSON.parse(jsonInput.value);console.log("Updated e object:", parsedE);currentE 
      = parsedE;var textRes = <?= homePage ?> + "?func=" + currentE.parameter["func"] + "&args=" + currentE.parameter["args"];alert("e object updated (check the console). You would now typically send this back to the server.");window.open(textRes);}
        catch (error) {alert("Error parsing JSON. Please ensure the input is valid JSON.");console.error("JSON parsing error:", error);};});
              </script>
                  </html>`,
        {
          renBlob: this[libName].contentApp(
            `          
          <html id="renderTemplate_blob">
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
                <?= JSON.stringify(appL) ?>
              </div><div><?!= HtmlService.createTemplateFromFile(tupL).evaluate().getContent() ?></div>
              <div class="row">
                <div class="col s12 l12 m12 card-panel responsive-section" style="background-color: #ffc107;">
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
              </div><div class="container"><?!= typeof appL === "object" && typeof appL["app"] !== "string" ? JSON.stringify(appL["app"]):appL["app"] ?></div>
              <script>
                if (<?!= typeof appL["index"] !== "undefined" ?>) {
                console.log(<?!= appL["index"].length ?>)
                  if (<?!= appL["index"].length === 83 || appL["index"].length === 94 || appL["index"].length === 97 || appL["index"].length === 99 || appL["index"].length === 101 || appL["index"].length === 103 || appL["index"].length === 136 || appL["index"].length === 132 ?>) {
                  document.getElementById("coApp").innerHTML = ""
                  document.getElementById("indexBeta").src = <?= appL["index"] ?>}
                else {document.getElementById("indexBeta").src = "https://www.clubhouse.com/@fabianlewis?utm_medium=ch_profile&utm_campaign=lhTUtHb2bYqPN3w8EEB7FQ-247242"}}
              </script>
            </body>
          </html>`,
            {
              appL: this[libName][
                foobarr ||
                  HtmlService.createHtmlOutput(
                    `
          <html id="appL_func">
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
                  
          <html id="appL_args">
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
              tupL: rndPage[tres] || args,
            },
          ),
          e: e,
          homePage: this[libName].getScriptUrl(),
        },
      );
    } catch (error) {
      console.error(
        `Error executing function "${e.parameter["func"]}":`,
        error,
      );
      return "Error executing function.";
    }
  } else {
    return;
  }
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
